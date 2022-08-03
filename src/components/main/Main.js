import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";

import Home from "../home/Home";
import UserContext from "../context/UserContext";
import url from "../services/urls";
import trash from "../../assets/images/trashcan.png";

export default function Main() {
	const [linkDataInput, setLinkDataInput] = useState({
		link: "",
	});
	const [linksFromUser, setLinksFromUser] = useState(null);
	const [control, setControl] = useState(true);
	const { userInformation } = useContext(UserContext);

	let config = {
		headers: {
			Authorization: `Bearer ${userInformation.token}`,
		},
	};

	function handleFormChange(e) {
		let data = { ...linkDataInput };
		data[e.target.name] = e.target.value;
		setLinkDataInput(data);
	}

	if (control) {
		setControl(false);
		axios
			.get(url.links, config)
			.then((response) => {
				setLinksFromUser(response.data);
			})
			.catch((err) => {
				alert(err);
			});
	}

	function shortLink(e) {
		e.preventDefault();

		axios
			.post(url.short, linkDataInput, config)
			.then((response) => {
				setControl(true);
			})
			.catch((err) => {
				alert(err);
			});
	}

	function deleteLink(id) {
		axios
			.delete(`${url.links}/${id}`, config)
			.then((response) => {
				alert("Link deletado!");
				setControl(true);
			})
			.catch((err) => {
				alert(err);
			});
	}

	function openLink(shortUrl) {
		axios
			.get(`${url.open}/${shortUrl}`, config)
			.then((response) => {
				window.open(response.data.redirect);
				setControl(true);
			})
			.catch((err) => {
				alert(err);
			});
	}

	return (
		<Home>
			<Forms onSubmit={shortLink}>
				<input
					type="link"
					name="link"
					placeholder="Links que cabem no bolso"
					onChange={(e) => handleFormChange(e)}
					value={linkDataInput.link}
					required
				/>
				<Button type="submit">Encutar link</Button>
			</Forms>
			{linksFromUser
				? linksFromUser.map((item, index) => (
						<ContainerLinks key={index}>
							<Links>
								<div onClick={() => openLink(item.shortUrl)}>{item.url}</div>{" "}
								<div>{item.shortUrl}</div> <div>{item.counter}</div>
							</Links>
							<Delete onClick={() => deleteLink(item.id)}>
								<img src={trash} alt="trash" />
							</Delete>
						</ContainerLinks>
				  ))
				: null}
		</Home>
	);
}

const Forms = styled.form`
	display: flex;
	margin: 30px 0 0 0;
	width: 100%;

	input[type="link"] {
		border: 1px solid rgba(120, 177, 89, 0.25);
		box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
		border-radius: 12px;
		width: 100%;
		height: 60px;
		margin: 25px 70px 0 0;
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
	height: 60px;
	margin: 25px auto 0 auto;
	background: #5d9040;
	border-radius: 12px;
	color: white;
	font-size: 20px;
	border: none;
`;

const ContainerLinks = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-top: 20px;
`;

const Links = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 60px;
	background: #80cc74;
	box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
	border-radius: 12px 0px 0px 12px;
	color: white;
	padding: 0 10px;
`;

const Delete = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 130px;
	height: 60px;
	background: #ffffff;
	box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
	border-radius: 0px 12px 12px 0px;
	border: 1px solid #80cc74;
`;
