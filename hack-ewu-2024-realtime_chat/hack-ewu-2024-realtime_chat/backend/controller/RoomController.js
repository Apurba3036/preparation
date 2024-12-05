const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const Room = require("../models/room");

const dotenv = require("dotenv");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports.create = async (req, res) => {
  const { data, position, images } = req.body;
 console.log(position)
  await Room.create({
    ...data,
    lat: position.lat,
    lon: position.lng,
    images: [],
  });
  return res.send("ok");
};

module.exports.roomList = async (req, res) => {
  const rooms = await Room.find();
  return res.send(rooms);
};

module.exports.analyze = async (req, res) => {
  const body = req.body;

  const { nearbyPlaces } = body;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent([
    `Based on the provided information, calculate a score from 1 to 100 to determine the suitability of the selected location for bachelors, focusing on convenience for accessing essential amenities like groceries and transportation. Use the proximity to nearby amenities and the number of available amenities to determine the score, giving higher scores to locations with closer and more frequent access to these necessary amenities. Only return the score:

    ${nearbyPlaces.map((item) => {
      return `Place name: ${item.name} - Place Categories: ${item.categories} - Distance: ${item.distance}`;
    })}`,
  ]);

  // console.log(result.response.text());

  return res.send(result.response.text());
};

module.exports.uploadSuggestion = async (req, res) => {
  const { cloudImgUrl, geminiData } = req.body;

  try {
    console.log(req.body);

    await Room.create({
      cloudImgUrl: cloudImgUrl,
      geminiData: geminiData,
    });
    return res.send("ok");
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.roomDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Room.findById(id);
    if (result) {
      return res.send(result);
    } else {
      return res.status(404).send({ message: "Payment not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Failed to retrieve payment details" });
  }
};
