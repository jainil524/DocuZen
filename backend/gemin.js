const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(`AIzaSyD5GVKbIsLVu9dPB5jTWrFbU4tTXMDX2es`);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const fs = require("fs").promises;

async function run() {
    const prompt = `Write documentation for below api endpoint
                    app.post('/data', (req, res) => {
  const { name, age } = req.body;
  res.json({
    message: \`Received data: Name is \${name}, Age is \${age}\`
  });
});
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const filePath = 'documentation.txt';
    await fs.writeFile(filePath, text);
    console.log("text");

}

run();