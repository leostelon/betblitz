import { useState } from "react";
import { getWalletAddress } from "../utils/wallet";
import { getUser, createUser, getUserWithAddress } from "../api/user";

export default function UseWallet() {
	const [connectedToSite, setConnectedToSite] = useState(false);

	async function signUser() {
		const address = await getWalletAddress();

		if (address && address !== "") {
			let token = localStorage.getItem("token");

			localStorage.setItem("address", address);
			if (!token || token === "" || token === "undefined") {
				await createUser(address);
			}
			token = localStorage.getItem("token");
			if (token && token !== "" && token !== "undefined") {
				setConnectedToSite(true);
				return true;
			}
		}
		return false;
	}

	async function handleGetUser() {
		try {
			const token = localStorage.getItem("token");
			const address = await getWalletAddress();

			if (token && token !== "" && token !== "undefined") {
				const user = await getUser();
				if (user) {
					setConnectedToSite(true);
				} else {
					localStorage.clear();
					await signUser();
				}
			} else {
				await getUserWithAddress(address);
				await signUser();
			}
		} catch (error) {
			console.log(error);
		}
	}

	return {
		connectedToSite,
		handleGetUser,
	};
}
