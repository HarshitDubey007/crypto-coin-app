const { model } = require("mongoose");
const Wallets = require("../models/wallets");

async function createETHAddress() {
    const ethWallet = require('ethereumjs-wallet');
    console.log(ethWallet.default)
    const address = ethWallet.default.generate();
    if (address !== undefined) {
        console.log(address);
        return ({
            address: address.getAddressString(),
            privateKey: address.getPrivateKeyString(),
            type: "ethereum",
            symbol: 'ETH'
        })
    } else {
        return ({
            address: "",
            privateKey: "",
            type: "",
            symbol: ''
        })
    }
}










module.exports = {
    createETHAddress


}