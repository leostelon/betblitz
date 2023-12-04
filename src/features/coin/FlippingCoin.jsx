import { Box } from "@mui/material";

import headsImage from "../../assets/head.png";
import tailsImage from "../../assets/tail.png";

import "../../styles/coin.css"; // Import the CSS file for styling

export const FlippingCoin = () => (
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
