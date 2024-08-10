import { GoogleGenerativeAI } from "@google/generative-ai";
import { promises as fs } from "fs";
import { readFileSync } from "fs";

import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function getResponseFormat(API_CODE) {

  let response = readFileSync('./responseFormat.txt', 'utf8');

  response = response.replace("[API_CODE_HERE]", API_CODE);

  return response;
}

function getCode(Path) {

  let code = readFileSync(Path, 'utf8');

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