import Koa from "koa";
import {router} from "../router/router.js";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

export const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());


