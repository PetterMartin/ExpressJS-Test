import { mockUsers } from "./utils/constants.mjs";
import { createApp } from "./createApp.mjs";
import mongoose from "mongoose";
import { config } from "dotenv";
config({ path: ".env.local" });

mongoose
  .connect(process.env.DATABASE_PASSWORD)
  .then(() => console.log("Connected To Database"))
  .catch((err) => console.log(`Error: ${err}`));

const app = createApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});