import { useEffect, useState, useContext } from "react";
import axios from "axios";

import BodyRanking from "./BodyRanking";
import url from "../services/urls";
import Home from "../home/Home";
import UserContext from "../context/UserContext";

export default function Ranking() {
	const [rankingData, setRankingData] = useState([]);
	const { userInformation } = useContext(UserContext);

	useEffect(() => {
		axios
			.get(url.rank)
			.then((response) => {
				setRankingData(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			{userInformation ? (
				<Home>
					<BodyRanking rankingData={rankingData} />
				</Home>
			) : (
				<>
					<BodyRanking rankingData={rankingData} />
				</>
			)}
		</>
	);
}
