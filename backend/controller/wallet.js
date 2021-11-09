const Wallet = require("../models/wallet");
const { createETHAddress } = require("../utils/WelletFunction");

async function createWallet(req, res) {
  try {
    const Wallets = require("../models/wallets");
    const { user_id, symbol } = req.body;
    console.log(user_id, symbol);
    if (user_id) {
      if (symbol) {
        const user_wallet = await Wallets.findOne({ user: user_id, wallet_type: new RegExp("^" + symbol + "$", "i") });
        if (user_wallet && user_wallet.address) {
          return res.json({
              status: 200,
              error: false,
              wallet_address: user_wallet.address,
              message: "Success!"
          })
      }
        const eth_address = await createETHAddress();
        if (eth_address && eth_address.address) {
          const currency_data = {};
          currency_data.user_id = user_id;
          currency_data.wallet_type = eth_address.symbol;
          // currency_data.name = eth_address.type;
          currency_data.private_key = eth_address.privateKey;
          currency_data.wallet_address = eth_address.address;
          currency_data.date = Date.now();
          currency_data.wallet_status = 1;

          // store in db
          if (user_wallet) {
            await Wallets.create(currency_data);
          } else {
            await Wallets.updateOne(
              { user: user_id, wallet_type: symbol },
              {
                $set: {
                  private_key: eth_address.privateKey,
                  wallet_address: eth_address.address,
                },
              }
            );
          }
          return res.json({
            status: 200,
            error: false,
            message: "Success",
            data: {
              address: eth_address.address,
              symbol: eth_address.symbol,
            },
          });
        } else {
          return res.json({
            status: 400,
            error: true,
            message: "Something went wrong, please try again!",
            data: undefined,
          });
        }
      }
    }
  } catch {}
}

module.exports = {
  createWallet,
};
