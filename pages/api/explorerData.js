// DATA EXTRACTION FOR SEARCH BAR

// import statements
import { ethers } from "ethers";

// getting the provider from ethers and etherscan
var provider = ethers.providers.getDefaultProvider();
var etherscanProvider = new ethers.providers.EtherscanProvider();

// receiving userInput as req, fetching response and returning correct information
export default async function handler(req, res) {
  var isBlock;
  var isTransaction;
  var isPublicAddress;
  var isSmartContract;

  // taking request(string) and constructing the JavaScript object for it
  var userInput = JSON.parse(req.body).userInput;
  userInput = userInput.substring(1, userInput.length);
  console.log(userInput);

  // if POST request, find out what the user has inputted and send response back accordingly
  if (req.method === "POST") {
    // check if block, if so send response
    try {
      const block = await provider.getBlock(parseInt(userInput));
      isBlock = true;

      const response = {
        type: "block",
        block: block,
      };
      res.status(200).json(response);
    } catch (error) {
      isBlock = false;
    }

    // check if transaction, if so send response
    if (isBlock === false) {
      try {
        const tx = await provider.getTransaction(userInput);
        isTransaction = true;

        const response = {
          type: "tx",
          transaction: tx,
        };
        res.status(200).json(response);
      } catch (error) {
        isTransaction = false;
      }
    }

    // check if public address, if so send response
    if (isTransaction === false && isBlock === false) {
      const contractCode = await provider.getCode(userInput);

      if (contractCode === "0x") {
        // we now know it is a public address

        // extracting transaction history and balance of address
        const history = await etherscanProvider.getHistory(userInput);
        let balance = await provider.getBalance(userInput);

        balance = ethers.utils.formatEther(balance);

        const response = {
          type: "public address",
          balance: balance,
          history: history,
        };

        res.status(200).json(response);

        isPublicAddress = true;
      } else {
        isPublicAddress = false;
      }
    }

    // check if smart contract address, if so send response
    if (
      isTransaction === false &&
      isBlock === false &&
      isPublicAddress === false
    ) {
      try {
        const contractCode = await provider.getCode(userInput);
        const contractBalance = await provider.getBalance(userInput);

        const response = {
          type: "contract",
          contractCode: contractCode,
          contractBalance: contractBalance,
        };

        res.status(200).json(response);
        isSmartContract = true;
      } catch (error) {
        isSmartContract = false;
      }
    }
  }
}
