import React, { useEffect, useState } from "react";
import "../../styles/Header.css";
import { FaFlagCheckered, FaHourglassHalf } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/ActiveGame.css";
import { RiMedal2Fill } from "react-icons/ri";
import MemoryCardGrid from "../components/MemoryCardGrid";
import { useStompClient } from "../hooks/useStompClient";
import { useLocation } from "react-router-dom";
import { GameState } from "../models/GameState";

const initialState: GameState = {
	players: [{ id: 0, score: 0, cards: [] }],
	time: 0,
};

function ActiveGame() {
	const { stompClient, connected } = useStompClient("/game-ws");
	const location = useLocation();
	const [gameState, setGameState] = useState<GameState>(initialState);
	const [cardsLoading, setCardsLoading] = useState<boolean>(false);
	
	useEffect(() => {
		if (connected && stompClient) {
			setInitialState();
			const subscription = stompClient.subscribe(
				"/topic/game/" + location.state.uuid,
				(message) => {
					console.log("Received message:", message.body);
					setGameState(JSON.parse(message.body));
					console.log(gameState);
				}
			);
			
			return () => {
				subscription.unsubscribe();
			};
		}
	}, [connected, stompClient]);
	
	const sendGameStateUpdate = (id: number) => {
		if (connected && stompClient) {
			stompClient.publish({
				destination: "/game/live/state",
				body: JSON.stringify({clickedCard: id}),
				headers: { uuid: location.state.uuid },
			});
		}
	}
	
	const updateCardState = (id: number, newState: Partial<GameState>) => {
		const updatedState = { ...gameState, ...newState };
		setGameState(updatedState);
		sendGameStateUpdate(id);
	};
	
	const setInitialState = () => {
		if (connected && stompClient) {
			stompClient.publish({
				destination: "/game/live/latest",
				body: "Latest state",
				headers: { uuid: location.state.uuid },
			});
		}
	};
	
	const handleCardClick = (id: number) => {
		if (cardsLoading) {
			return;
		}
		
		const clickedCards = gameState.players[0].cards.filter((c) => c.clicked);
		
		if (clickedCards.length < 2) {
			const newState = { ...gameState };
			newState.players[0].cards = newState.players[0].cards.map((c) => {
				if (c.id === id) {
					c.clicked = true;
				}
				return c;
			});
			updateCardState(id, newState);
			
			if (clickedCards.length === 1) {
				const firstCard = clickedCards[0];
				const secondCard = newState.players[0].cards.find((c) => c.id === id);
				
				if (firstCard.questionId === secondCard!.questionId) {
					setTimeout(() => {
						newState.players[0].cards
							.filter((c) => c.clicked)
							.forEach((c) => (c.answered = true));
					}, 1000);
				}
				
				setCardsLoading(true);
				setTimeout(() => {
					const resetState = { ...newState };
					resetState.players[0].cards.forEach((c) => (c.clicked = false));
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
	            ? gameState.time / 60 + ":" + (gameState.time % 60)
	            : "~"}
          </span>
				</Col>
			</Row>
			<hr />
			<MemoryCardGrid gameState={gameState} handleCardClick={handleCardClick} />
		</Container>
	);
}

export default ActiveGame;

