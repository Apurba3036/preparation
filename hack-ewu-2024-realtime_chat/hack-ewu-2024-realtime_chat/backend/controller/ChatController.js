const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const dotenv = require("dotenv");
const pusher = require("../lib/pusher");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports.message = async (req, res) => {
  const { input } = req.body;

  pusher.trigger(`chat`, "chat", {
    message: input,
  });

  return res.send("ok");
};
