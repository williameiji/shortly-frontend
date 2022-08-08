import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";

import Home from "../home/Home";
import UserContext from "../context/UserContext";
import url from "../services/urls";
import trash from "../../assets/images/trashcan.png";
import { useNavigate } from "react-router-dom";

export default function Main() {
	const [linkDataInput, setLinkDataInput] = useState({
		link: "",
	});
	const [linksFromUser, setLinksFromUser] = useState(null);
	const [control, setControl] = useState(true);
	const { userInformation } = useContext(UserContext);
	const navigate = useNavigate();

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
				if (err.response.status === 401) {
					navigate("/");
				} else {
					alert(err.response.data);
				}
			});
	}

	async function shortLink(e) {
		e.preventDefault();

		await axios
			.post(url.short, linkDataInput, config)
			.then((response) => {
				setControl(true);
				setLinkDataInput({
					link: "",
				});
			})
			.catch((err) => {
				if (err.response.status === 401) {
					alert(err.response.data);
					navigate("/");
				} else {
					alert(err.response.data);
				}
			});
	}

	async function deleteLink(id) {
		await axios
			.delete(`${url.delete}/${id}`, config)
			.then((response) => {
				alert("Link deletado!");
				setControl(true);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					alert(err.response.data);
					navigate("/");
				} else {
					alert(err.response.data);
				}
			});
	}

	function copyLink(shortUrl) {
		setControl(true);
		navigator.clipboard.writeText(`${url.open}/${shortUrl}`);
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
				? linksFromUser.shortenedUrls.map((item, index) => (
						<ContainerLinks key={index}>
							<BoxLinks onClick={() => copyLink(item.shortUrl)}>
								<Tooltiptext>Copy to clipboard</Tooltiptext>
								<Links>
									<p>{item.url}</p>
								</Links>{" "}
								<div>{item.shortUrl}</div>
								<div>{item.visitCount}</div>
							</BoxLinks>
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

	:last-child {
		margin-bottom: 20px;
	}
`;

const BoxLinks = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 60px;
	background: #80cc74;
	box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
	border-radius: 12px 0px 0px 12px;
	color: white;
	padding: 0 20px;
	position: relative;
	cursor: pointer;

	:hover span {
		visibility: visible;
		opacity: 0.7;
	}
`;

const Links = styled.div`
	display: flex;
	align-items: center;
	width: 300px;

	p {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
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

const Tooltiptext = styled.span`
	visibility: hidden;
	width: 140px;
	background-color: #555;
	color: #fff;
	text-align: center;
	border-radius: 6px;
	padding: 5px;
	position: absolute;
	z-index: 1;
	bottom: 100%;
	left: 50%;
	margin-left: -75px;
	opacity: 0;
	transition: opacity 0.3s;
`;
