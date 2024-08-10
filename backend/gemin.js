const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(`AIzaSyD5GVKbIsLVu9dPB5jTWrFbU4tTXMDX2es`);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const fs = require("fs").promises;
const fsSync = require("fs");
const { get } = require("http");

function getResponseFormat(API_CODE) {

  let response = fsSync.readFileSync('./responseFormat.txt', 'utf8');

  response = response.replace("[API_CODE_HERE]", API_CODE);

  return response;
}

function getCode(Path) {

  let code = fsSync.readFileSync(Path, 'utf8');

  return code;

}

async function run() {

  const code = getCode('./code.txt');

  const prompt = getResponseFormat(code);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const filePath = 'documentation.txt';
  await fs.writeFile(filePath, text);
  console.log("text");

}

run();