import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Home from "../home/Home";
import url from "../services/urls";

export default function SignupScreen() {
	const navigate = useNavigate();
	const [singupDataInput, setSingupDataInput] = useState({
		name: "",
		email: "",
		password: "",
		passwordRef: "",
	});

	function handleFormChange(e) {
		let data = { ...singupDataInput };
		data[e.target.name] = e.target.value;
		setSingupDataInput(data);
	}

	async function singup(e) {
		e.preventDefault();

		await axios
			.post(url.signup, singupDataInput)
			.then(() => {
				alert("Cadastro efetuado com sucesso!");
				navigate("/signin");
			})
			.catch((err) => {
				if (err.response.status === 409) {
					alert("Usuário já registrado!");
				} else {
					alert(err.response.data);
				}
			});
	}

	return (
		<Home>
			<Forms onSubmit={singup}>
				<input
					type="text"
					name="name"
					placeholder="Nome"
					onChange={(e) => handleFormChange(e)}
					value={singupDataInput.name}
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="E-mail"
					onChange={(e) => handleFormChange(e)}
					value={singupDataInput.email}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Senha"
					onChange={(e) => handleFormChange(e)}
					value={singupDataInput.password}
					required
				/>

				<input
					type="password"
					name="passwordRef"
					placeholder="Confirme a senha"
					onChange={(e) => handleFormChange(e)}
					value={singupDataInput.passwordRef}
					required
				/>
				<Button type="submit">Criar conta</Button>
			</Forms>
		</Home>
	);
}

const Forms = styled.form`
	display: flex;
	flex-direction: column;
	margin: 30px 0 0 0;
	width: 100%;

	input[type="email"],
	input[type="password"],
	input[type="text"],
	input[type="password"] {
		border: 1px solid rgba(120, 177, 89, 0.25);
		box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
		border-radius: 12px;
		width: 100%;
		height: 55px;
		margin-top: 25px;
		padding: 0 0 0 10px;

		::placeholder {
			font-size: 14px;
			color: #9c9c9c;
		}
	}
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 180px;
	height: 45px;
	margin: 25px auto 0 auto;
	background: #5d9040;
	border-radius: 12px;
	color: white;
	font-size: 20px;
	border: none;
`;
