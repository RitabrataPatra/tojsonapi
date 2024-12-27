"use client";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState<string>("");

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText("https://yourapi.com/process")

      .then(() => setCopySuccess("Copied!"))
      .catch(() => setCopySuccess("Failed to copy."));
  };
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-green-600 text-white py-6">
        <h1 className="text-4xl font-bold text-center">
          Dynamic JSON Processing API
        </h1>
      </header>

      <main className="flex-1 px-6 py-10 bg-gray-100 text-slate-600">
        <section className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-semibold mb-4">About the API</h2>
          <p className="text-gray-700">
            This API allows you to dynamically validate and transform JSON data
            based on a schema provided in the request. With retry mechanisms and
            AI-powered processing, it ensures accurate and efficient handling of
            complex JSON structures.
          </p>
        </section>

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

        <section className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-semibold mb-4">Example Response</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
            {`{
  "name": "John",
  "age": 25
}`}
          </pre>
        </section>

        <section className="max-w-4xl mx-auto mb-10">
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

        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you encounter any issues or have questions, feel free to{" "}
            <a
              href="mailto:support@yourapi.com"
              className="text-green-600 underline"
            >
              contact support
            </a>
            .
          </p>
        </section>
      </main>

      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2024 Dynamic JSON Processing API. All rights reserved.</p>
        <div className="flex gap-2 justify-center items-center mt-2">
          <div className="w-fit rounded-full bg-slate-500 p-1 items-center">
            <GithubIcon size={16}/>
            </div>
          
          <p>
          Contribute on <Link href="https://github.com/RitabrataPatra/tojsonapi" target="_blank" rel="noopener noreferrer" className="text-green-500 underline">GitHub</Link>.
        </p>
        </div>
        
      </footer>
    </div>
  );
};

export default Home;
