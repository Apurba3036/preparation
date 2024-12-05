const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const Room = require("../models/room");
const dotenv = require("dotenv");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports.chat = async (req, res) => {
  const { input } = req.body;

  const rooms = await Room.find();

  const combinedPrompt = `
          Analyze the following home data and respond to the user's prompt and if user asked any other question beside home ans that you are only trained for home analysis:
          Homes Data: ${JSON.stringify(rooms)}
          User Prompt: ${input}
        `;

  const model = await genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const result = await model.generateContent(combinedPrompt);


  return res.send(result.response.text());
};
