import { Box, Button, ButtonGroup, Input, InputAdornment } from "@mui/material";
import { useState } from "react";

import headsImage from "../../assets/head.png";
import tailsImage from "../../assets/tail.png";
import { createCoinPlay } from "../../api/coin";
import { toast } from "react-toastify";

export const CreateCoinGame = ({ getCoinData }) => {
	const [selection, setSelection] = useState("HEADS");
	const [amount, setAmount] = useState("");

	const onSubmit = async () => {
		const res = await createCoinPlay({
			playerOneSelection: selection,
			amount,
		});
		if (res.error) {
			toast("Somithing went wrong", { type: "error" });
		} else {
			getCoinData();
		}
	};

	return (
		<Box
			sx={{
				bgcolor: "#efefef",
				p: 2,
				borderRadius: "10px",
			}}
		>
			<Box
				sx={{
					fontWeight: "bold",
					fontSize: "18px",
					mb: 1,
				}}
			>
				Create Coin Bet
			</Box>

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Box>
					Choose Your Lucky side :
					<ButtonGroup sx={{ ml: 1 }}>
						<Button
							color="error"
							variant={selection === "HEADS" ? "contained" : "outlined"}
							onClick={() => {
								setSelection("HEADS");
							}}
						>
							Heads
						</Button>
						<Button
							color="warning"
							variant={selection === "TAILS" ? "contained" : "outlined"}
							onClick={() => {
								setSelection("TAILS");
							}}
						>
							Tails
						</Button>
					</ButtonGroup>
					<Box
						sx={{
							alignContent: "center",
							mt: 1,
						}}
					>
						Bet Amount :
						<Input
							variant="standard"
							value={amount || ""}
							onChange={(e) => {
								setAmount(e.target.value);
							}}
							size="small"
							sx={{
								ml: 0.2,
								maxWidth: "40%",
							}}
							endAdornment={<InputAdornment position="end">eth</InputAdornment>}
						/>
					</Box>
				</Box>
				<CoinImage selection={selection} />
			</Box>
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
					onClick={onSubmit}
				>
					Go Live
				</Button>
			</Box>
		</Box>
	);
};

export const CoinImage = ({ selection, heigth, width }) => {
	return (
		<Box
			sx={{
				height: heigth || "100px",
				width: width || "100px",
				ml: 4,
				mb: 1,
			}}
		>
			<img
				src={selection === "HEADS" ? headsImage : tailsImage}
				alt={selection}
				height="100%"
				width="100%"
			/>
		</Box>
	);
};
