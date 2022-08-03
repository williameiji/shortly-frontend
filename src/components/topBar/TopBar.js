import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import UserContext from "../context/UserContext";

export default function TopBar() {
	const navigate = useNavigate();
	const { userInformation } = useContext(UserContext);

	function goToSignup() {
		navigate("/signup");
	}

	function goToSignin() {
		navigate("/signin");
	}

	function goToRanking() {
		navigate("/ranking");
	}

	function goToMain() {
		navigate("/main");
	}

	return (
		<>
			{userInformation ? (
				<>
					<Box>
						<div onClick={goToMain}>Home</div>
						<div onClick={goToRanking}>Ranking</div>
						<div onClick={goToSignup}>Sair</div>
					</Box>
					<HelloBox>Seja bem-vindo(a), {userInformation.name}</HelloBox>
				</>
			) : (
				<Box>
					<div onClick={goToSignin}>Entrar</div>
					<div onClick={goToSignup}>Cadastrar-se</div>
				</Box>
			)}
		</>
	);
}

const Box = styled.span`
	display: flex;
	justify-content: right;
	margin: 60px 60px 0 0;

	div {
		margin-left: 20px;
		font-size: 14px;
		color: #5d9040;
		font-weight: 400;
	}
`;

const HelloBox = styled.div`
	display: flex;
	justify-content: left;
	margin-left: 60px;
	color: #5d9040;

	div {
		font-size: 14px;
		color: #5d9040;
		font-weight: 400;
	}
`;
