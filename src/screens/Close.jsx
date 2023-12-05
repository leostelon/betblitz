import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getQuestions } from "../api/questions";
import { QuestionCard } from "../components/QuestionCard";

export const Close = () => {
	const [data, setData] = useState([]);

	const getQuestionsData = async () => {
		const res = await getQuestions();
		if (res?.length > 0) setData(res);
	};

	useEffect(() => {
		getQuestionsData();
		console.log(window.location.pathname);
	}, []);

	return (
		<Box sx={{ p: 2 }}>
			<h2>Close Bets ❌</h2>
			<br />
			<br />
			{data.map((d, i) => {
				return (
					<Box width={"500px"}>
						<QuestionCard question={d} key={i} />
					</Box>
				);
			})}
		</Box>
	);
};
