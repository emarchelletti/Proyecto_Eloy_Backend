import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  let data = {
    layout: "login",
    title: "Inicio de sesión",
    actionLogin: "/api/sessions/login/",
  };
  res.render("index", data);
});


export default router;
