import { Avatar, Box } from "@mui/material";
import React, { useState } from "react";
import { getWalletAddress, switchChain } from "../utils/wallet";
import Web3 from "web3";
import BetBlitz from "../contracts/BetBlitz.json";
import { CHAIN } from "../constant";
import { voteQuestion } from "../api/questions";

export const QuestionCard = ({ question }) => {
	const [loading, setLoading] = useState(false);

	async function vote(finalAnswer) {
		await switchChain();
		setLoading(true);
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
				alert("Succesfully voted🥳🍾");
			});
		setLoading(false);
	}

	return (
		<Box
			sx={{
				color: "black",
				mb: 2,
				borderBottom: "0.5px dashed #c9c9c9",
				pb: 2,
			}}
		>
			<Box mb={1} display={"flex"} alignItems={"center"}>
				<Avatar sx={{ width: 32, height: 32 }} />
				<Box
					style={{
						fontSize: "12px",
						fontWeight: "500",
						color: "black",
					}}
					ml={1}
				>
					<p style={{ color: "black" }}>@leostelon</p>
					<small>4:53PM 12th Nov 2023</small>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box>
					<p style={{ marginTop: "4px" }}>Some title of the article.</p>
					<p
						style={{
							color: "grey",
							marginTop: "6px",
							textAlign: "justify",
						}}
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
						ratione nemo sit explicabo? Harum quibusdam provident voluptas.
						Quod, cumque. Laborum veritatis laboriosam natus eum. Perspiciatis
						itaque odio quod dolorem distinctio?
					</p>
					<Box onClick={() => vote(false)}>Vote</Box>
				</Box>
				<Box
					sx={{
						minWidth: "100px",
						height: "100px",
						borderRadius: "8px",
						ml: 2,
						backgroundImage: `url(${"https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Q9GGI2LPnPN-DF15FBeNiA.jpeg"})`,
						backgroundPosition: "center",
						backgroundSize: "cover",
					}}
				></Box>
			</Box>
		</Box>
	);
};
