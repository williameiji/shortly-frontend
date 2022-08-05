import { useEffect, useContext } from "react";
import axios from "axios";

import BodyRanking from "./BodyRanking";
import url from "../services/urls";
import Home from "../home/Home";
import UserContext from "../context/UserContext";

export default function Ranking() {
	const { setRankingData, rankingData } = useContext(UserContext);

	useEffect(() => {
		axios
			.get(url.rank)
			.then((response) => {
				setRankingData(response.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);

	return (
		<Home>
			<BodyRanking rankingData={rankingData} />
		</Home>
	);
}
