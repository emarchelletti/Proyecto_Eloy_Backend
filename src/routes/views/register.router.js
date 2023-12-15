import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  let data = {
    layout: "register",
    title_register: "Registro",
    actionRegister: "/api/sessions/register/",
  };
  res.render("index", data);
});


export default router;
