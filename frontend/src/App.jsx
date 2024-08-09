// src/App.js

import MarkdownEditor from './Components/MarkdownEditor';
import MarkdownRenderer from './Components/MarkdownRenderer';

const markdownText = `
## /data POST Endpoint

This endpoint allows you to submit data to the server and receive a confirmation message.

**Request:**

* **Method:** POST
* **URL:** /data
* **Body:** 
    * **name:** (string) - The name of the person.
    * **age:** (number) - The age of the person.

**Example Request Body:**

\`\`\`json
{
  "name": "John Doe",
  "age": 30
}
\`\`\`

**Response:**

* **Status Code:** 200 (OK)
* **Content-Type:** application/json
* **Body:**
    * **message:** (string) - A message confirming the received data.

**Example Response Body:**

\`\`\`json
{
  "message": "Received data: Name is John Doe, Age is 30"
}
\`\`\`

**Errors:**

* **400 Bad Request:** If the request body is missing or invalid. 
* **500 Internal Server Error:** If an unexpected server error occurs.

**Usage:**

This endpoint can be used to submit user information, such as name and age, to the server. The server will then acknowledge the data and provide a confirmation message.
`;

const App = () => {
  return (
    <div className="App" style={{ display: 'flex', padding: '0rem 2rem' }}>
      {/* <div>
        <h1>Markdown Viewer</h1>
        <MarkdownRenderer markdownText={markdownText} />
      </div> */}
      <MarkdownEditor />
    </div>
  );
};

export default App;
