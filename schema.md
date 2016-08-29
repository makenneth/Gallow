# Schema Information

## Games
column name | data type | details
------------|-----------|----------------
id          | integer   | not null, primary key 
user_id1    | integer   | not null, foreign key, indexed
user_id2    | integer   | not null, foreign key, indexed
game state  | text      | 
             (json_bytes)

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
Info?       | string    | not null, foreign key, indexed
Wins        | integer   |
Losses      | integer   |


