import { HfInference } from "@huggingface/inference";

export const client = new HfInference(process.env.HUGGINGFACE_API_KEY);
