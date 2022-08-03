import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import GlobalResetStyle from "../assets/css/GlobalResetStyle.css";
import GlobalStyle from "../assets/css/GlobalStyle";
import UserContext from "./context/UserContext";
import Home from "./home/Home";
import SignupScreen from "./signup/SignupScreen";
import LoginScreen from "./login/LoginScreen";
import Ranking from "./ranking/Ranking";
import Main from "./main/Main";

export default function App() {
	const [rankingData, setRankingData] = useState([]);
	const [userInformation, setUserInformation] = useState(null);
	return (
		<>
			<GlobalResetStyle />
			<GlobalStyle />
			<BrowserRouter>
				<UserContext.Provider
					value={{
						setUserInformation,
						userInformation,
						setRankingData,
						rankingData,
					}}
				>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signup" element={<SignupScreen />} />
						<Route path="/signin" element={<LoginScreen />} />
						<Route path="/ranking" element={<Ranking />} />
						<Route path="/main" element={<Main />} />
					</Routes>
				</UserContext.Provider>
			</BrowserRouter>
		</>
	);
}
