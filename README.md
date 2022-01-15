# Evmos Testnet Testing
## How to use:

### Setting up
* git clone https://github.com/ericet/EvmosTestnet.git
* cd EvmosTestnet
* npm install
* mv .env.example .env
* Go to https://faucet.evmos.org/ to get some PHOTON test tokens(0.01 PHOTON)
* Put your private key(keys) into PRIVATE_KEY field. Eg: PRIVATE_KEY=000000000

## Minting all 4 Evmosians NFTs
* `node EvmosiansNFT.js`

Notes: 
* Keys are saved to keys.txt with the following format: WALLET_ADDRESS:PRIVATE_KEY:MINT_TRANSACTION_ID

If you find this script is useful to you, donation will be appreciated: **0x434DCffCF7dABd48B284860C27ebd184C91341F5**

---
## 设置
* git clone https://github.com/ericet/EvmosTestnet.git
* cd EvmosTestnet
* npm install
* 文件改名
  * mv .env.example .env
* 到https://faucet.evmos.org/获取测试币
* 把有测试币的钱包私钥放在.env 文件里面的PRIVATE_KEY后面。比如：PRIVATE_KEY=000000000

## 运行铸造4个NFT
`node EvmosiansNFT.js`

备注: 运行程序后，会自动生成一个新的钱包，并从你的钱包里发送0.00001 PHOTON到新钱包用于铸造NFT。铸造后，会按以下格式保存私钥: 
`钱包地址:钱包私钥:铸造的交易ID`

如果你觉得脚本帮助到你，可以捐献一点心意。钱包地址：**0x434DCffCF7dABd48B284860C27ebd184C91341F5**, 各链通用. 谢谢！
