import express from "express";
import morgan from "morgan";
import cors from 'cors'
import path from 'path'
import mongoose from "mongoose";
import helmet from "helmet";
import compression from "compression";

/** initialize by just importing */
import { config, envConfig } from "./config/setupEnv";
/** end */

import { HttpException } from "./config/global";
import { applicationRouter } from "./router/application.router";
import { getResume } from "./controllers/resume.controller";


mongoose.set("bufferCommands", false);
//mongoose.set('bufferMaxEntries', 0);

/** Depreciation warnings */
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(envConfig.mongoURI, err => {
  if (!err) {
    console.log("MongoDB connection succeeded.");
  } else {
    console.log(
      "Error in MongoDB connection : " + JSON.stringify(err, undefined, 2)
    );
  }
});

// mongoose.connection.on('connected', function(){
//     console.log("Mongoose default connection is open to ");
// });

// mongoose.connection.on('error', function(err){
//     console.log("Mongoose default connection has occured "+err+" error");
// });

// mongoose.connection.on('disconnected', function(){
//     console.log("Mongoose default connection is disconnected");
// });


let app = express();

/**
 * If an incoming request uses a protocol other than HTTPS, redirect that request to the same url but with HTTPS
 */
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(["https://", req.get("Host"), req.url].join(""));
    }
    next();
  };
};

app.use(compression());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "base-uri": ["'self'"],
      "block-all-mixed-content": [],
      "font-src": ["'self'", "https:", "data:"],
      "frame-ancestors": ["'self'"],
      "img-src": ["'self'", "https:", "data:"],
      "object-src": ["'none'"],
      "script-src": ["'self'", "'unsafe-inline'"],
      "script-src-attr": ["'none'"],
      "style-src": ["'self'", "https:", "'unsafe-inline'"],
      "upgrade-insecure-requests": []
    },
  })
);

app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.disable("view cache");

// app.all('*',function(req, res, next) {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set('Access-Control-Allow-Headers','Content-Type');
//   next();
// })

envConfig.isProduction ? (
  console.log("server is running in production")
  // app.use(forceSSL())
) : (
    console.log("server is running in development"),
    app.use(morgan("dev")),
    /** allow cross-origin acess */
    app.use(cors())
  )


app.use(`${config.restAPI}/application`, applicationRouter);
app.use(`${config.resume.resumeRequestUrl}/:id`, getResume);


envConfig.isProduction ? (

  app.use(express.static(path.join(__dirname, "../public"))),

  app.get("/*", function (req, res, next) {
    if (!req.path.includes(config.restAPI))
      res.sendFile(path.join(__dirname, "../public", "index.html"));
    else next();
  })

) : null


app.use("**", invalidPath);
function invalidPath(req, res, next) {
  next(new HttpException("Invalid path", 404));
}

/**
 * error handler
 */
function errorMiddleware(
  error: HttpException,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({ status: false, message });
}

app.use(errorMiddleware);

export default app;
