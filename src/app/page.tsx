"use client";
import React, { useEffect, useState } from "react";

const postlink = "https://localhost:3000/api/json";
const Home: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState<string>("");

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(postlink)

      .then(() => setCopySuccess("Copied!"))
      .catch(() => setCopySuccess("Failed to copy."));
  };
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <main className="flex-1 px-6 py-10 bg-gray-100 text-slate-600">

        {/* About the API */}
        <section className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-semibold mb-4">About the API</h2>
          <p className="text-gray-700">
            This API allows you to dynamically validate and transform JSON data
            based on a schema provided in the request. With retry mechanisms and
            AI-powered processing, it ensures accurate and efficient handling of
            complex JSON structures.
          </p>
        </section>


        {/* How It Works */}
        <section className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              Send a POST request with your data and the expected format/schema.
            </li>
            <li>
              The API validates your input and generates the required output.
            </li>
            <li>If errors occur, the API retries to ensure accuracy.</li>
          </ol>
        </section>

        {/* Example Request */}
        <section className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-semibold mb-4">Example Request</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
            {`{
  "data": "John is 25 years old and studies computer science at university",
  "format": {
    "name": { "type": "string" },
    "age": { "type": "number" }
  }
}`}
          </pre>
        </section>

         {/* Example Response */}
        <section className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-semibold mb-4">Example Response</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
            {`{
  "name": "John",
  "age": 25
}`}
          </pre>
        </section>
        
        {/* API Endpoint */}
        <section className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold mb-4">API Endpoint</h2>
          <div className="flex items-center space-x-4">
            <p className="text-gray-700">
              <strong>POST:</strong>{" "}
              <code className="bg-gray-200 px-2 py-1 rounded">
                https://localhost:3000/api/json
              </code>
            </p>
            <button
              onClick={copyToClipboard}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {copySuccess ? (
                <p className="text-white">{copySuccess}</p>
              ) : (
                "Copy to Clipboard"
              )}
            </button>
          </div>
        </section>
        
      </main>
    </div>
  );
};

export default Home;
