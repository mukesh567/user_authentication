const express = require("express");
const authRoute = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const app = express();
const cors = require("cors");

//Middleware
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

//Use here router
app.use("/api/auth", authRoute);

//Error middleware
app.use(errorMiddleware);

//And here we run our site if connection is correct
const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Our server running at port : ${PORT}`);
  });
});
