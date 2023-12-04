import { getQuestions } from "../api/questions";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "../components/QuestionCard";
import Football from "../assets/football.png";
import Chess from "../assets/chess.png";
import Baseball from "../assets/cricket.png";
import Crypto from "../assets/crypto.png";
import News from "../assets/news.png";
import Basketball from "../assets/basketball.png";
import Stocks from "../assets/stocks.png";
import Youtube from "../assets/youtube.png";
import Banner from "../assets/Group 2609059.png";

export const Home = () => {
	const [data, setData] = useState([]);
	const navigate = useNavigate();

	const actions = [
		{ title: "YouTube", image: Youtube, path: "bets/youtube" },
		{ title: "Crypto", image: Crypto, path: "bets/crypto" },
		{ title: "Baseball", image: Baseball, path: "bets/fileupload" },
		{ title: "BasketBall", image: Basketball, path: "bets/fileupload" },
		{ title: "News", image: News, path: "bets/datasetupload" },
	];

	const getQuestionsData = async () => {
		const res = await getQuestions();
		if (res?.length > 0) setData(res);
	};

	useEffect(() => {
		getQuestionsData();
	}, []);

	return (
		<Box sx={{ pt: 1, display: "flex" }}>
			<Box flex={3} pr={1}>
				<Box
					sx={{
						backgroundImage: `url("${Banner}")`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundPosition: "center",
						height: "30vh",
						width: "100%",
						mb: 2,
						borderRadius: "32px",
					}}
				></Box>
				<h2 style={{ color: "rgb(82, 82, 82)" }}>Bet on your decisions 🎲</h2>
				<Box display={"flex"} mt={1} mb={2}>
					{actions.map((i, ind) => {
						return (
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
										width: "50px",
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
										color: "black",
									}}
								>
									<p>{i.title}</p>
								</Box>
							</Box>
						);
					})}
				</Box>
				<h2 style={{ color: "rgb(82, 82, 82)" }}>Trust your guts ⚡</h2>
				<Box display={"flex"} mt={1} mb={2}>
					{actions.slice(0, 1).map((i, ind) => {
						return (
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
										width: "50px",
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
										color: "black",
									}}
								>
									<p>{i.title}</p>
								</Box>
							</Box>
						);
					})}
				</Box>
			</Box>
			<Box flex={1} p={1} borderLeft="1px solid #ededed">
				<Box
					sx={{
						p: "1",
						fontSize: "14px",
						fontWeight: "500",
					}}
				>
					<strong>Latest bets🆕</strong>
					{data.map((d, i) => {
						return <QuestionCard question={d} key={i} />;
					})}
				</Box>
			</Box>
		</Box>
	);
};
