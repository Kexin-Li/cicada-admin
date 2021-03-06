const express = require('express');
const path = require('path');

const routes = require('./routes/routes.json');

const app = express();

app.use(express.static('dist'));

routes.forEach((route) => {
  app[route.method](route.path, require(path.join(__dirname, 'controllers', route.module))[route.handler]);
});

app.listen(8080, () => console.log('Listening on port 8080!'));
