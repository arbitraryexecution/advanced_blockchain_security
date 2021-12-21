require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    networks: {
      hardhat: {
        forking: {
          url: process.env.ALCHEMYURL,
          blockNumber: 9504627,
        },
      },
    },
    compilers: [
      {
        version: "0.4.18",
      },
      {
        version: "0.4.25",
      },
    ],
  },
};
