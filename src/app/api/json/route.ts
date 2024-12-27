import { client } from "@/lib/ai";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodTypeAny } from "zod";
import { EXAMPLE_ANSWER, EXAMPLE_PROMPT } from "./example";

const determineSchemaType = (schema: any): string => {
    if (!schema.hasOwnProperty("type")) {
      if (Array.isArray(schema)) {
        return "array"
      } else {
        return typeof schema
      }
    }
    return schema.type
  }

const jsonSchematoZod = (schema: any): ZodTypeAny => {
  const type = determineSchemaType(schema);

  switch (type) {
    case "string":
      return z.string().nullable();
    case "number":
      return z.number().nullable();
    case "boolean":
      return z.boolean().nullable();
    case "array":
      return z.array(jsonSchematoZod(schema.items)).nullable();
    case "object":
      const shape: Record<string, ZodTypeAny> = {};

      for (const key in schema) {
        if (key !== "type") {
          shape[key] = jsonSchematoZod(schema[key]);
        }
      }
      return z.object(shape);
    default: {
      throw new Error(`Unknown data type: ${type}`);
    }
  }
};

  //retry mechanism

  type PromiseExecutor<T> = (
    resolve: (value: T) => void,
    reject: (reason?: any) => void
  ) => void;

  class RetryablePromise<T> extends Promise<T> {
    static async retry<T>(
      retries: number,
      executor: PromiseExecutor<T>
    ): Promise<T> {
      return new RetryablePromise(executor).catch((error) => {
        console.error(`Retrying due to error: ${error}`);

        return retries > 0
          ? RetryablePromise.retry(retries - 1, executor)
          : RetryablePromise.reject(error);
      });
    }
  }

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  //data
  const genricSchema = z.object({
    data: z.string(),
    format: z.object({}).passthrough(),
  });

  const { data, format } = genricSchema.parse(body);

  //create a schema from the expected user input
  const dynamicSchema = jsonSchematoZod(format);



  // const example = (resolve , reject) =>{
  //     if() reject()
  // }

  const validationResult = await RetryablePromise.retry<object>(
    5,
    async (resolve, reject) => {
      try {
        
        const content = `DATA: \n"${data}"\n\n-----------\nExpected JSON format: ${JSON.stringify(
            format,
            null,
            2
          )}\n\n-----------\nValid JSON output in expected format:`

        const res = await client.chatCompletion({
          model: "microsoft/Phi-3.5-mini-instruct",
          messages: [
            {
                role: "assistant",
                content:
                  "You are an AI that converts unstructured data into the attached JSON format. You respond with nothing but valid JSON based on the input data. Your output should DIRECTLY be valid JSON, nothing added before or after. You will begin right with the opening curly brace and end with the closing curly brace. Only if you absolutely cannot determine a field, use the value null.Also try ignoring the whitespaces and any other user issue if the syntax is correct.",
              },
            {
              role: "user",
              content: EXAMPLE_PROMPT,
            },
            {
              role: "system",
              content: EXAMPLE_ANSWER,
            },
            {
              role: "user",
              content,
            },
          ],
        });

        const text = res.choices[0].message.content;

        //validate the json
        const validateResult = dynamicSchema.parse(JSON.parse(text || ""));

        return resolve(validateResult);
      } catch (error) {
        reject(error);
      }
    }
  );

  return NextResponse.json(validationResult, { status: 200 });
};
