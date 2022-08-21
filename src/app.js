const express = require("express");

const userRouter = require("./routes/userRoute");
const securityRouter = require("./routes/securityRoutes");
const roleRouter = require("./routes/roleRoutes");
mongoose = require("mongoose");

const { swaggerDocs: SwaggerDocs } = require("./swagger/swagger");

app = express();

require("dotenv").config();
require("./config/database").connect();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/users", userRouter);
app.use("/api/auth", securityRouter);
app.use("/api/role", roleRouter);

//setup server to listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is live on port 3000");
  SwaggerDocs(app, process.env.PORT || 3000);
});

