import React from "react"
import "../styles/GameCard.css"
import { Button, Container, Image, Stack } from "react-bootstrap"
import { GiCalendar, GiGamepad } from "react-icons/gi"
import { AiOutlineCalendar, AiOutlineFieldTime } from "react-icons/ai"
import { getGameText } from "../models/Game"

interface Game {
	id: number,
	name: string,
	type: string,
	startingTime: Date | null,
	endingTime: Date | null,
	time: number | null
}
export function GameCard(props: {game: Game, disabled: boolean, playButton: () => void}) {
	
	const formatStartingTime = (): string => {
		const time = props.game.startingTime
		if (time === null) {
			return "Avatud";
		}
		return new Date(time).toLocaleDateString("et-EE", {day: "2-digit", month: "2-digit", year: "numeric"});
	}
	
	const formatEndingTime = (): string => {
		const time = props.game.endingTime
		if (time === null) {
			return "Määramata";
		}
		return new Date(time).toLocaleDateString("et-EE", {day: "2-digit", month: "2-digit", year: "numeric"});
	}
	
	return (
		<div className="main-card">
			<Stack direction="horizontal" className="card-heading">
				<Image
					src="https://cdn-icons-png.flaticon.com/512/103/103228.png"
					alt="game-type"
					className="p-3 game-type-icon"
				/>
				<p className="heading pe-3">{props.game.name}</p>
			</Stack>
			<div className="loader">
				<GiGamepad className="game-property"></GiGamepad>
				<div className="song">
					<p className="type-name">{getGameText(props.game.type)}</p>
					<p className="artist">Mängu tüüp</p>
				</div>
			</div>
			<div className="loader">
				<AiOutlineFieldTime className="game-property"></AiOutlineFieldTime>
				<div className="song">
					<p className="type-name">{props.game.time ? props.game.time + " minutit" : "Lõpmatu"}</p>
					<p className="artist">Mängu aeg</p>
				</div>
			</div>
			<div className="loader">
				<AiOutlineCalendar className="game-property"></AiOutlineCalendar>
				<div className="song">
					<p className="type-name">{formatStartingTime()}</p>
					<p className="artist">Mäng avatakse</p>
				</div>
			</div>
			<div className="loader">
				<GiCalendar className="game-property"></GiCalendar>
				<div className="song">
					<p className="type-name">{formatEndingTime()}</p>
					<p className="artist">Mäng suletakse</p>
				</div>
			</div>
			<div className="start-game-section">
				<Button disabled={props.disabled} onClick={props.playButton}>Mängi</Button>
			</div>
		</div>
	)
}