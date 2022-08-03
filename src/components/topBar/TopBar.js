import styled from "styled-components";

export default function TopBar() {
	return (
		<Box>
			<div>Entrar</div>
			<div>Cadastrar-se</div>
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
