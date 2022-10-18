import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const games = [
  {
    "dayGame": "2022-11-20T16:00:00Z",
    "homeTeam": "cat",
    "awayTeam": "equ"
  },
  {
    "dayGame": "2022-11-21T13:00:00Z",
    "homeTeam": "ing",
    "awayTeam": "ira"
  },
  {
    "dayGame": "2022-11-21T16:00:00Z",
    "homeTeam": "sen",
    "awayTeam": "hol"
  },
  {
    "dayGame": "2022-11-21T19:00:00Z",
    "homeTeam": "eua",
    "awayTeam": "gal"
  },
  {
    "dayGame": "2022-11-22T10:00:00Z",
    "homeTeam": "arg",
    "awayTeam": "ara"
  },
  {
    "dayGame": "2022-11-22T13:00:00Z",
    "homeTeam": "din",
    "awayTeam": "tun"
  },
  {
    "dayGame": "2022-11-22T16:00:00Z",
    "homeTeam": "mex",
    "awayTeam": "pol"
  },
  {
    "dayGame": "2022-11-22T19:00:00Z",
    "homeTeam": "fra",
    "awayTeam": "aus"
  },
  {
    "dayGame": "2022-11-23T10:00:00Z",
    "homeTeam": "mar",
    "awayTeam": "cro"
  },
  {
    "dayGame": "2022-11-23T13:00:00Z",
    "homeTeam": "ale",
    "awayTeam": "jap"
  },
  {
    "dayGame": "2022-11-23T16:00:00Z",
    "homeTeam": "esp",
    "awayTeam": "cos"
  },
  {
    "dayGame": "2022-11-23T19:00:00Z",
    "homeTeam": "bel",
    "awayTeam": "can"
  },
  {
    "dayGame": "2022-11-24T10:00:00Z",
    "homeTeam": "sui",
    "awayTeam": "cam"
  },
  {
    "dayGame": "2022-11-24T13:00:00Z",
    "homeTeam": "uru",
    "awayTeam": "cor"
  },
  {
    "dayGame": "2022-11-24T16:00:00Z",
    "homeTeam": "por",
    "awayTeam": "gan"
  },
  {
    "dayGame": "2022-11-24T19:00:00Z",
    "homeTeam": "bra",
    "awayTeam": "ser"
  },
  {
    "dayGame": "2022-11-25T10:00:00Z",
    "homeTeam": "gal",
    "awayTeam": "ira"
  },
  {
    "dayGame": "2022-11-25T13:00:00Z",
    "homeTeam": "cat",
    "awayTeam": "sen"
  },
  {
    "dayGame": "2022-11-25T16:00:00Z",
    "homeTeam": "hol",
    "awayTeam": "equ"
  },
  {
    "dayGame": "2022-11-25T19:00:00Z",
    "homeTeam": "ing",
    "awayTeam": "eua"
  },
  {
    "dayGame": "2022-11-26T10:00:00Z",
    "homeTeam": "tun",
    "awayTeam": "aus"
  },
  {
    "dayGame": "2022-11-26T13:00:00Z",
    "homeTeam": "pol",
    "awayTeam": "ara"
  },
  {
    "dayGame": "2022-11-26T16:00:00Z",
    "homeTeam": "fra",
    "awayTeam": "din"
  },
  {
    "dayGame": "2022-11-26T19:00:00Z",
    "homeTeam": "arg",
    "awayTeam": "mex"
  },
  {
    "dayGame": "2022-11-27T10:00:00Z",
    "homeTeam": "jap",
    "awayTeam": "cos"
  },
  {
    "dayGame": "2022-11-27T13:00:00Z",
    "homeTeam": "bel",
    "awayTeam": "mar"
  },
  {
    "dayGame": "2022-11-27T16:00:00Z",
    "homeTeam": "cro",
    "awayTeam": "can"
  },
  {
    "dayGame": "2022-11-27T19:00:00Z",
    "homeTeam": "esp",
    "awayTeam": "sui"
  },
  {
    "dayGame": "2022-11-28T10:00:00Z",
    "homeTeam": "cam",
    "awayTeam": "ser"
  },
  {
    "dayGame": "2022-11-28T13:00:00Z",
    "homeTeam": "cor",
    "awayTeam": "gan"
  },
  {
    "dayGame": "2022-11-28T16:00:00Z",
    "homeTeam": "bra",
    "awayTeam": "sui"
  },
  {
    "dayGame": "2022-11-28T19:00:00Z",
    "homeTeam": "por",
    "awayTeam": "uru"
  },
  {
    "dayGame": "2022-11-29T15:00:00Z",
    "homeTeam": "equ",
    "awayTeam": "sen"
  },
  {
    "dayGame": "2022-11-29T15:00:00Z",
    "homeTeam": "hol",
    "awayTeam": "cat"
  },
  {
    "dayGame": "2022-11-29T19:00:00Z",
    "homeTeam": "gal",
    "awayTeam": "ing"
  },
  {
    "dayGame": "2022-11-29T19:00:00Z",
    "homeTeam": "ira",
    "awayTeam": "eua"
  },
  {
    "dayGame": "2022-11-30T15:00:00Z",
    "homeTeam": "aus",
    "awayTeam": "din"
  },
  {
    "dayGame": "2022-11-30T15:00:00Z",
    "homeTeam": "tun",
    "awayTeam": "fra"
  },
  {
    "dayGame": "2022-11-30T19:00:00Z",
    "homeTeam": "pol",
    "awayTeam": "arg"
  },
  {
    "dayGame": "2022-11-30T19:00:00Z",
    "homeTeam": "ara",
    "awayTeam": "mex"
  },
  {
    "dayGame": "2022-12-01T15:00:00Z",
    "homeTeam": "cro",
    "awayTeam": "bel"
  },
  {
    "dayGame": "2022-12-01T15:00:00Z",
    "homeTeam": "can",
    "awayTeam": "mar"
  },
  {
    "dayGame": "2022-12-01T19:00:00Z",
    "homeTeam": "jap",
    "awayTeam": "esp"
  },
  {
    "dayGame": "2022-12-01T19:00:00Z",
    "homeTeam": "cos",
    "awayTeam": "ale"
  },
  {
    "dayGame": "2022-12-02T15:00:00Z",
    "homeTeam": "gan",
    "awayTeam": "uru"
  },
  {
    "dayGame": "2022-12-02T15:00:00Z",
    "homeTeam": "cor",
    "awayTeam": "por"
  },
  {
    "dayGame": "2022-12-02T19:00:00Z",
    "homeTeam": "ser",
    "awayTeam": "sui"
  },
  {
    "dayGame": "2022-12-02T19:00:00Z",
    "homeTeam": "cam",
    "awayTeam": "bra"
  }
]

const platterSeed = async () =>{
  await prisma.game.createMany({
    data: games
  })
}
platterSeed()