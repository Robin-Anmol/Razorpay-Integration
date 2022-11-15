const express = require("express");
const PaymentController = require("./controllers/PaymentController");
const router = express.Router();

router.route("/checkout").post(PaymentController.checkout);
router
  .route("/paymentVerification")
  .post(PaymentController.paymentVerification);

module.exports = router;
