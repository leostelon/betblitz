import { Box, Grid } from "@mui/material";
import React from "react";
import Football from "../assets/football.png";
import Chess from "../assets/chess.png";
import Baseball from "../assets/cricket.png";
import Crypto from "../assets/crypto.png";
import News from "../assets/news.png";
import Basketball from "../assets/basketball.png";
import Stocks from "../assets/stocks.png";
import Youtube from "../assets/youtube.png";
import { useNavigate } from "react-router-dom";

export const Categories = () => {
	const navigate = useNavigate();

	const actions = [
		{ title: "YouTube", image: Youtube, path: "bets/youtube" },
		{ title: "Crypto", image: Crypto, path: "bets/crypto" },
		{ title: "Baseball", image: Baseball, path: "bets/fileupload" },
		{ title: "BasketBall", image: Basketball, path: "bets/fileupload" },
		{ title: "News", image: News, path: "bets/datasetupload" },
		{ title: "Football", image: Football, path: "bets/football" },
		{ title: "Chess", image: Chess, path: "bets/chess" },
		{ title: "Stocks", image: Stocks, path: "bets/stocks" },
	];

	return (
		<Box sx={{ p: 2 }}>
			<h2>Categories 🛒</h2>
			<br />
			<br />
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{actions.map((i, ind) => (
					<Grid item xs={12} sm={4} md={2} key={ind}>
						<Box
							key={ind}
							sx={{
								borderRadius: "12px",
								p: 3,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "space-between",
								height: "150px",
								mx: 1,
								ml: ind === 0 ? 0 : 1,
								cursor: "pointer",
								border: `3px solid transparent`,
								backgroundColor: "#e9e9e95d",
								"&:hover": {
									backgroundColor: "#e9e9e99d",
									border: `3px solid #4954FD`,
								},
							}}
							onClick={() => navigate(i.path)}
						>
							<Box
								sx={{
									flex: 2,
									backgroundImage: `url("${i.image}")`,
									backgroundPosition: "center",
									backgroundSize: "contain",
									backgroundRepeat: "no-repeat",
									height: "50px",
								}}
							></Box>
							<Box
								sx={{
									display: "flex",
									alignItems: "flex-end",
									justifyContent: "center",
									textAlign: "center",
									flex: 1,
									fontSize: "12px",
									fontWeight: "600",
								}}
							>
								<p>{i.title}</p>
							</Box>
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};
