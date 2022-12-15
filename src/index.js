import express from "express";
import cors from "cors";
import routes from "./routes";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = 3333;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
