# API Endpoints
`POST /session/new - loggin`
`DELETE /session - logout`

`GET /games/:id - fetch the game`
`POST /games/:id - create the game`
`PATCH /games/:id - update the game state`

`GET /games/:id/messages - fetch messages of a particular game`
`NO POST.. post will be through socket`

`GET /user - fetch info of the current user`
`POST /user/new - register user`

`GET /user/games - fetch all the games for a particular user`

`**Bonus** GET /user/record - fetch the user's record`
`**Bonus** PATCH /user/record - update the user's record`