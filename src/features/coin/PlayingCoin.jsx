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

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function PlayingCoinDialog({ open, setOpen, playData }) {
	const [waiting, setWaiting] = React.useState(true);
	const handleClose = () => {
		setOpen(false);
	};

	const onCancle = () => {
		// ! call cancle api
		if (playData?._id) {
			const res = cancleCoinPlay(playData?._id);

			if (res.error) {
				toast("Somithing went wrong", { type: "error" });
			} else {
				toast("Play Cancled !", { type: "warning" });
				handleClose();
			}
		}
	};

	React.useEffect(() => {
		console.log("playData", playData);
	}, [playData]);

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle>{waiting && "Wating for other player !"}</DialogTitle>
			<DialogContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Box>
						<Box sx={{ mb: 2 }}>
							My selection :{playData?.playerOneSelection || ""}
						</Box>
						<CoinImage selection={playData?.playerOneSelection} />
					</Box>

					<Box
						sx={{
							mx: 1,
						}}
					>
						<Divider orientation="vertical" />
					</Box>

					<Box>{waiting && "Wating for other player !"}</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancle}>Cancle</Button>
			</DialogActions>
		</Dialog>
	);
}
