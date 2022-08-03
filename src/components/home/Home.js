import styled from "styled-components";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TopBar from "../topBar/TopBar";
import logo from "../../assets/images/logo-shortly.png";
import UserContext from "../context/UserContext";
import BodyRanking from "../ranking/BodyRanking";
import url from "../services/urls";

export default function Home(props) {
	const navigate = useNavigate();

	const { setRankingData, rankingData } = useContext(UserContext);

	function goToSignup() {
		navigate("/signup");
	}

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
			<TopBar />
			<Box>
				<Image src={logo} alt="logo" />
				<Container>
					{props.children ? (
						props.children
					) : (
						<>
							<BodyRanking rankingData={rankingData} />
							<Bottom onClick={goToSignup}>
								Crie sua conta para usar nosso serviço!
							</Bottom>
						</>
					)}
				</Container>
			</Box>
		</>
	);
}

const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Image = styled.img`
	height: 125px;
`;

const Bottom = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 36px;
	font-weight: bold;
	margin-top: 70px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 70vw;
	height: 100%;
`;
