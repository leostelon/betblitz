import { getQuestions } from "../api/questions";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { QuestionCard } from "../components/QuestionCard";

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
				data.map((d, i) => {
					return <QuestionCard question={d} key={i} />;
				})}
		</Box>
	);
};
