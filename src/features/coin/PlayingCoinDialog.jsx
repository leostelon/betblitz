import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { CoinImage } from "./CreateCoinGame";
import { Box, Divider } from "@mui/material";
import { cancleCoinPlay } from "../../api/coin";
import { toast } from "react-toastify";

import headsImage from "../../assets/head.png";
import tailsImage from "../../assets/tail.png";
import { FlippingCoin } from "./FlippingCoin";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function PlayingCoinDialog({
	open,
	setOpen,
	isFlipping,
	result,
}) {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			aria-describedby="alert-dialog-slide-description"
			onClose={handleClose}
		>
			<DialogTitle>Tossing Coin</DialogTitle>
			<DialogContent>
				{isFlipping && <FlippingCoin />}
				{!isFlipping && (
					<Box
						sx={{
							height: "100px",
							width: "100px",
						}}
					>
						<img
							src={result === "HEADS" ? headsImage : tailsImage}
							alt={result}
							height="100%"
							width="100%"
						/>
					</Box>
				)}
			</DialogContent>
			<DialogActions></DialogActions>
		</Dialog>
	);
}
