import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, FormControl, Stack, Container, Row, Col, Image } from "react-bootstrap"
import { GameResponse, getGameText } from "../models/Game"
import Auth from "../../auth/auth-service"
import "../../styles/GameArea.css"

function GameArea() {
	const auth = Auth.getInstance();
	const [games, setGames] = useState<GameResponse[]>([]);
	const [gameCode, setGameCode] = useState("");
	
	useEffect(() => {
		auth.fetchWithAuth("http://localhost:8080/api/game/list/student")
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
				{games.map((game) => {
					const isDisabled = new Date() < new Date(game.startingTime ?? new Date());
					return (
						<Card key={game.id} className="flex-row cardBackground">
							<Image
								src="https://cdn-icons-png.flaticon.com/512/103/103228.png"
								width="100"
								height="100"
								alt="game-type"
								className="p-3"
							/>
							<Card.Body>
								<Card.Title>{game.name}</Card.Title>
									<Row>
										<Col>
											<Card.Text><strong>Tüüp:</strong> {getGameText(game.type)}</Card.Text>
										</Col>
										<Col>
											<Card.Text><strong>Mängu aeg: </strong>{game.time ? game.time + " minutit": "Lõputu"}</Card.Text>
										</Col>
									</Row>
								<Row>
									{game.startingTime && isDisabled && (
										<Col>
											<strong>Mäng avatakse:</strong> {new Date(game.startingTime).toLocaleDateString("et-EE", {day: "2-digit", month: "2-digit", year: "numeric"})}
										</Col>
									)}
									{game.endingTime && isDisabled && (
										<Col>
											<strong>Mäng suletakse:</strong> {new Date(game.endingTime).toLocaleDateString("et-EE", {day: "2-digit", month: "2-digit", year: "numeric"})}
										</Col>
									)}
								</Row>
							</Card.Body>
						</Card>
					);
				})}
			</Stack>
		</Container>
	);
}

export default GameArea;