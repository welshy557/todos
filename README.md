# todos-backend
This repo serves as the backend for a todos app.

The backend is built primarly with node.js, Knex, and a Postgresql database.

The database for this app is hosted via the free database service, bit.io

If you wish to use the backend for this app locally, you must setup a postgresql database locally.


Inital Setup:
- Create a postgresql database.
- Navigate to db/knexfile.ts
- Enter your db credientials into devolpment.
- Open your terminal and run "yarn migrate:dev" to setup the tables in the db.
- run "yarn install"

Start Up:
- yarn dev

Scripts:
- yarn dev - Starts the server in devolpment mode allowing the server to automatically restart on file changes via nodemon.
- yarn start - Used by Heroku to start the server
- yarn migrate:production - Rollsback and migrates the production database
- yarn migrate:dev - Rollsback and migrates the dev database

Repo for frontend of the app is located at: https://github.com/welshy557/todos-frontend
