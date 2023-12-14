import express from "express";
import { messageModel } from "../../dao/models/messages.model.js";

const messageRouter = express.Router();

messageRouter.get("/", async (req, res) => {
  try {
    let message = await messageModel.find();
    res.send({ result: "success", payload: message });
  } catch (error) {
    console.log("Cannot get user with mongoose: ", error);
  }
});

messageRouter.post("/", async (req, res) => {
  let { user, message } = req.body;

  if (!user || !message)
    return res.send({ status: "Error", error: "Incomplete values" });

  let result = await messageModel.create({
    user,
    message,
  });

  res.send({ status: "success", payload: result });
});

messageRouter.put("/:uid", async (req, res) => {
  let { uid } = req.params;
  let messageToReplace = req.body;

  if (
    !messageToReplace.first_name ||
    !messageToReplace.last_name ||
    !messageToReplace.email
  )
    return res.send({ status: "Error", error: "Incomplete values" });

  let result = await messageModel.updateOne(
    {
      _id: uid,
    },
    userToReplace
  );

  res.send({ status: "success", payload: result });
});

messageRouter.delete("/:uid", async (req, res) => {
  let { uid } = req.params;

  let result = await messageModel.deleteOne({
    _id: uid,
  });

  res.send({ status: "success", payload: result });
});

export default messageRouter;
