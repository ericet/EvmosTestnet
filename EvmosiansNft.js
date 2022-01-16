const ethers = require('ethers')
require("dotenv").config();
const provider = new ethers.providers.JsonRpcProvider(`https://evmos-evm-rpc.tk/`);
const abi = require('./ABI/Evmosian.json')
const fs = require('fs');

start();

async function start() {
    for (let i = 0; i <= 1000; i++) {
        const account = ethers.Wallet.createRandom();
        let faucetWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        let wallet = new ethers.Wallet(account.address, provider);
        console.log("ADDRESS: " + wallet.address);
        console.log("PRIVATE KEY: " + wallet.privateKey);
        await transferToMint(wallet, faucetWallet)
        // console.log("Minting Evmosian NFT");
        // await mintEvmosiansNFT(wallet, '0x7ed7D20698931c98Ecc8F4Fe95eE7CEBe35b6548');
        console.log("Minting Validator NFT");
        await mintEvmosiansNFT(wallet, '0xF12Aa72B237C1B936f5917BF0f90c1D8b7D29a1D');
        console.log("Minting Builder NFT");
        await mintEvmosiansNFT(wallet, '0x53a6ab26100898915e500661c603082c065d1e77');
        console.log("Minting Educator NFT");
        await mintEvmosiansNFT(wallet, '0xaD4c0fF6A3D20a9d420D8DBeF1b5F8E9f907a663');
    }
}

function writeOutput(data) {
    fs.appendFile('keys.txt', data, function (err) {
        if (err) throw err;
    });
}



async function transferToMint(wallet, faucetWallet) {
    return new Promise(async (resolve, reject) => {
        console.log('Transferring PHOTON to ' + wallet.address);
        let tx = {
            to: wallet.address,
            value: ethers.utils.parseEther(process.env.TRANSFER_AMOUNT)
        }
        faucetWallet.sendTransaction(tx).then(async (txObj) => {
            await txObj.wait();
            console.log("PHOTON sent!");
            resolve(true)
        }).catch(err => {
            console.log(err)
            reject(err);
        });
    });
}

async function mintEvmosiansNFT(wallet, contract) {
    return new Promise(async (resolve, reject) => {
        const evmosiansManifested = new ethers.Contract(contract, abi, provider);
        let evmosiansManifestedConnected = evmosiansManifested.connect(wallet);
        let nonce = await provider.getTransactionCount(wallet.address);
        let gasPrice = (await provider.getGasPrice());
        evmosiansManifestedConnected.mint({
            gasLimit: 200000,
            gasPrice: gasPrice,
            nonce
        }).then(async (result) => {
            let res = await result.wait();
            console.log("NFT Minted!");
            writeOutput(`${wallet.address}:${wallet.privateKey}:${res.transactionHash}\n`);
            resolve(true);
        }).catch(err => {
            console.log(err)
            reject(err);
        });
    });
}