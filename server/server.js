const morgan = require("morgan");
const { app } = require("./App");
const Razorpay = require("razorpay");

app.use(morgan("dev"));

app.listen(process.env.PORT, (req, res, next) => {
  console.log(`Server is running on ${process.env.PORT} `);
});
