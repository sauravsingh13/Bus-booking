const proxy = require('http-proxy-middleware');

module.exports = function(app) {

  console.log("appppppppp", app)
  app.use(proxy('/addUsers', { target: 'http://localhost:8080/register' }));
  app.use(proxy('/addCity', { target: 'http://localhost:8080/city' }));
};