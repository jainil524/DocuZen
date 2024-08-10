import { GoogleGenerativeAI } from "@google/generative-ai";
import { promises as fs } from "fs";
import { readFileSync } from "fs";

import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.GOOGLE_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function getResponseFormat(API_CODE) {

  let response = readFileSync('./responseFormat.txt', 'utf8');

  response = response.replace("[API_CODE_HERE]", API_CODE);

  return response;
}

export async function generateMarkdown(code) {
  const prompt = getResponseFormat(code);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  console.log(text);


  return text;

}
