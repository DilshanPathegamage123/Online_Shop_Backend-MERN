import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Config/db";
import productRoutes from "./routes/product_routes";
import user_routes from "./routes/user_routes";
import auth_routes from "./routes/auth_routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", productRoutes);
app.use("/api", user_routes);
app.use("/api/auth", auth_routes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database.", error);
    process.exit(1);
  });
