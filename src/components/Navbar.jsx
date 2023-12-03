import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlinePersonOutline } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { connectWalletToSite, getWalletAddress } from "../utils/wallet";
import { Box, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import UseWallet from "../hooks/UseWallet";

export const Navbar = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { connectedToSite, handleGetUser } = UseWallet();

	async function connectSite() {
		let connected = await connectWalletToSite();
		if (connected) {
			await handleGetUser();
		}
	}

	useEffect(() => {
		connectSite();
	}, []);

	return (
		<Box
			sx={{
				p: 2,
				pt: 3,
				display: "flex",
				color: "#4c4848",
			}}
		>
			<Box flex={3}>
				<h1
					style={{
						fontFamily: "Bebas Neue",
					}}
				>
					Gamble forever❤️
				</h1>
				<br />
			</Box>
			<Box flex={1} p={1}>
				<Box>
					{!connectedToSite ? (
						<Box onClick={connectSite} className="upload-button">
							Connect Wallet
						</Box>
					) : (
						<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
							<Box className="profile-icon" onClick={handleClick}>
								<BsPerson size={30} />{" "}
							</Box>
							<Menu
								sx={{ top: "4px" }}
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									"aria-labelledby": "basic-button",
								}}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
							>
								<MenuItem
									onClick={() => {
										const address = localStorage.getItem("address");
										navigate("/profile/" + address);
										setAnchorEl(null);
									}}
								>
									<p
										style={{
											marginRight: "4px",
											fontSize: "14px",
										}}
									>
										Profile
									</p>
									<MdOutlinePersonOutline size={20} />
								</MenuItem>
								<MenuItem
									onClick={() => {
										localStorage.clear();
										window.location.replace("/");
										setAnchorEl(null);
									}}
								>
									<p
										style={{
											marginRight: "4px",
											fontSize: "14px",
										}}
									>
										Logout
									</p>
									<HiOutlineLogout size={20} />
								</MenuItem>
							</Menu>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};
