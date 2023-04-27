import React, { useEffect, useState } from "react"
import { Button, Card, Container, Image, Stack } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"
import { fetchGames } from "../service/game-api"
import { GameResponse, getGameText, getGameType } from "../models/Game"
import "../../styles/GamesPage.css"

function GamesPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [games, setGames] = useState<GameResponse[]>([]);
	
	const createGame = () => {
		navigate("/games/create");
	};
	
	useEffect(() => {
		if (location.state && location.state.success) {
			setShowSuccessMessage(true);
			setTimeout(() => {
				setShowSuccessMessage(false);
			}, 5000);
		}
		
		async function loadGames() {
			const fetchedGames = await fetchGames();
			setGames(fetchedGames);
		}
		loadGames();
	}, []);
	
	return (
		<Container>
			{showSuccessMessage && (
				<div className="alert alert-success" role="alert">
					Mäng edukalt loodud!
				</div>
			)}
			<h2>Sinu loodud mängud</h2>
			<Button className="mb-4" onClick={() => createGame()}>
				Loo uus mäng
			</Button>
			<Stack gap={0}>
				{games.map((game) => (
					<>
						<label className="mt-3">
							<h3>
								<strong>Kood: {game.code}</strong>
							</h3>
						</label>
						<Card key={game.classId} className="flex-row games-page-card">
							<Image
								src="https://cdn-icons-png.flaticon.com/512/103/103228.png"
								width="100"
								height="100"
								alt="game-type"
								className="p-3"
							/>
							<Card.Body>
								<Card.Title className="row">
									<>
										<div className="col-md-4">
											<Stack gap={3}>
												<div>
													Teema: {game.questionSetName}
												</div>
												<div>
													Mäng: {getGameText(game.type)}
												</div>
											</Stack>
										</div>
										<div className="col-md-4">
											<Stack gap={3}>
												<div>
													Aeg: {game.time ? game.time + " minutit" : "Lõputu"}
												</div>
												<div>
													Klass: {game.classId} <br />
												</div>
											</Stack>
										</div>
										<div className="col-md-4">
											<Stack gap={3}>
												<div>
													Algusaeg: {game.startingTime ? new Date(game.startingTime).toLocaleDateString("et-EE", {day: "2-digit", month: "2-digit", year: "numeric"}) : "Puudub"}<br/>
												
												</div>
												<div>
													Lõpuaeg: {game.endingTime ? new Date(game.endingTime).toLocaleDateString("et-EE", {day: "2-digit", month: "2-digit", year: "numeric"}) : "Puudub"}<br/>
												
												</div>
											</Stack>
										</div>
									</>
								</Card.Title>
							</Card.Body>
							<Card.Footer className="col-md-2">
								<Stack gap={3}>
									<Button variant="warning" className="mr-2">
										<FaEdit /> Muuda
									</Button>
									<Button variant="danger">
										<FaTrash /> Kustuta
									</Button>
								</Stack>
							</Card.Footer>
						</Card>
						<hr/>
					</>
				))}
			</Stack>
		</Container>
	);
}

export default GamesPage;