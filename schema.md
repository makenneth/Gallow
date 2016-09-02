# Schema Information

## Games
column name | data type | details
------------|-----------|----------------
id          | integer   | not null, primary key 
game_state  | text      | (jsonbytes)

## GameMessages(join table)
column name | data type | details
------------|-----------|----------------
id          | integer   | not null, primary key 
game_id     | integer   | not null, foreign key, indexed
message_id  | integer   | not null, foreign key, indexed

## Messages (either store in sql or redis)
column name | data type | details
------------|-----------|----------------
id          | integer   | not null, primary key 
user_id     | integer   | not null, foreign key, indexed
body        | integer   | not null

## Users
column name | data type | details
------------|-----------|----------------
id          | integer   | not null, primary key 
OAuth Token?| string    | not null, indexed
SessionToken| string    | not null
Info?       | string    | not null, foreign key, indexed
Wins        | integer   |
Losses      | integer   |

## UsersGames
column name | data type | details
------------|-----------|----------------
id          | integer   | not null, primary key 
user_id     | integer   | not null, foreign key, indexed
game_id     | integer   | not null, foreign key, indexed 
