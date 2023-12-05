import "./App.css";
import "./styles/navbar.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import Create from "./screens/Create";
import { MainLayout } from "./layout/Main";
import Coin from "./screens/Coin";
import { Categories } from "./components/Categories";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" exact element={<Home />} />
					<Route path="/create" exact element={<Create />} />
					<Route path="/coin" exact element={<Coin />} />
					<Route path="/categories" exact element={<Categories />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
