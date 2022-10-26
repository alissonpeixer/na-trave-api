import { prisma } from "../app.js";
import bcrypt from "bcrypt";
import { CretedJwtToken } from "../util/Jwt/token.js";
import { VerifyJwtToken } from "../util/Jwt/verify.js";

export const created = async (ctx) => {
  const reqBody = ctx.request.body;

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const password = bcrypt.hashSync(reqBody.password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        email: reqBody.email,
        name: reqBody.name,
        username: reqBody.username,
        password,
      },
    });

    const acessToken = CretedJwtToken(user);

    ctx.body = {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      acessToken,
    };
  } catch (error) {
    if (error.code === "P2002") {
      ctx.body = "E-mail ou username em uso!";
      ctx.status = 402;

      return;
    }

    ctx.body = error;
    ctx.status = 403;
  }
};

export const login = async (ctx) => {
  const [, token] = ctx.request.headers.authorization.split(" ");
  const [login, plainTextPassword] = Buffer.from(token, "base64")
    .toString()
    .split(":");

  const user =
    (await prisma.User.findUnique({ where: { username: login } })) ||
    (await prisma.User.findUnique({ where: { email: login } }));

  if (!user) {
    ctx.status = 403;
    ctx.body = "Login ou senha invalido!";
    return;
  }

  const password = await bcrypt.compare(plainTextPassword, user.password )

  console.log(password)
  if (password) {

    ctx.body = {
      id: user.id,
      name: user.name,
      username: user.username,
      acessToken:  CretedJwtToken(user),
    };
    return;
  }

  ctx.status = 403;
  ctx.body = "Login ou senha invalido!";
  return;


};

export const authVerification = async (ctx) => {

  const [, token]= ctx.request.header.auth.split(' ');


  try {
    const decoded = VerifyJwtToken(token)

    ctx.body = {
      valid: true,
      name: decoded.data.name,
      username: decoded.data.username,
      id: decoded.data.id,
      acessToken: decoded.data.acessToken
    }

  } catch (error) {

      if(error.message === "jwt expired"){
        ctx.body = { valid: false, msg: "jwt expired", error }

        return
      }
      ctx.body = error
      ctx.status = 500;
  }
};


export const listUser = async (ctx) => {
  const getAllUser = await prisma.User.findMany({
    select: {
      id: true,
      username: true,
      name: true
    },
  })



  ctx.body = getAllUser
};
