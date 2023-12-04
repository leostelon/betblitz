import { default as axios } from "axios";
import { SERVER_URL } from "../constant";

export const createUser = async function (address) {
	console.log("reached create user api");
	try {
		const nonceResponse = await axios.post(
			`${SERVER_URL}/user/generateNonce`,
			{ address },
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
			}
		);
		const formattedNonceResponse = nonceResponse.data;
		const nonce = formattedNonceResponse.nonce;

		const sign = await window.ethereum.request({
			method: "personal_sign",
			params: [address, "Please approve this message \n \nNonce:\n" + nonce],
		});

		const response = await axios.post(
			SERVER_URL + "/user/signin",
			{ sign, nonce, displayName: address },
			{
				headers: {
					"Content-Type": `application/json`,
				},
			}
		);
		if (response.status === 200 || response.status === 201) {
			console.log(response.data);
			localStorage.setItem("token", response.data.token);

			return {
				ok: true,
				data: response.data,
			};
		}
	} catch (error) {
		console.log(error.message);
		return {
			ok: false,
			error,
		};
	}
};

export const getUserWithAddress = async function (address) {
	try {
		const response = await axios.get(SERVER_URL + "/user/" + address);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const getUser = async function () {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.get(SERVER_URL + "/user", {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
		if (response.status === 404) {
			localStorage.clear();
		}
	} catch (error) {
		console.log("user", error.message);
	}
};
