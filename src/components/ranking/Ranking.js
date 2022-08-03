import styled from "styled-components";

import trophy from "../../assets/images/trophy.png";

export default function Ranking() {
	return (
		<>
			<Box>
				<Title>
					<img src={trophy} alt="trophy" /> Ranking
				</Title>
				<Container>
					testeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
					testeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
					testeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
					testeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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
	align-items: center;
	justify-content: center;
	width: 70vw;
	background: #ffffff;
	border: 1px solid rgba(120, 177, 89, 0.25);
	box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
	border-radius: 24px 24px 0px 0px;
	padding: 10px;
	margin: 55px 0 0 0;
	overflow: hidden;
	height: 200px;
`;
