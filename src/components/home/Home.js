import styled from "styled-components";

import TopBar from "../topBar/TopBar";
import logo from "../../assets/images/logo-shortly.png";
import Ranking from "../ranking/Ranking";

export default function Home(props) {
	return (
		<>
			<TopBar />
			<Box>
				<Image src={logo} alt="logo" />
				{props.children ? props.children : <Ranking />}
			</Box>
			<Bottom>Crie sua conta para usar nosso serviço!</Bottom>
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
