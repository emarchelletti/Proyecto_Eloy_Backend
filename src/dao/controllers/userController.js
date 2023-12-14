const showProfile = (req, res) => {
  let user = {
    layout: "profile",
    name: req.session.name,
    email: req.session.email,
  };
  console.log(user);
  res.render("profile", { user });
};

export { showProfile };
