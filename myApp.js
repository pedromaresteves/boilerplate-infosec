const express = require('express');
const app = express();
const helmet = require("helmet");
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;;

// app.use(helmet.hidePoweredBy()); //Hide this the app is powered by Express
// app.use(helmet.frameguard({ action: "deny" })); //Deny this app can be used in an iframe
// app.use(helmet.xssFilter()); //?Reduces? XSS attacks
// app.use(helmet.noSniff());  //Instructs the browser to not bypass the provided Content-Type
// app.use(helmet.ieNoOpen());
// app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true })); //Redirect http to https
// app.use(helmet.dnsPrefetchControl()); //Disable DNS Prefetching
// app.use(helmet.noCache()); //Disable browser caching
// app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"] } })); //A powerful allow-list of what can happen on your page which mitigates many attacks

app.use(helmet({
  frameguard: {
    action: "deny"
  }, contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
    },
    dnsPrefetchControl: false
  },
}))








































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
