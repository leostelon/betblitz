import { Box, Button, Divider } from "@mui/material";
import { CoinImage } from "./CreateCoinGame";
import { toast } from "react-toastify";
import {
	cancleCoinPlay,
	getAvailablePlays,
	joinCoinPlay,
} from "../../api/coin";
import { useEffect, useState } from "react";
import PlayingCoinDialog from "./PlayingCoinDialog";
import UseCoinPlay from "../../hooks/UseCoinPlay";

export default function AvailableCoinBets() {
	const [data, setData] = useState([]);
	const [openPlaying, setOpenPlaying] = useState(false);
	const [isFlipping, setIsFlipping] = useState(false);
	const [result, setResult] = useState("HEADS");

	const { betGame } = UseCoinPlay();

	const getData = async () => {
		const _data = await getAvailablePlays();
		if (_data) {
			setData(_data);
		}
	};

	const onBetClick = async (id) => {
		setOpenPlaying(true);
		setIsFlipping(true);

		// call api with _id;
		const res = await joinCoinPlay(id);
		if (res.error) {
			setIsFlipping(false);
			setOpenPlaying(false);
		} else {
			setResult(res.data.result);
			setIsFlipping(false);
		}

		setTimeout(async () => {
			// const randomResult = Math.random() < 0.5 ? "HEADS" : "TAILS";
			// setResult(randomResult);
			// setIsFlipping(false);
			const res = await joinCoinPlay(id);
			console.log("coin res", res);
			if (res.error) {
				setIsFlipping(false);
				setOpenPlaying(false);
				getData();
			} else {
				setResult(res.data.result);
				await betGame(res.data.result, res.data.cid, res.data.amount);
				setIsFlipping(false);
				getData();
			}
		}, 1000);
	};

	useEffect(() => {
		getData();
	}, []);
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
				Available Bets
			</Box>

			<Box>
				{data?.length > 0 &&
					data.map((play) => {
						const isUserBet =
							localStorage.getItem("address") === play.playerOne.address;

						const oppSelection = play.playerOneSelection === "H";

						return (
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
											selection : {play.playerOneSelection || ""}
										</Box>
										<CoinImage
											selection={play.playerOneSelection}
											heigth="80px"
											width="80px"
										/>
										In play {play.amount} eth.
									</Box>
									{play.status === "WAITING" && <Box>My Selection !</Box>}
									{play.status === "WAITING" && (
										<Button
											variant="contained"
											color="warning"
											onClick={() => {
												onBetClick(play._id);
											}}
											disabled={isUserBet}
										>
											BET it
										</Button>
									)}
								</Box>
								<Divider />
							</Box>
						);
					})}
			</Box>

			<PlayingCoinDialog
				open={openPlaying}
				setOpen={setOpenPlaying}
				isFlipping={isFlipping}
				result={result}
			/>
		</Box>
	);
}
