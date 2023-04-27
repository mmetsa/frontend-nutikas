import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MemoryCard from './MemoryCard';
import '../../styles/MemoryCardGrid.css';
import { FaStar } from "react-icons/fa"

function MemoryCardGrid({ cards }: { cards: string[] }) {
	
	const renderCards = () => {
		return cards.map((card, index) => (
			<Col xs={6} sm={4} md={2} lg={3} xl={2} key={index} className="resized-card">
				<MemoryCard text={card} icon={<FaStar size={100}/>} />
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
