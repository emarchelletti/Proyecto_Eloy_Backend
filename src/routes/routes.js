import * as viewsRoutes from "./views/views.router.js";
import productRouter from "./api/product.router.js";
import cartRouter from "./api/cart.router.js";
import sessionsRouter from "./api/sessions.router.js";
import userRouter from "./api/users.router.js";
import mockRouter from "./test/mockRouter.js";
import loggerRouter from "./test/loggerRouter.js";
import * as notificationRouter from "./api/notification.router.js";

const configureRoutes = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/sessions", sessionsRouter);
  app.use("/api/products", productRouter);
  app.use("/api/mockingproducts", mockRouter);
  app.use("/api/carts", cartRouter);

  app.use("/", viewsRoutes.homeRouter);
  app.use("/index", viewsRoutes.indexRouter);
  app.use("/login", viewsRoutes.loginRouter);
  app.use("/register", viewsRoutes.registerRouter);
  app.use("/passwordRecovery", viewsRoutes.passwordRecoveryRouter);
  app.use("/resetPassword", viewsRoutes.passwordResetRouter);
  app.use("/profile", viewsRoutes.profileRouter);
  app.use("/cart", viewsRoutes.cartViewRouter);
  app.use("/products", viewsRoutes.productsViewRouter);
  app.use("/chat", viewsRoutes.chatRouter);
  app.use("/admin", viewsRoutes.adminUserViewRouter);

  app.use("/mail", notificationRouter.mailRouter);
  app.use("/sms", notificationRouter.smsRouter);

  app.use("/loggerTest", loggerRouter);
};

export default configureRoutes;
