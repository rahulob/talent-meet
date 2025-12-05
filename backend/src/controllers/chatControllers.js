import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    // using clerk id and not mongodb id => should match the id in stream dashboard
    const token = chatClient.createToken(req.user.clerkId);

    res.status(200).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.profilePicture,
    });
  } catch (err) {
    console.error("Error occured in getStreamToken:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
