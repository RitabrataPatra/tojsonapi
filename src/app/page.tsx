import React from "react";

export default function Home() {
  return (
    <div>
      <header
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <h1>Welcome to the Dynamic JSON Processing API</h1>
      </header>

      <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <section className="m-2">
          <h2><u>About the API</u></h2>
          <p>
            This API allows you to dynamically validate and transform JSON data
            based on a schema provided in the request. With retry mechanisms and
            AI-powered processing, it ensures accurate and efficient handling of
            complex JSON structures.
          </p>
        </section>

        <section className="m-2">
          <h2><u>How It Works</u></h2>
          <ol>
            <li>
              Send a POST request with your data and the expected format/schema.
            </li>
            <li>
              The API validates your input and generates the required output.
            </li>
            <li>If errors occur, the API retries to ensure accuracy.</li>
          </ol>
        </section>

        <section className="m-2">
          <h2>Example Request</h2>
          <pre
            style={{
              backgroundColor: "black",
              borderLeft: "5px solid #4CAF50",
              padding: "1rem",
              fontFamily: "monospace",
              overflowX: "auto",
            }}
          >
            {`{
  "data": "John is 25 years old and studies computer science at university",
  "format": {
    "name": { "type": "string" },
    "age": { "type": "number" }
  }
}`}
          </pre>
        </section>

        <section className="m-2">
          <h2>Example Response</h2>
          <pre
            style={{
              backgroundColor: "#black",
              borderLeft: "5px solid #4CAF50",
              padding: "1rem",
              fontFamily: "monospace",
              overflowX: "auto",
            }}
          >
            {`{
  "name": "John",
  "age": 25
}`}
          </pre>
        </section>

        <section className="m-2">
          <h2 className=""><u>API Endpoint</u></h2>
          <p>
            <strong>POST:</strong> <code>http://localhost:3000/api/json</code>
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you encounter any issues or have questions, feel free to{" "}
            <a href="mailto:support@yourapi.com">contact support</a>.
          </p>
        </section>
      </main>

      <footer
        style={{
          textAlign: "center",
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#333",
          color: "white",
        }}
      >
        <p>&copy; 2024 Dynamic JSON Processing API. All rights reserved.</p>
      </footer>
    </div>
  );
}
