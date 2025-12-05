import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("❌ STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret); // this is only for chat features
export const streamClient = new StreamClient(apiKey, apiSecret); // this is used for video calls

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    return userData;
  } catch (err) {
    console.error("Error upserting Stream user: ", err);
  }
};

export const deleteStreamUser = async (userID) => {
  try {
    await chatClient.deleteUser(userID);
    console.log("Stream User deleted successfully: ", userID);
  } catch (err) {
    console.error("Error deleting the stream user: ", err);
  }
};
