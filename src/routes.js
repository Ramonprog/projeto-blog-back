import express from "express";
import { register } from "./controllers/users.js";

const routes = express();

routes.post("/register", register);

export default routes;
