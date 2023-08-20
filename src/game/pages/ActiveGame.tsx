import React, { useEffect, useState } from "react";
import "../../styles/Header.css";
import { FaFlagCheckered, FaHourglassHalf } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/ActiveGame.css";
import { RiMedal2Fill } from "react-icons/ri";
import MemoryCardGrid from "../components/MemoryCardGrid";
import { useStompClient } from "../hooks/useStompClient";
import { useLocation, useNavigate } from "react-router-dom"
import { GameState } from "../models/GameState";
import Auth from "../../auth/auth-service"

const initialState: GameState = {
	players: [{ id: 0, score: 0, cards: [] }],
	time: 0,
};

function ActiveGame() {
	const { stompClient, connected } = useStompClient("/game-ws");
	const location = useLocation();
	const [gameState, setGameState] = useState<GameState>(initialState);
	const [cardsLoading, setCardsLoading] = useState<boolean>(false);
	const [clickedCards, setClickedCards] = useState<number[]>([]);
	
	const navigate = useNavigate()
	const auth = Auth.getInstance()
	
	useEffect(() => {
		if (connected && stompClient) {
			const subscription = stompClient.subscribe(
				"/topic/game/" + location.state.uuid,
				(message) => {
					console.log("Received message:", message.body);
					const receivedState: GameState = JSON.parse(message.body);
					receivedState.players[0].cards.forEach(card => {
						if (clickedCards.includes(card.id)) {
							card.clicked = true;
						}
					})
					setGameState(receivedState);
					console.log(gameState);
				}
			);
			setInitialState();
			
			return () => {
				subscription.unsubscribe();
			};
		}
	}, [connected, stompClient, clickedCards]);
	
	const sendGameStateUpdate = (id: number) => {
		if (connected && stompClient) {
			stompClient.publish({
				destination: "/game/live/state",
				body: JSON.stringify({clickedCard: id}),
				headers: { uuid: location.state.uuid, gameType: "MEMORY_MATCH" },
			});
		}
	}
	
	const updateCardState = (id: number, newState: Partial<GameState>) => {
		const updatedState = { ...gameState, ...newState };
		setGameState(updatedState);
		sendGameStateUpdate(id);
		if (gameState.players[0].cards.every(c => c.answered)) {
			navigate("/game-area")
			
		}
	};
	
	const setInitialState = () => {
		if (connected && stompClient) {
			stompClient.publish({
				destination: "/game/live/latest",
				body: "Latest state",
				headers: { uuid: location.state.uuid, gameType: "MEMORY_MATCH" },
			});
		}
	};
	
	const handleCardClick = (id: number) => {
		if (cardsLoading) {
			return;
		}
		
		const clickedCardIds = gameState.players[0].cards
			.filter((c) => c.clicked)
			.map(c => c.id);
		
		if (clickedCards.length < 2) {
			const newState = { ...gameState };
			newState.players[0].cards = newState.players[0].cards.map((c) => {
				if (c.id === id) {
					c.clicked = true;
					setClickedCards([...clickedCardIds, id])
				}
				return c;
			});
			updateCardState(id, newState);
			
			if (clickedCards.length === 1) {
				const firstCardId = clickedCardIds[0];
				const secondCardId = id;
				
				const firstCard = gameState.players[0].cards.find(c => c.id === firstCardId);
				const secondCard = gameState.players[0].cards.find(c => c.id === secondCardId);
				
				if (firstCard!.questionId === secondCard!.questionId) {
					setTimeout(() => {
						newState.players[0].cards
							.filter((c) => c.clicked)
							.forEach((c) => (c.answered = true));
						gameState.players[0].score += 100;
						setGameState({...newState});
					}, 1000);
				}
				
				setCardsLoading(true);
				setTimeout(() => {
					const resetState = { ...newState };
					resetState.players[0].cards.forEach((c) => (c.clicked = false));
					setClickedCards([]);
					updateCardState(id, resetState);
					setCardsLoading(false);
				}, 1000);
			}
		}
	};
	
	return (
		<Container>
			<Row>
				<Col xs={12} sm={6} md={4}>
					<div className="pointsRow">
						<FaFlagCheckered size={50}/>
						<span className="ms-3 points-text">
              {gameState.players[0].cards.filter((c) => c.answered).length} /{" "}
							{gameState.players[0].cards.length}
            </span>
					</div>
				</Col>
				<Col xs={12} sm={6} md={4} className="pointsRow">
					<RiMedal2Fill size={50} />
					<span className="ms-3 points-text">{gameState.players[0].score}</span>
				</Col>
				<Col xs={12} sm={6} md={4} className="pointsRow">
					<FaHourglassHalf size={50} />
					<span className="ms-3 points-text">
            {gameState.time
	            ? gameState.time * 60 + " sek" : "~"}
          </span>
				</Col>
			</Row>
			<hr />
			<MemoryCardGrid gameState={gameState} clickedCards={clickedCards} handleCardClick={handleCardClick} />
		</Container>
	);
}

export default ActiveGame;

