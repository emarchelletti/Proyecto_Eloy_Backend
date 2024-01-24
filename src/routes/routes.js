import * as viewsRoutes from "./views/views.router.js";
import productRouter from "./api/product.router.js";
import cartRouter from "./api/cart.router.js";
import sessionsRouter from "./api/sessions.router.js";
import userRouter from "./api/users.router.js";

const configureRoutes = (app) => {
  app.use("/api/products", productRouter);
  app.use("/api/carts", cartRouter);
  app.use("/api/users", userRouter);
  app.use("/api/sessions", sessionsRouter);
  app.use("/", viewsRoutes.indexRouter);
  app.use("/login", viewsRoutes.loginRouter);
  app.use("/register", viewsRoutes.registerRouter);
  app.use("/profile", viewsRoutes.profileRouter);
  app.use("/carts", viewsRoutes.cartViewRouter);
  app.use("/products", viewsRoutes.productsViewRouter);
  app.use("/chat", viewsRoutes.chatRouter);
};

export default configureRoutes;
