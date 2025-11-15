import fs from "fs";
import User from "../models/user.model.js";
import RoadMap from "../models/roadmap.model.js";
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { json } from "stream/consumers";
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generatePath=async (req,res)=>{
    try{
            //1.get the skill name from the user 
            const {skill}=req.body;
            if(!skill){
                console.log('you need to provide a skill to get its learning path');
                return res.status(400).json({message:"you need to provide a skill name to get its learning path"});
            }

            //2.set the prompt
            const prompt = `
                Create a detailed learning path for mastering ${skill}.
                Provide 4–6 stages.
                For each stage return an object:
                {
                    "title": "...",
                    "description": "...",
                    "milestones": ["...", "..."],
                    "resources": ["...", "..."]
                }
                Return ONLY an array of these objects as valid JSON.
                `;
        
            //3.ask gemini 
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
            const result = await model.generateContent(prompt);
            //covert the response
            const responseText = result.response.text();
            const cleaned = responseText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();
            const jsonResponse = JSON.parse(cleaned);
             if (!Array.isArray(jsonResponse)) {
                    return res.status(500).json({ message: "Invalid AI output" });
                }

            //log it 
            console.log(jsonResponse);

            //6.create the new roadmap model file 

            const allMilestones = jsonResponse.flatMap(
                (s) => s.milestones || s.milestone || s.mileStones || []
                );
            const allResources = jsonResponse.flatMap((s) => s.resources || []);
            const fullDescription = jsonResponse
                .map((s) => `${s.title}: ${s.description}`)
                .join("\n\n");
            
            const roadmap = await RoadMap.create({
                user: req.user._id,
                title: skill.trim(),
                description:fullDescription ,
                resources: allResources,
                milestones: allMilestones,
                });

            //5.update the roadMaps and the activeLearningPaths count ++
            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push:{roadMaps:roadmap._id},
                    $inc:{activeLearningPaths:1},
                },
                {
                    new:true
                }
            )
            //6.return res
            return res.status(200).json({
                success:true,
                message:"new learning path added",
                path:roadmap,
            });
    }catch(err){
        console.log('couldnt generate path'+err.message);
        return res
        .status(500)
        .json({message:"couldnt generate path"+err.message});
        
    }
}