import { prisma } from '../app.js'
import { addDays, formatISO } from 'date-fns'
import { VerifyJwtToken } from '../util/Jwt/verify.js'
import * as jwt from "jsonwebtoken";

// POST
export const created = async (ctx) =>{

  const  homeTeamScore = parseInt(ctx.request.body.homeScore)
  const  awayTeamScore  = parseInt(ctx.request.body.awayScore)



  if(homeTeamScore !== 0 || awayTeamScore !== 0){

    if(!homeTeamScore && !awayTeamScore){


      ctx.status = 400
      ctx.body = 'FALTANDO homeTeamScore E awayTeam'
      return
    }

  }


  const token = ctx.request.header.authorization.split(" ")[1]

  const { gameId } = ctx.request.body




  try {

    const decoded = VerifyJwtToken(token)

    if(!gameId || !decoded.data.id){
      ctx.body = 'GAME ID | USER ID'
      ctx.status = 400
      return
    }

    const [ dbHunch ] = await prisma.hunch.findMany({
      where: {gameId, userId: decoded.data.id}
    })

    ctx.body = dbHunch ?
    await prisma.hunch.update({
      where: {
        id: dbHunch.id
      },
      data: {
        homeTeamScore: homeTeamScore,
        awayTeamScore: awayTeamScore
      }
    }) :
    await prisma.hunch.create({
      data:{
        gameId,
        userId: decoded.data.id,
        homeTeamScore: homeTeamScore,
        awayTeamScore: awayTeamScore
      }
    })

  } catch (error) {

    console.log(error)

    if(error.name === 'TokenExpiredError'){

      ctx.body = error.name
      ctx.status = 401;
      return
    }

    ctx.body = error
    ctx.status = 500;
    return
  }

}

// GET
export const getGames = async (ctx) => {
  const token = ctx.request.header.authorization.split(" ")[1]
  try {

    VerifyJwtToken(token)



    const currentData = ctx.request.query.gameTime

    if(currentData){

      const games = await prisma.game.findMany({
        where: {
          dayGame: {
            gte: currentData,
            lt: formatISO(addDays(new Date(currentData), 1))
          }
        }
      })

      ctx.body = games
      ctx.status = 200

      return
    }

    const gamesMany = await prisma.game.findMany()

    ctx.body = gamesMany
    ctx.status = 200
  } catch (error) {
    console.log(error)

    if(error.name === 'TokenExpiredError'){

      ctx.body = error.name
      ctx.status = 401;
      return
    }

    ctx.body = error
    ctx.status = 500;
    return
  }

}


export const getHunches = async (ctx) =>{

  const { gameId, userId } =  ctx.request.query
  const token = ctx.request.header.authorization.split(" ")[1]

  try {

    VerifyJwtToken(token)
    if(!gameId || !userId){
      ctx.body = 'GAME ID | USER ID'
      ctx.status = 400
      return
    }

    const [ dbHunch ] = await prisma.hunch.findMany({
      where: {gameId, userId}
    })



    ctx.body = dbHunch


  } catch (error) {
    console.log(error)

    if(error.name === 'TokenExpiredError'){

      ctx.body = error.name
      ctx.status = 401;
      return
    }

    ctx.body = error
    ctx.status = 500;
    return
  }

}



export const list = async ctx =>{
  const username = ctx.request.params.username

  const user = await prisma.user.findUnique({
    where: {username}
  })

  if(!user){
    ctx.body = 'user not found'
    ctx.status = 404
    return
  }

  const hunches = await prisma.hunch.findMany({
    where:{
      userId: user.id
    },
    include:{
      game: true,
      Like: true
    }
  })



  ctx.body = {
    name: user.name,
    username: user.username,
    hunches
  }
}



export const like = async (ctx) =>{
  const [, token] = ctx.request.header.authorization.split(' ');
  const reqBody = ctx.request.body


  try {

    const decoded = VerifyJwtToken(token)


    const [ idLiked ] = await prisma.like.findMany({
      where:{
        userId: decoded.data.id,
        hunchId:  reqBody.hunchId
      }
    })


    if(!idLiked) {
      await prisma.like.createMany({
        data:{
          userId: reqBody.userId,
          hunchId:  reqBody.hunchId
        }
      })

      ctx.body = 'CREATED'
      console.log('criado')
      return
    }

    const deleted = await prisma.Like.delete({
      where:{
        id: idLiked.id
      }
    })


    ctx.body = 'DELETED'

    return


  } catch (error) {
    console.log(error)
    ctx.status = 500
  }




}


export const removed = async (ctx) =>{
  const reqBody = ctx.request.body

  try {
    const delet = await prisma.hunch.delete({
      where:{
        id:reqBody.params
      },
      include:{
        Like: true
      }
    })


    return delet
  } catch (error) {
    console.log(error)
  }
}