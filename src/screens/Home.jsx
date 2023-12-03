import { getQuestions } from "../api/questions";
import "../styles/Home.css";
import "../styles/navbar.css";
import { Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";

export const Home = () => {
	const [data, setData] = useState([]);

	const getQuestionsData = async () => {
		const res = await getQuestions();
		if (res?.length > 0) setData(res);
	};

	useEffect(() => {
		getQuestionsData();
	}, []);

	return (
		<Box>
			{data?.length > 0 &&
				data.map((d) => {
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
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Unde ratione nemo sit explicabo? Harum quibusdam provident
										voluptas. Quod, cumque. Laborum veritatis laboriosam natus
										eum. Perspiciatis itaque odio quod dolorem distinctio?
									</p>
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
				})}
		</Box>
	);
};
