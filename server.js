import express from "express";
import publicRoutes from "./routes/publicRoutes.js";
import privateRoutes from "./routes/privateRoutes.js";
import auth from "./middlewares/auth.js";

const app = express();
app.use(express.json());

app.use("/", publicRoutes);
app.use("/", auth, privateRoutes);

app.listen(3000, () => {
  console.log("Servidor escutando!");
});
