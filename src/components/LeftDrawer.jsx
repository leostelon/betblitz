import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { EmbedSDK } from "@pushprotocol/uiembed";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	AiFillDatabase,
	AiFillHome,
	AiFillPlusCircle,
	AiOutlineDatabase,
	AiOutlineHome,
	AiOutlineLogout,
	AiOutlinePlusCircle,
} from "react-icons/ai";
import { MdNotifications, MdNotificationsActive } from "react-icons/md";

const drawerWidth = 260;

const mainList = [
	{
		text: "Home",
		i: () => <AiOutlineHome />,
		ai: () => <AiFillHome />,
		path: "/",
	},
	{
		text: "Notifications",
		i: () => <MdNotifications />,
		ai: () => <MdNotificationsActive />,
		path: "/notifications",
	},
	{
		text: "Your Posts",
		i: () => <AiOutlineDatabase />,
		ai: () => <AiFillDatabase />,
		path: "/posts",
	},
	{
		text: "Create Post",
		i: () => <AiOutlinePlusCircle />,
		ai: () => <AiFillPlusCircle />,
		path: "/create",
	},
];

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	borderRight: "none !important",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const open = true;

export function LeftDrawer({ smaller }) {
	const location = useLocation();
	const navigate = useNavigate();
	const [index, setIndex] = useState(0);
	const username = localStorage.getItem("address");
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	function updateIndex(path) {
		switch (path.split("/")[1]) {
			case "home":
				return setIndex(0);
			case "notifications":
				return;
			case "posts":
				return setIndex(2);
			case "create":
				return setIndex(3);
			default:
				setIndex(0);
		}
	}

	useEffect(() => {
		updateIndex(location.pathname);
		if (username) {
			// 'your connected wallet address'
			EmbedSDK.init({
				headerText: "Notifications", // optional
				targetID: "sdk-trigger-id", // mandatory
				appName: "Forever", // mandatory
				user: username, // mandatory
				chainId: 1, // mandatory
				viewOptions: {
					type: "sidebar", // optional [default: 'sidebar', 'modal']
					showUnreadIndicator: true, // optional
					unreadIndicatorColor: "#cc1919",
					unreadIndicatorPosition: "bottom-right",
				},
				theme: "light",
				onOpen: () => {},
				onClose: () => {},
			});
		}

		return () => {
			EmbedSDK.cleanup();
		};
	}, [location.pathname]);

	return (
		<Drawer
			variant="permanent"
			open={smaller ? false : open}
			sx={{
				mt: 2,
				borderRight: "none",
			}}
		>
			<Box
				sx={{
					backgroundColor: "#16171B",
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "column",
					height: "100%",
					color: "white",
					p: 3,
				}}
			>
				<Box>
					{/* Logo */}
					<Box sx={{ mb: 6, display: "flex", alignItems: "center" }}>
						<h2 style={{ paddingTop: "8px" }}>Betblitz🎭</h2>
					</Box>

					{/* Menu List */}
					<Box>
						{mainList.map(({ text, i, ai, path }, ind) => (
							<Box
								key={text}
								onClick={() => {
									if (path === "/notifications") return handleClick();
									navigate(path);
								}}
								id={path === "/notifications" ? "sdk-trigger-id" : ""}
								sx={{
									backgroundColor: index === ind ? "#4954FD" : "",
									colors: "white",
									borderRadius: "8px",
									p: 1,
									py: 1.5,
									mb: 0.4,
									cursor: "pointer",
									"&:hover": {
										background: index === ind ? "" : "rgb(38 38 38 / 35%)",
									},
								}}
							>
								<Box
									sx={{
										justifyContent: open ? "initial" : "center",
										color: index === ind ? "white" : "#828488",
										alignItems: "center",
										display: "flex",
									}}
								>
									<Box
										sx={{
											mr: 2,
											fontSize: "20px",
											display: "flex",
										}}
									>
										{index === ind ? ai() : i()}
									</Box>
									<Box
										sx={{
											opacity: open ? 1 : 0,
										}}
									>
										{text}
									</Box>
								</Box>
							</Box>
						))}
					</Box>
				</Box>
				<Box
					sx={{
						bottom: "30px",
						backgroundColor: "#2c2d32",
						p: 2,
						borderRadius: "4px",
					}}
				>
					Made during <br /> Constellation✨
					<Box
						onClick={() => {
							localStorage.clear();
							window.location.replace("/");
							setAnchorEl(null);
						}}
						sx={{
							colors: "white",
							borderRadius: "8px",
							mt: 4,
							cursor: "pointer",
							"&:hover": {
								background: "rgb(38 38 38 / 35%)",
							},
						}}
					>
						<Box
							sx={{
								color: "#828488",
								alignItems: "center",
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Box
								sx={{
									opacity: open ? 1 : 0,
								}}
							>
								Logout
							</Box>

							<Box
								sx={{
									fontSize: "20px",
									display: "flex",
								}}
							>
								<AiOutlineLogout />
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Drawer>
	);
}
