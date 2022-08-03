import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import trophy from "../../assets/images/trophy.png";
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
					<Box>
						<Title>
							<img src={trophy} alt="trophy" /> Ranking
						</Title>
						<Container>
							{rankingData.length
								? rankingData.map((item, index) => (
										<Rank key={index}>
											{index + 1}. {item.name} - {item.linksCount} links -{" "}
											{item.visitCount} vizualizações.
										</Rank>
								  ))
								: null}
						</Container>
					</Box>
				</Home>
			) : (
				<>
					<Box>
						<Title>
							<img src={trophy} alt="trophy" /> Ranking
						</Title>
						<Container>
							{rankingData.length
								? rankingData.map((item, index) => (
										<Rank key={index}>
											{index + 1}. {item.name} - {item.linksCount} links -{" "}
											{item.visitCount} vizualizações.
										</Rank>
								  ))
								: null}
						</Container>
					</Box>
				</>
			)}
		</>
	);
}

const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.div`
	display: flex;
	align-items: center;
	font-size: 36px;
	font-weight: bold;
	margin-top: 20px;

	img {
		height: 50px;
		margin-right: 10px;
	}
`;

const Container = styled.div`
	display: flex;
	align-items: left;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	background: #ffffff;
	border: 1px solid rgba(120, 177, 89, 0.25);
	box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
	border-radius: 24px 24px 0px 0px;
	padding: 20px;
	margin: 55px 0 0 0;
	overflow: hidden;
`;

const Rank = styled.div`
	font-size: 22px;
	font-weight: 500;
	margin-bottom: 15px;

	:last-child {
		margin-bottom: 0;
	}
`;
