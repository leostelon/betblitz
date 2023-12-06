import Web3 from "web3";

import BetBlitzCoin from "../contracts/BetBlitzCoin.json";
import { getWalletAddress, switchChain } from "../utils/wallet";
import { createCoinPlay } from "../api/coin";
import { toast } from "react-toastify";

const contract_address = "0x924a8B3d16C3840566701F90539a56A96Fc1550E";
export default function UseCoinPlay() {
	const createGame = async (selection, amount) => {
		await switchChain();
		const web3 = new Web3(window.ethereum);

		const contract = new web3.eth.Contract(BetBlitzCoin.abi, contract_address);
		const currentAddress = await getWalletAddress();
		const gasPrice = await web3.eth.getGasPrice();
		const selectionInt = selection === "HEADS" ? 1 : 0;
		const amountInWei = web3.utils.toWei(amount);
		const gas = await contract.methods.createBet(selectionInt).estimateGas({
			from: currentAddress,
			value: amountInWei,
		});

		await contract.methods
			.createBet(selectionInt)
			.send({ from: currentAddress, value: amountInWei, gasPrice, gas })
			.on("receipt", async function (receipt) {
				console.log("create coin Bet receipt", receipt);
				const cid = await contract.methods.id().call();
				console.log("cid", cid);

				const res = await createCoinPlay({
					playerOneSelection: selection,
					amount,
					cid,
				});
				if (res.error) {
					toast("Something went wrong", { type: "error" });
					//
				} else {
					toast("Created Bet🥳🍾", { type: "success" });
				}
			});

		return;
	};

	const betGame = async (result, cid, amount) => {
		await switchChain();
		const web3 = new Web3(window.ethereum);

		const contract = new web3.eth.Contract(BetBlitzCoin.abi, contract_address);

		const resultInt = result === "HEADS" ? 1 : 0;

		const currentAddress = await getWalletAddress();
		const gasPrice = await web3.eth.getGasPrice();
		const amountInWei = web3.utils.toWei(amount.toString());
		const gas = await contract.methods.closeBet(resultInt, cid).estimateGas({
			from: currentAddress,
			value: amountInWei,
		});

		await contract.methods
			.closeBet(resultInt, cid)
			.send({ from: currentAddress, value: amountInWei, gasPrice, gas })
			.on("receipt", async function (receipt) {
				console.log("close coin Bet receipt", receipt);

				toast("Translation Completed", { type: "success" });
			});

		return;
	};

	return { createGame, betGame };
}
