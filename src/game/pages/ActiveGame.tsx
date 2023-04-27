import React from "react"
import "../../styles/Header.css";
import { FaFlagCheckered, FaHourglassHalf } from "react-icons/fa"
import { Container, Row, Col } from "react-bootstrap"
import "../../styles/ActiveGame.css"
import { RiMedal2Fill } from "react-icons/ri"
import MemoryCardGrid from "../components/MemoryCardGrid"
function ActiveGame() {
	const questions: string[] = [
		"Lind kes muneb", "Eesti pealinn", "Eesti lipu värvide arv",
		"Kuulus Eesti laulja", "Seda kantakse peas", "Kana", "Magus mari", "3",
		"Ott Lepland", "Sall", "Seda kantakse ümber kaela", "Tallinn", "Müts",
		"Random","Random","Random","Random","Random","Random","Random","Random","Random","Random","Random","Random","Random","Random","Random","Random","Random"
	]
	return (
		<Container>
			<Row>
				<Col xs={12} sm={6} md={4}>
					<div className="pointsRow">
						<FaFlagCheckered size={50}/>
						<span className="ms-3 points-text">4 / 30</span>
					</div>
				</Col>
				<Col xs={12} sm={6} md={4} className="pointsRow">
					<RiMedal2Fill size={50}></RiMedal2Fill>
					<span className="ms-3 points-text">1360</span>
				</Col>
				<Col xs={12} sm={6} md={4} className="pointsRow">
					<FaHourglassHalf size={50}></FaHourglassHalf>
					<span className="ms-3 points-text">1:25</span>
				</Col>
			</Row>
			<hr/>
			<MemoryCardGrid cards={questions}/>
		</Container>
	);
}

export default ActiveGame;