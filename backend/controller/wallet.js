const Wallet = require("../models/wallet");

function createWallet(req, res) {
  try {
    const Wallets = require("../models/wallets");
    const { user_id, symbol } = req.body;
    if (user_id && symbol) {
      return res.status(200).json({ message: "This wellet already created" });
    }

    const {
      private_key,
      wallet_address,
      wallet_type,
      balance,
      v_balanace,
      locked,
      wallet_status,
      contract_address,
      date,
      type
    } = req.body;
  } catch {}
}

module.exports = {
  createWallet,
};
