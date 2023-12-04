import { Box } from "@mui/material";
import { FlippingCoin } from "./FlippingCoin";
import { useState } from "react";

import headsImage from "../../assets/head.png";
import tailsImage from "../../assets/tail.png";

export const CoinFlipper = () => {
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
