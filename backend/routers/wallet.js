const express = require('express');
const { createWallet } = require('../controller/wallets');
const router = express.Router();

router.post("/create-wallet", createWallet);



module.exports = router;