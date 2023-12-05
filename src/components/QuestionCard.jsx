import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { getWalletAddress, switchChain } from "../utils/wallet";
import Web3 from "web3";
import BetBlitz from "../contracts/BetBlitz.json";
import { CHAIN } from "../constant";
import { voteQuestion } from "../api/questions";
import Youtube from "../assets/youtube.png";
import { closeQuestion } from "../api/questions";

export const QuestionCard = ({ question }) => {
	const [loading, setLoading] = useState(false);
	const [yesLoading, setYesLoading] = useState(false);
	const [closeLoading, setCloseLoading] = useState(false);

	async function vote(finalAnswer) {
		await switchChain();
		setLoading(true);
		setYesLoading(true);
		const web3 = new Web3(window.ethereum);

		const contract = new web3.eth.Contract(
			BetBlitz.abi,
			CHAIN.contract_address
		);

		const currentAddress = await getWalletAddress();
		// Get value for question
		const value = await contract.methods.questionPrice(question.qid).call();

		// Gas Calculation
		const gasPrice = await web3.eth.getGasPrice();
		const gas = await contract.methods
			.createVote(question.qid, finalAnswer)
			.estimateGas({
				from: currentAddress,
				value,
			});

		await contract.methods
			.createVote(question.qid, finalAnswer)
			.send({ from: currentAddress, gasPrice, gas, value })
			.on("receipt", async function (receipt) {
				await voteQuestion(question._id, finalAnswer);

				setLoading(false);
				setYesLoading(true);
				alert("Succesfully voted🥳🍾");
				window.location.reload();
			});
		setLoading(false);
		setYesLoading(true);
	}

	async function cQ() {
		await switchChain();
		setCloseLoading(true);
		const web3 = new Web3(window.ethereum);

		const contract = new web3.eth.Contract(
			BetBlitz.abi,
			CHAIN.contract_address
		);

		const currentAddress = await getWalletAddress();
		const res = await closeQuestion("656d7d7528528e3e54d7e3d3", true);
		console.log(res);

		// Gas Calculation
		const gasPrice = await web3.eth.getGasPrice();
		const gas = await contract.methods
			.closeQuestion(question.qid, res.finalAnswer)
			.estimateGas({
				from: currentAddress,
			});

		await contract.methods
			.closeQuestion(question.qid, res.finalAnswer)
			.send({ from: currentAddress, gasPrice, gas })
			.on("receipt", async function (receipt) {
				setCloseLoading(false);
				alert("Succesfully voted🥳🍾");
				window.location.reload();
			});
		setCloseLoading(false);
	}

	return (
		<Box
			sx={{
				color: "black",
				boxShadow: "0 1px 6px rgba(0,0,0,.1)",
				p: 1.5,
			}}
		>
			<Box display={"flex"}>
				<p style={{ flex: 1 }}>{question.question}</p>
				<Box
					sx={{
						backgroundImage: `url("${Youtube}")`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundPosition: "center",
						height: "50px",
						width: "50px",
						mb: 2,
						borderRadius: "32px",
					}}
				></Box>
			</Box>
			<Box display={"flex"}>
				<Box
					sx={{
						flex: 1,
						p: 1.5,
						textAlign: "center",
						borderRadius: "8px",
						cursor: "pointer",
						mr: 1,
						backgroundColor: "#E8F2FF",
						color: "#197BFF",
					}}
					onClick={() => vote(true)}
				>
					{loading && yesLoading ? <CircularProgress size={"10px"} /> : "Yes"}
				</Box>
				<Box
					sx={{
						flex: 1,
						p: 1.5,
						textAlign: "center",
						borderRadius: "8px",
						cursor: "pointer",
						backgroundColor: "#FDF3F2",
						color: "#DC2804",
					}}
					onClick={() => vote(false)}
				>
					{loading && !yesLoading ? <CircularProgress size={"10px"} /> : "No"}
				</Box>
			</Box>
			{question.votes.length > 0 ? (
				<Box
					sx={{
						textAlign: "center",
						py: 1,
						backgroundColor: "#dedede6e",
						mt: 1,
						borderRadius: "4px",
					}}
				>
					You have already voted{" "}
					<span style={{ fontWeight: "bold" }}>
						{question.votes["finalAnswer"] ? "YES" : "NO"}
					</span>{" "}
					to this🥳
				</Box>
			) : (
				""
			)}

			{window.location.pathname === "/close" ? (
				<Box
					sx={{
						cursor: question.finalAnswer !== undefined ? "" : "Pointer",
						p: 1,
						mt: 1,
						textAlign: "center",
						backgroundColor: "#ff5858ec",
						"&:hover": {
							backgroundColor: "#ff5858",
						},
					}}
					onClick={() => {
						if (question.finalAnswer !== undefined) return;
						cQ();
					}}
				>
					{question.finalAnswer === undefined ? (
						closeLoading ? (
							<CircularProgress
								size={"10px"}
								sx={{
									color: "white",
								}}
							/>
						) : (
							"Close question"
						)
					) : (
						"Question has been Closed🥳"
					)}
				</Box>
			) : (
				""
			)}
		</Box>
	);
};
