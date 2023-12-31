import { useEffect, useState } from "react";
import { CreateCoinGame } from "./CreateCoinGame";
import { CoinFlipper } from "./CoinFlipper";
import PlayingCoinDialog from "./PlayingCoinDialog";
import { getCoinPlay } from "../../api/coin";
import MyCoinBets from "./MyCoinBets";
import { Button, ButtonGroup } from "@mui/material";
import AvailableCoinBets from "./AvailableCoinBets";

export default function Coin() {
	const [loadingData, setLoadingData] = useState(true);

	const [playData, setPlayingData] = useState([]);
	const [option, setOption] = useState(1);

	const getCoinData = async () => {
		const data = await getCoinPlay();
		if (data) {
			console.log(data);
			setPlayingData(data);
		} else {
		}
		setLoadingData(false);
	};

	useEffect(() => {
		getCoinData();
	}, []);

	return (
		<div>
			{!loadingData && (
				<>
					<CreateCoinGame getCoinData={getCoinData} />
					<BetOptions option={option} setOption={setOption} />
					{option === 0 && <AvailableCoinBets playData={playData} />}
					{option === 1 && <MyCoinBets playData={playData} />}
				</>
			)}
		</div>
	);
}

const BetOptions = ({ option, setOption }) => {
	const options = ["Available Bets", "My Bets"];
	return (
		<ButtonGroup color="warning" sx={{ mt: 2 }}>
			{options.map((name, i) => (
				<Button
					onClick={() => {
						setOption(i);
					}}
					variant={option === i ? "contained" : "outlined"}
					key={name}
				>
					{name}
				</Button>
			))}
		</ButtonGroup>
	);
};
