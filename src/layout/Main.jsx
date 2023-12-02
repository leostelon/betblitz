import { Outlet } from "react-router-dom";
import { LeftDrawer } from "../components/LeftDrawer";
import { Box } from "@mui/material";
import { Navbar } from "../components/Navbar";

export const MainLayout = ({ children }) => {

	return (
		
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<LeftDrawer />
					<Box style={{ width: `calc(100vw - 280px)` }}>
						<Navbar />
						<Box
							sx={{
								p: 2,
								color: "#4c4848",
							}}
						>
							<Outlet />
						</Box>
					</Box>
				</Box>
	);
};
