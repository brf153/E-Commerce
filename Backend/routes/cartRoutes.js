const express = require("express")
const { newCartOrder, getAllCartOrders, deleteCart } = require("../controllers/cartController")
const { isAuthenticatedUser } = require("../middleware/auth")
const router = express.Router()

router.route("/addcart").post(isAuthenticatedUser, newCartOrder)

router.route("/getcart").get(isAuthenticatedUser, getAllCartOrders)

router.route("/deleteitem").delete(isAuthenticatedUser, deleteCart)

module.exports = router