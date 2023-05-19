import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MemoryCard from './MemoryCard';
import '../../styles/MemoryCardGrid.css';
import { FaStar } from "react-icons/fa"
import { GameState } from "../models/GameState"

function MemoryCardGrid(
	{ gameState, handleCardClick }: { gameState: GameState, handleCardClick: (id: number) => void }
) {
	
	const renderCards = () => {
		return gameState.players[0].cards.map((card, index) => (
			<Col xs={6} sm={4} md={2} lg={3} xl={2} key={index} className="resized-card">
				<MemoryCard
					id={card.id}
					flipped={card.clicked}
					answered={card.answered}
					text={card.text}
					icon={<FaStar size={100}/>}
					handleCardClick={() => handleCardClick(card.id)}
				/>
			</Col>
		));
	};
	
	return (
		<div className="MemoryCardGrid">
			<Container fluid>
				<Row>
					{renderCards()}
				</Row>
			</Container>
		</div>
	);
}

export default MemoryCardGrid;
