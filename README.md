# Aerogram
A full stack chat application using web sockets. Postgres is used for storing user information and Redis is used to
quickly cache and retrieve messages between users, with user authentication handled via JWT. I wanted it to be something of a
callback to the days of IRC so users can join one of five publicly available channels or create their own private ones. Try it
[here](aerogram.vercel.app)!

## Technologies Used
- Vue
- Node/Express
- Postgres
- Redis
- Websockets/Socket.io
- JSON Web Tokens

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
