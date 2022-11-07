import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    ganache: {
      // rpc url, change it according to your ganache configuration
      url: 'http://localhost:8545',
      // the private key of signers, change it according to your ganache user
      accounts: [
        '69139de552d058455ad0128bb6319fb5cad2f6e8ec91429460d99e69c4978c3a',
        'd301b8d78299fbfbdd8acd7549517d1d2bd92324b9eb17c19470dbdaf1811f29',
        '60f7ba0dadad1b3d36bd26bbb70408cae8f204e2d9307bf3446b2d0864c0fd47',
        '9889eaf0808df824f49eaa524b5d9a054e9dd96cf3b3106150d6f1faf1550278',
      ]
    },
  },
};

export default config;
