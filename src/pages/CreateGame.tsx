import React, { useEffect, useState } from "react"
import Select, { SingleValue } from "react-select"
import "../styles/CreateGame.css";
import { fetchQuestionSets } from "../service/questionset-api"
import { Game, GameType, getGameType } from "../models/Game"
import { fetchClasses } from "../service/class-api"
import { Button, Stack, Card } from "react-bootstrap"
import DatePicker from "react-datepicker"
import { createGame } from "../service/game-api"
import { useNavigate } from "react-router-dom"

type QuestionSetOption = {
	value: number;
	label: string;
};

type ClassOption = {
	value: number;
	label: string;
}

interface GameTypeButtonProps {
	gameType: GameType;
	backgroundUrl: string;
	children: React.ReactNode;
	onSelect: (gameType: GameType) => void;
}

const GameTypeButton: React.FC<GameTypeButtonProps> = ({
	gameType,
	backgroundUrl,
	children,
	onSelect,
}) => {
	const [selected, setSelected] = useState(false);
	
	const handleClick = () => {
		setSelected(!selected);
		onSelect(gameType);
	};
	
	return (
		<div
			className={`game-type-button ${selected ? 'selected' : ''}`}
			onClick={handleClick}
			style={{
				backgroundImage: `url(${backgroundUrl})`,
			}}
		>
			{children}
		</div>
	);
};


const CreateGame: React.FC = () => {
	
	const navigate = useNavigate();
	const [game, setGame] = useState<Game>(
		{
			type: null,
			maxPlays: null,
			pointsPerQuestion: 1,
			pointPenalty: null,
			streaks: false,
			time: null,
			hintsEnabled: false,
			powerUpsEnabled: false,
			questionSetId: null,
			classId: null,
			startingTime: new Date(),
			endingTime: null,
		});
	const [questionSetOptions, setQuestionSetOptions] = useState<QuestionSetOption[]>([]);
	const [classOptions, setClassOptions] = useState<ClassOption[]>([]);
	const handleGameTypeSelection = (type: GameType) => {
		setGame({...game, type: getGameType(type)});
	};
	
	useEffect(() => {
		// Fetch the question sets and set them as options
		async function getQuestionSets() {
			const fetchedQuestionSets = await fetchQuestionSets();
			const formattedQuestionSets: QuestionSetOption[] = fetchedQuestionSets.map((questionSet) => ({
				value: questionSet.id,
				label: questionSet.name,
			}));
			setQuestionSetOptions(formattedQuestionSets);
		}
		
		async function getClasses() {
			const fetchedClasses = await fetchClasses();
			const formattedClasses: ClassOption[] = fetchedClasses.map((classItem) => ({
				value: classItem.id,
				label: classItem.name,
			}));
			setClassOptions(formattedClasses);
		}
		
		getQuestionSets();
		getClasses();
	}, []);
	
	const handleQuestionSetChange = (selectedOption: SingleValue<QuestionSetOption>) => {
		setGame({...game, questionSetId: selectedOption ? selectedOption.value : null})
	};
	const handleClassChange = (selectedOption: SingleValue<ClassOption>) => {
		setGame({...game, classId: selectedOption ? selectedOption.value : null})
	}
	
	async function handleGameCreation() {
		const response = await createGame(game);
		if (response.ok) {
			navigate("/games", {state: {success: true}})
		}
	}
	
	return (
		<div className="col-md-6 mx-auto mt-5">
			<div className="create-game">
				<h1>Loo uus mäng</h1>
				<div className="game-type-selection">
					<GameTypeButton
						gameType={GameType.MEMORY_MATCH}
						backgroundUrl="https://cdn-icons-png.flaticon.com/512/103/103228.png"
						onSelect={handleGameTypeSelection}
					>
						{GameType.MEMORY_MATCH}
					</GameTypeButton>
					{/* Add more game type buttons here in the future */}
				</div>
				{/* Continue building the rest of the CreateGame component */}
			</div>
			{game.type && (<Card className="mt-5">
				<Card.Header>
					<Stack gap={3} >
						<label>Vali küsimustik millega mängida</label>
						<Select
							className="question-set-select"
							options={questionSetOptions}
							onChange={(e) => handleQuestionSetChange(e)}
							placeholder="Vali küsimustik"
						/>
						<div>
							<label>Vali klass, kellele mäng on mõeldud</label>
							<Select
								className="class-select"
								options={classOptions}
								onChange={(e) => handleClassChange(e)}
								placeholder="Vali klass"
							/>
							{/* Rest of the component */}
						</div>
						<div>
							<label htmlFor="max-plays">
								Mitu korda saavad õpilased mängida: (tühjaks jätmisel lõputult)
							</label>
							<input
								className="form-control"
								type="number"
								id="max-plays"
								min="1"
								value={game.maxPlays || ""}
								onChange={(e) => setGame({ ...game, maxPlays: e.target.valueAsNumber || null })}
							/>
						</div>
						<div>
							<label htmlFor="points-per-question">Punktid õige vastuse eest:</label>
							<input
								type="number"
								id="points-per-question"
								min="1"
								value={game.pointsPerQuestion}
								onChange={(e) => setGame({ ...game, pointsPerQuestion: e.target.valueAsNumber || 1 })}
								className="form-control"
							/>
						</div>
						<div>
							<label htmlFor="deducted-points-per-wrong-answer">Trahvipunktid vale vastuse eest:</label>
							<input
								type="number"
								id="deducted-points-per-wrong-answer"
								min="1"
								value={game.pointPenalty || ""}
								onChange={(e) => setGame({ ...game, pointPenalty: e.target.valueAsNumber || null })}
								className="form-control"
							/>
						</div>
						<div>
							<label htmlFor="game-time">Mänguaeg minutites: (tühjaks jätmisel ajapiiranguta)</label>
							<input
								type="number"
								id="game-time"
								min="1"
								max="60"
								value={game.time || ""}
								onChange={(e) => setGame({ ...game, time: e.target.valueAsNumber || null })}
								className="form-control"
							/>
						</div>
						<div>
							<label htmlFor="game-start-time">Mängu avamisaeg: (tühjaks jätmisel avaneb kohe)</label>
							
							<DatePicker
								selected={game.startingTime}
								onChange={(date: Date) =>
									setGame({ ...game, startingTime: date })
								}
								dateFormat="dd.MM.yyyy HH:mm"
								id="game-start-time"
								minDate={new Date()}
								showYearDropdown
								showMonthDropdown
								showTimeSelect
								timeFormat="HH:mm"
								timeIntervals={60}
								dropdownMode="select"
								placeholderText="Vali avamisaeg"
								className="form-control"
							/>
						</div>
						<div>
							<label htmlFor="game-close-time">Mängu sulgumisaeg: (tühjaks jätmisel ei sulgu kunagi)</label>
							
							<DatePicker
								selected={game.endingTime}
								onChange={(date: Date) =>
									setGame({ ...game, endingTime: date })
								}
								dateFormat="dd-MM-yyyy HH:mm"
								id="game-close-time"
								minDate={game.startingTime}
								showYearDropdown
								showMonthDropdown
								showTimeSelect
								timeFormat="HH:mm"
								timeIntervals={60}
								dropdownMode="select"
								placeholderText="Vali sulgumisaeg"
								className="form-control"
							/>
						</div>
						<Stack direction="horizontal" gap={2}>
							<label htmlFor="streaks-enabled">Lisapunktid järjest õigesti vastamisel:</label>
							<input
								className="form-check"
								type="checkbox"
								id="streaks-enabled"
								checked={game.streaks}
								onChange={(e) => setGame({ ...game, streaks: e.target.checked })}
							/>
						</Stack>
						<div>
							<Stack direction="horizontal" gap={3} className="">
								<label htmlFor="hints-enabled">Vihjed lubatud?</label>
								<input
									className="form-check"
									type="checkbox"
									id="hints-enabled"
									checked={game.hintsEnabled}
									onChange={(e) => setGame({ ...game, hintsEnabled: e.target.checked })}
								/>
								<label htmlFor="power-ups-enabled">Power-up'id lubatud:</label>
								<input
									className="form-check"
									type="checkbox"
									id="power-ups-enabled"
									checked={game.powerUpsEnabled}
									onChange={(e) => setGame({ ...game, powerUpsEnabled: e.target.checked })}
								/>
							</Stack>
						</div>
						<Button onClick={handleGameCreation} className="col-md-6 ms-auto me-auto mt-5">Loo mäng</Button>
					</Stack>
				</Card.Header>
			</Card>)}
		</div>
	);
};

export default CreateGame;