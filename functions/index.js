const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google-generative-ai/generative-ai");

admin.initializeApp();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.askAI = functions.https.onCall(async (data, context) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(data.prompt);
  return { text: result.response.text() };
});

