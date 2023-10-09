import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./db/connect.js";

import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

//
// Pull les variables d'environnement à parti du fichier dotenv
//
dotenv.config();

//
// Initialiser l'app
//
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

//
// 👇 Gestion des routes ici
//
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", (req, res) => {
  res.send("Hello from DALL-E !");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server listening on http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
