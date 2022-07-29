import Router from "@koa/router";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
export const router = new Router();


const dataBase = []

router.post("/", async ctx =>{
  const reqBody = ctx.request.body;
  const user = await prisma.tarefa.create({
    data: { 
      username: "alisson",
      tarefaId: reqBody.tarefaID,
      tarefa: reqBody.tarefa,
      data: reqBody.data
     },
  })

  ctx.body = user
})





router.get("/", async ctx =>{
  const posts = await prisma.Tarefa.findMany({
    where: {username: "alisson"}
  })

  
  ctx.body = posts
})



router.post("/remove", async ctx =>{  
  const delTarefa = await prisma.tarefa.delete({
    where: {
      tarefaId: ctx.request.body.tarefaId
    }
  })
  
  
  ctx.body = delTarefa
})
