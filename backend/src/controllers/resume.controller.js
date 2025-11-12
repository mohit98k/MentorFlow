import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

import cloudinary from "../utils/cloudinary.js"


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Expected JSON schema
const jsonSchema = {
  type: "object",
  properties: {
    ats_score: {
      type: "number",
      description:
        "A score from 1 to 100 representing the resume's ATS compatibility and strength.",
    },
    suggestions: {
      type: "array",
      items: { type: "string" },
      description: "A list of actionable suggestions to improve the resume.",
    },
  },
  required: ["ats_score", "suggestions"],
};

export const reviewResume = async (req, res) => {
  try {
    // 1. Confirm file exists
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    //upload to cloud
    const uploadedResult=await cloudinary.uploader.upload(req.file.path,{
      resource_type:"auto",
      folder:"resumes",
    });
    const resumeUrl=uploadedResult.secure_url;


    // 3. Extract text from PDF
    const buffer = fs.readFileSync(req.file.path);
    const data = await pdf(buffer);
    const resumeText = data.text.slice(0, 4000);

    // 4. Build the prompt
    const prompt = `
      Analyze this resume and respond in valid JSON:
      {"ats_score": number, "suggestions": [string]}
      Resume:
      ${resumeText}
    `;

    // 5. Ask Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: jsonSchema,
      },
    });

    // 6. Get Gemini response text
    const responseText = result.response.text();
    const jsonResponse = JSON.parse(responseText);


    //log
    console.log('the ats score is : '+jsonResponse.ats_score);

    //update in the user's profile 
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push:{resumeUrls:resumeUrl},
        $set:{resumeScore:jsonResponse.ats_score,}
  
      },
      
    );
    //delete the file
    fs.unlinkSync(req.file.path);

    // 7. Return clean response
    return res.status(200).json({
      success: true,
      data: jsonResponse,
    });
  } catch (err) {
    console.error("Couldn't upload the resume:", err.message);
    return res
      .status(500)
      .json({ message: "Couldn't upload the resume", error: err.message });
  }
};
