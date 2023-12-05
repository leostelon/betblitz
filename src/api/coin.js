import { default as axios } from "axios";
import { SERVER_URL } from "../constant";

export const getCoinPlay = async function () {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.get(SERVER_URL + "/coin", {
			headers: {
				"Content-Type": `application/json`,
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
		return;
	} catch (error) {
		console.log(error.message);
		return;
	}
};
export const getAvailablePlays = async function () {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.get(SERVER_URL + "/coin/availablePlays", {
			headers: {
				"Content-Type": `application/json`,
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
		return;
	} catch (error) {
		console.log(error.message);
		return;
	}
};

export const createCoinPlay = async function (data) {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.post(SERVER_URL + "/coin", data, {
			headers: {
				"Content-Type": `application/json`,
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			return {
				data: response.data,
				error: false,
			};
		}
	} catch (error) {
		console.log(error.message);
		return { error: true };
	}
};
export const cancleCoinPlay = async function (id) {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.post(
			SERVER_URL + `/coin/cancleCoinPlay/${id}`,
			{},
			{
				headers: {
					"Content-Type": `application/json`,
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			return {
				data: response.data,
				error: false,
			};
		}
	} catch (error) {
		console.log(error.message);
		return { error: true };
	}
};

export const joinCoinPlay  = async function (id) {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.patch(
			SERVER_URL + `/coin/joinCoinPlay/${id}`,
			{},
			{
				headers: {
					"Content-Type": `application/json`,
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			return {
				data: response.data,
				error: false,
			};
		}
	} catch (error) {
		console.log(error.message);
		return { error: true };
	}
};