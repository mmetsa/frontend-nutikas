import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, FormControl, Stack, Container, Row, Col, Image } from "react-bootstrap"
import { GameResponse, getGameText } from "../models/Game"
import Auth from "../../auth/auth-service"
import "../../styles/GameArea.css"
import { GameCard } from "./GameCard"
import { useStompClient } from "../hooks/useStompClient"
import { useNavigate } from "react-router-dom"
import { strict } from "assert"

function GameArea() {
	const auth = Auth.getInstance();
	const [games, setGames] = useState<GameResponse[]>([]);
	const [gameCode, setGameCode] = useState("");
	const navigate = useNavigate()
	
	
	useEffect(() => {
		auth.fetchWithAuth("/api/game/list/student")
			.then((response) => response.json())
			.then((data) => setGames(data));
	}, []);
	
	const joinGameByCode = () => {
		// TODO: Handle join game by code
	};
	
	const handleGameCode = (code: string) => {
		if (code.length <= 7) {
			setGameCode(code);
		}
	}
	
	const handlePlayGame = async (id: number) => {
		console.log("Play clicked: " + id)
		const response = await auth.fetchWithAuth("/api/game/join?" + new URLSearchParams({id: id.toString()}), {
			method: "POST"
		});
		const uuid = await response.json()
		console.log(uuid)
		navigate("/game/" + uuid, {state: {uuid: uuid}});
	}
	
	return (
		<Container className="mt-5">
			<Row>
				<Col xs={4} md={3} lg={3} xl={3}>
					<FormControl
						size="lg"
						type="text"
						placeholder="MÄNGU KOOD"
						value={gameCode}
						onChange={(e) => handleGameCode(e.target.value.toUpperCase())}
					/>
				</Col>
				<Col>
					<Button
						size="lg"
						onClick={joinGameByCode}>
						LIITU MÄNGUGA
					</Button>
				</Col>
			</Row>
			<Stack gap={3} className="mt-5">
				<h2 className="mb-0">SINU KLASSI MÄNGUD</h2>
				<hr className="m-0"/>
				<Row>
					{games.map((game) => {
						const isDisabled = new Date() < new Date(game.startingTime ?? new Date());
						return (
							<Col key={game.id} className="col-lg-4 col-md-12">
								<GameCard
									disabled={isDisabled}
									game={game}
									playButton={() => handlePlayGame(game.id)}
								/>
							</Col>
						);
					})}
				</Row>
			</Stack>
		</Container>
	);
}

export default GameArea;