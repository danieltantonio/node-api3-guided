const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();
const logger = morgan('combined');

const greeter = (req,res,next) => {
  console.log('Hello there :)');
  next();
}

const passwordChecker = (req, res, next) => {
  if(req.headers.password === 'melon') {
    next();
  } else {
    return res.status(401).json({ message: 'Password is not melon!!' });
  }
};

// middleware
server.use(express.json());
server.use(logger);
server.use(greeter);
server.use(passwordChecker);

// endpoints
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';
  const password = req.headers.password;

  res.status(200).json({ name: nameInsert, password });
});

module.exports = server;
