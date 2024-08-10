## /data POST Endpoint

This endpoint accepts data and returns a confirmation message.

**Method:** POST

**URL:** `/data`

**Request Body:**

The request body should contain the following JSON data:

```json
{
  "name": "string",
  "age": number
}
```

**Parameters:**

* **name:** (string) The name of the user.
* **age:** (number) The age of the user.

**Response:**

The endpoint returns a JSON object containing a success message with the received data:

```json
{
  "message": "Received data: Name is [name], Age is [age]"
}
```

**Example Request:**

```json
{
  "name": "John Doe",
  "age": 30
}
```

**Example Response:**

```json
{
  "message": "Received data: Name is John Doe, Age is 30"
}
```

**Error Handling:**

* If the request body is missing or invalid, the endpoint will return an error message.

**Notes:**

* This endpoint is designed to be a simple example of a POST request with a JSON body. 
* You can adapt this endpoint to accept different data or perform additional actions based on your specific needs.
