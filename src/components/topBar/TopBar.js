import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
	const navigate = useNavigate();

	function goToSignup() {
		navigate("/signup");
	}

	function goToSignin() {
		navigate("/signin");
	}

	return (
		<Box>
			<div onClick={goToSignin}>Entrar</div>
			<div onClick={goToSignup}>Cadastrar-se</div>
		</Box>
	);
}

const Box = styled.span`
	display: flex;
	justify-content: right;
	margin: 60px;

	div {
		margin-left: 20px;
		font-size: 14px;
		color: #5d9040;
		font-weight: 400;
	}
`;
