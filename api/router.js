import Router from "@koa/router";
import  * as users  from './users/index.js'
import  * as hunches  from './hunches/index.js'


export const router = new Router();

router.get('/', ctx =>{
    return ctx.body = 'SERVER ON!'
})

router.post( "/signup", users.created )


router.get( "/signin", users.login );


router.post('/hunches', hunches.created );


router.get('/games', hunches.getGames );
router.get('/hunches', hunches.getHunches );

router.get('/users/:username', hunches.list );
router.get('/users', users.listUser );

router.get('/u/auth', users.authVerification );


router.patch('/hunches/like', hunches.like );
router.delete('/hunches/removed', hunches.removed );



