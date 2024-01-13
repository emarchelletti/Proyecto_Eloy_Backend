import {
  indexRouter,
  homeRouter,
  realTimeProducts,
  chatRouter,
  productsViewRouter,
  cartViewRouter,
  loginRouter,
  profileRouter,
  registerRouter,
} from "./routes/views/views.router.js";
import productRouter from "./routes/api/product.router.js";
import cartRouter from "./routes/api/cart.router.js";
import sessionsRouter from "./routes/api/sessions.router.js";
import userRouter from "./routes/api/users.router.js";

const configureRoutes = (app) => {
  app.use("/api/products", productRouter);
  app.use("/api/carts", cartRouter);
  app.use("/api/users", userRouter);
  app.use("/api/sessions", sessionsRouter);
  app.use("/", indexRouter);
  app.use("/login", loginRouter);
  app.use("/register", registerRouter);
  app.use("/profile", profileRouter);
  app.use("/carts", cartViewRouter);
  app.use("/products", productsViewRouter);
  app.use("/realtimeproducts", realTimeProducts);
  app.use("/home", homeRouter);
  app.use("/chat", chatRouter);
};

export default configureRoutes;
