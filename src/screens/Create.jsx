import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { createQuestion, uploadNodejsScript } from "../api/questions";
import PostEditor from "../components/Editor";
import { toast } from "react-toastify";
import { getWalletAddress, switchChain } from "../utils/wallet";
import BetBlitz from "../contracts/BetBlitz.json";
import { CHAIN } from "../constant";
import Web3 from "web3";

export default function Create() {
	const [loading, setLoading] = useState(false);
	const [code, setCode] = useState(`function addNumbers(a, b) {return a + b;}
    var num1 = 5;
    var num2 = 10;
    var result = addNumbers(num1, num2);
    console.log("The sum of ", num1, " and ", num2, " is: ", result);`);
	const [formData, setFormData] = useState({
		question: "test",
		yesAnswer: "11",
		noAnswer: "00",
		expireAt: "",
	});

	async function uploadCode() {
		setLoading(true);
		const res = await uploadNodejsScript(code);
		if (res.error) {
			toast("Script upload failed", { type: "error" });
			return false;
		}
		const path = res?.data?.filename || "";
		return path;
	}

	async function cQ(qid, amount) {
		await switchChain();
		setLoading(true);
		const web3 = new Web3(window.ethereum);

		const contract = new web3.eth.Contract(
			BetBlitz.abi,
			CHAIN.contract_address
		);

		const currentAddress = await getWalletAddress();
		const betAmount = Web3.utils.toWei(amount);

		// Gas Calculation
		const gasPrice = await web3.eth.getGasPrice();
		const gas = await contract.methods
			.createQuestion(qid, betAmount)
			.estimateGas({
				from: currentAddress,
			});

		await contract.methods
			.createQuestion(qid, betAmount)
			.send({ from: currentAddress, gasPrice, gas })
			.on("receipt", async function (receipt) {
				setLoading(false);
				alert("Succesfully voted🥳🍾");
				window.location.reload();
			});
		setLoading(false);
	}

	const onFormSubmit = async () => {
		const path = await uploadCode();
		if (path) {
			const qid = Math.floor(100000 + Math.random() * 900000);
			const res = await createQuestion({ ...formData, path: `${path}`, qid });
			await cQ();
			if (res) {
				setFormData({
					question: "",
					yesAnswer: "",
					noAnswer: "",
					expireAt: "",
				});
				toast("Posted Successfully", { type: "success" });
			}
		}
		setLoading(false);
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
					/>
					<Box
						sx={{
							display: "flex",
							my: 2,
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
							size="small"
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
							size="small"
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

					<Box>JS file editor</Box>
					<PostEditor code={code} setCode={setCode} />

					<Box
						sx={{
							display: "flex",
							justifyContent: "right",
							mt: 2,
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
							{loading ? (
								<CircularProgress
									size={"10px"}
									sx={{ backgroundColor: "white" }}
								/>
							) : (
								"Go Live"
							)}
						</Button>
					</Box>
				</FormControl>
			</LocalizationProvider>
		</Box>
	);
}
