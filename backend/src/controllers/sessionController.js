import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: "Problem and difficulty are required" });
    }

    // generate a unique id for stream video
    const callId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;

    // create session in mongo db
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    // create stream video call
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    // chat messaging
    chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by: clerkId,
      members: [clerkId],
    });

    res.status(201).json({ session });
  } catch (err) {
    console.error("Error occured in createSession sessionController: ", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function getActiveSessions(_, res) {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profilePicture email clerkId")
      .sort({ created_At: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (err) {
    console.error(
      "Error occured in getActiveSessions sessionController: ",
      err
    );
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function getCompletedSessions(req, res) {
  try {
    const userId = req.user._id;

    // get sessions where user is either host ot participant
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ created_at: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (err) {
    console.error(
      "Error occured in getCompletedSessions sessionController: ",
      err
    );
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email profilePicture clerkId")
      .populate("participant", "name email profilePicture clerkId");

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.status(200).json({ session });
  } catch (err) {
    console.error("Error occured in getSessionById sessionController: ", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });
    // check if participant is already there
    if (session.participant)
      return res.status(404).json({ message: "Session is full" });

    session.participant = userId;
    await session.save();

    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    res.status(200).json({ session });
  } catch (err) {
    console.error("Error occured in joinSession sessionController: ", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });
    // check if user is host or not
    if (session.host.toString() !== userId.toString())
      return res.status(403).json({ message: "Only the host can end session" });

    // chech if session is alreacy completed
    if (session.status === "completed") {
      return res.status(400).json({ message: "Session already completed" });
    }

    session.status = "completed";
    await session.save();

    // delete video call and chat messaging
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });
    const chatChannel = chatClient.channel("messaging", session.callId);
    await chatChannel.delete();

    res.status(200).json({ session, message: "Session ended sucessfully" });
  } catch (err) {
    console.error("Error occured in endSession sessionController: ", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
