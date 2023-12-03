import { Box, Button, FormControl, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { createQuestion } from "../api/questions";

export default function Create() {
	const [formData, setFormData] = useState({
		question: "test",
		yesAnswer: "11",
		noAnswer: "00",
		api: "/api",
		expireAt: "",
	});

	const onFormSubmit = async () => {
		console.log("calling api");
		const res = await createQuestion({ ...formData, qid: 1 });
		if (res) {
			setFormData({
				question: "",
				yesAnswer: "",
				noAnswer: "",
				api: "",
				expireAt: "",
			});
		}
	};

	return (
		<Box
			sx={{
				bgcolor: "#f0f0f0",
				p: 2,
				borderRadius: "10px",
			}}
		>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<FormControl fullWidth>
					<TextField
						variant="standard"
						label="Question ?"
						value={formData?.question || ""}
						onChange={(e) => {
							setFormData((d) => ({
								...d,
								question: e.target.value,
							}));
						}}
						sx={{
							mb: 1,
						}}
					/>
					<TextField
						variant="standard"
						label="API "
						value={formData?.api || ""}
						onChange={(e) => {
							setFormData((d) => ({
								...d,
								api: e.target.value,
							}));
						}}
						sx={{
							mb: 1,
						}}
					/>
					<Box
						sx={{
							display: "flex",
							mb: 2,
						}}
					>
						<TextField
							variant="standard"
							label="YES value"
							value={formData?.yesAnswer || ""}
							onChange={(e) => {
								setFormData((d) => ({
									...d,
									yesAnswer: e.target.value,
								}));
							}}
							sx={{ width: "50%", pr: 2 }}
						/>
						<TextField
							variant="standard"
							label="NO value"
							value={formData?.noAnswer || ""}
							onChange={(e) => {
								setFormData((d) => ({
									...d,
									noAnswer: e.target.value,
								}));
							}}
							sx={{ width: "50%" }}
						/>
					</Box>

					<DateTimePicker
						value={formData?.expireAt || ""}
						onChange={(value) => {
							setFormData((d) => ({
								...d,
								expireAt: value,
							}));
						}}
						variant="standard"
						label="Expire"
						sx={{ mb: 2 }}
					/>

					<Box
						sx={{
							display: "flex",
							justifyContent: "right",
						}}
					>
						<Button
							variant="contained"
							color="error"
							sx={{
								borderRadius: "4px",
							}}
							onClick={onFormSubmit}
						>
							Go Live
						</Button>
					</Box>
				</FormControl>
			</LocalizationProvider>
		</Box>
	);
}
