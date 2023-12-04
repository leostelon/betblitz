import React, { useState } from "react";
import "../styles/coin.css"; // Import the CSS file for styling

// Import your images
import headsImage from "../assets/head.png";
import tailsImage from "../assets/tail.png";
import { Box } from "@mui/material";

const CoinFlipper = () => {
	const [result, setResult] = useState("Head");
	const [isFlipping, setIsFlipping] = useState(false);

	const flipCoin = () => {
		setIsFlipping(true);
		setTimeout(() => {
			const randomResult = Math.random() < 0.5 ? "Head" : "Tail";
			setResult(randomResult);
			setIsFlipping(false);
		}, 2500);
	};

	console.log("isFlipping", isFlipping);

	return (
		<Box>
			{isFlipping && <FlippingCoin />}

			{!isFlipping && (
				<Box
					sx={{
						height: "100px",
						width: "100px",
					}}
				>
					<img
						src={result === "Head" ? headsImage : tailsImage}
						alt={result}
						height="100%"
						width="100%"
					/>
				</Box>
			)}

			<h1>Coin Flipper</h1>
			<button onClick={flipCoin} disabled={isFlipping}>
				Flip Coin
			</button>
		</Box>
	);
};

const FlippingCoin = () => (
	<Box
		className="coin"
		sx={{
			height: "100px",
			width: "100px",
		}}
	>
		<div className="side heads">
			<img src={headsImage} alt="Heads" height="100%" width="100%" />
		</div>
		<div className="side tails">
			<img src={tailsImage} alt="Tails" height="100%" width="100%" />
		</div>
	</Box>
);

export default CoinFlipper;
