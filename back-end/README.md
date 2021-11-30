This project is a clone of a famous Q/A website for professional and enthusiast programmers using a completely different stack.

This repo consists of the Front-end code of the project, the frontend code is in [Stackoverflow-Frontend](git@github.com:phongvogit/stackoverflow-frontend.git)

## My Tech Stack (MERN)

#### Front-end

- Front-end library: `React.js (with Redux-Saga-Toolkit)`
- Styling: `CSS`

#### Back-end

- For handling server requests: `Node.js with Express.js Framework`
- As Database: `MONGODB`
- API tested using: `REST-CLIENT & POSTMAN`

## Guidelines to setup

## Setting Up

1. Create a `.env` file in the root directory and copy the content from `.env.example`
2. Make sure mongodb is running
3. Install dependencies: `yarn`
4. Using this commend for running the app: `cd src` & `node server.ts`
5. Use this command for development mode: `yarn run watch`
6. If you need to customize your env, take a look at `secrets.ts` file## API Endpoints
7. Using this command:

#### Base Url - `http://localhost:4567/api`

#### Authentication

- `GET /signup`
- `POST /authenticate`
- `POST /authenticate/token`

#### Users

- `GET /users`
- `POST /users/:search`
- `POST /users/:username`

#### Questions

- `GET /questions`
- `POST /questions`
- `GET /question/:question`
- `GET /questions/:questionSearch`
- `POST /questions/tags/search`
- `GET /question/user/:username`
- `DELETE /question/:question`

#### Answers

- `POST /answer/:question`
- `DELETE /answer/:question/:answer`

#### Comments

- `GET /posts/comments/:id`
- `POST /comment/:question/:answer?`
- `DELETE /comment/:question/:comment`
- `DELETE /comment/:question/:answer/:comment`

#### Tags

- `GET /tags`
- `GET /tags/:tag`

## DEMO

[https://stackoverflow-project-3699.herokuapp.com/api/<NameAPI>](https://stackoverflow-project-3699.herokuapp.com/api)
