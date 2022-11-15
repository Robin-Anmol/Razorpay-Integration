const Razorpay = require("razorpay");
const crypto = require("crypto");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECERET,
});

exports.checkout = async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount * 100), //it is the smallest currency eg in india this is in paise     currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    sucess: true,
    order,
  });
};

exports.paymentVerification = (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECERET)
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", razorpay_signature);
  console.log("sig generated ", expectedSignature);
  let response = { signatureIsValid: "false" };

  if (expectedSignature === razorpay_signature)
    response = { signatureIsValid: "true" };
  res.status(200).json(response);
};
