import express from "express";
import userModel from "../../dao/models/user.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let users = await userModel.find()
  res.json(users);
  console.log(`Se realizo una consulta a la base de datos de "Usuarios"`);
});

  export default router;