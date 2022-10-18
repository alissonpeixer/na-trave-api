import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import {router} from "../router/router.js";
import { PrismaClient } from "@prisma/client";



export const app = new Koa();
export const prisma = new PrismaClient();
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());


