import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalResetStyle from "../assets/css/GlobalResetStyle.css";
import GlobalStyle from "../assets/css/GlobalStyle";
import UserContext from "./context/UserContext";
import Home from "./home/Home";

export default function App() {
	return (
		<>
			<GlobalResetStyle />
			<GlobalStyle />
			<BrowserRouter>
				<UserContext.Provider value={{}}>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</UserContext.Provider>
			</BrowserRouter>
		</>
	);
}
