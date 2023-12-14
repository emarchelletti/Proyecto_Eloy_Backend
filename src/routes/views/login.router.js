import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  let data = {
    layout: "main",
    title: "Inicio de sesión",
    title_register: "Registro",
    actionRegister: "/api/sessions/register/",
    actionLogin: "/api/sessions/login/",
  };
  res.render("main", data);
});


export default router;
