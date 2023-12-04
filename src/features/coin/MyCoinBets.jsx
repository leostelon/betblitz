import { Box, Button, Divider } from "@mui/material";
import { CoinImage } from "./CreateCoinGame";
import { toast } from "react-toastify";
import { cancleCoinPlay } from "../../api/coin";

export default function MyCoinBets({ playData }) {
	const onCancle = (id) => {
		const res = cancleCoinPlay(id);
		if (res.error) {
			toast("Somithing went wrong", { type: "error" });
		} else {
			toast("Play Cancled !", { type: "warning" });
		}
	};
	return (
		<Box
			sx={{
				bgcolor: "#efefef",
				p: 2,
				borderRadius: "10px",
				mt: 1,
			}}
		>
			<Box
				sx={{
					fontWeight: "bold",
					fontSize: "18px",
					mb: 1,
				}}
			>
				My Coin Bets
			</Box>

			<Box>
				{playData?.length > 0 &&
					playData.map((play) => (
						<Box>
							<Box
								key={play._id}
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									my: 1,
								}}
							>
								<Box>
									<Box sx={{ mb: 1 }}>
										My selection : {play.playerOneSelection || ""}
									</Box>
									<CoinImage
										selection={play.playerOneSelection}
										heigth="80px"
										width="80px"
									/>
									In play {play.amount} eth.
								</Box>
								{play.status === "WAITING" && (
									<Box>Wating for other player !</Box>
								)}
								{play.status === "WAITING" && (
									<Button
										variant="contained"
										color="warning"
										onClick={() => {
											onCancle(play._id);
										}}
									>
										Cancle Bet
									</Button>
								)}
							</Box>
							<Divider />
						</Box>
					))}
			</Box>
		</Box>
	);
}
