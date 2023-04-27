import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../../styles/CreateOrEditQuestionSet.css"
import Select from "react-select"
import { AnswerType, Question, QuestionSetVisibility, Visibility } from "../models/QuestionSet"
import { FaPlusCircle } from "react-icons/fa"
import { postQuestionSet } from "../service/questionset-api"
import { useNavigate } from "react-router-dom"

function CreateOrEditQuestionSet() {
	
	const [name, setName] = useState("");
	const [visibility, setVisibility] = useState<QuestionSetVisibility>({value: Visibility.PRIVATE, label: "Privaatne"});
	const [questions, setQuestions] = useState<Question[]>([{questionText: "", answerType: {value: AnswerType.PLAIN_TEXT, label: "Tekst"}, answers: [{text: "", isCorrect: false}]}])
	const navigate = useNavigate();
	const navigateToQuestionSetList = () => {
		navigate('/questions', { state: { created: true } });
	}
	
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	
	const addQuestion = () => {
		setQuestions([...questions, {questionText: "", answerType: {value: AnswerType.PLAIN_TEXT, label: "Tekst"}, answers: [{text: "", isCorrect: true}]}])
	}
	
	const handleVisibilityChange = (selectedOption: any) => {
		setVisibility(selectedOption);
	};
	
	const options = [ // Array of visibility options
		{value: Visibility.PUBLIC, label: 'Avalik'},
		{value: Visibility.PRIVATE, label: 'Privaatne'}
	];
	
	const answerTypeOptions = [
		{value: AnswerType.PLAIN_TEXT, label: "Tekst"},
		{value: AnswerType.NUMBER, label: "Arv"},
		{value: AnswerType.CHOOSE_ONE, label: "Üks õige"},
		{value: AnswerType.CHOOSE_MULTIPLE, label: "Mitu õiget"}
	]
	
	const handleQuestionTextChange = (changedQuestion: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const newQuestions = [...questions];
		newQuestions[index].questionText = changedQuestion.target.value;
		setQuestions(newQuestions);
	};
	const handleAnswerTypeChange = (opt: any, index: number) => {
		const newQuestions = [...questions];
		newQuestions[index].answerType = opt;
		
		if (opt.value === AnswerType.PLAIN_TEXT || opt.value === AnswerType.NUMBER) {
			newQuestions[index].answers = [{ text: "", isCorrect: true}];
		}
		
		if (opt.value === AnswerType.CHOOSE_ONE) {
			newQuestions[index].answers = newQuestions[index].answers.map((answer, idx) => ({
				...answer,
				isCorrect: idx === 0,
			}));
		}
		setQuestions(newQuestions);
	}
	
	const handleAnswerTextChange = (changedAnswer: React.ChangeEvent<HTMLInputElement>, questionNr: number, index: number) => {
		const newQuestions = [...questions];
		const newAnswers = [...newQuestions[questionNr].answers]
		newAnswers[index].text = changedAnswer.target.value;
		newQuestions[questionNr].answers = newAnswers;
		setQuestions(newQuestions);
	}
	
	const handleAnswerChange = (questionNr: number, index: number, checked: boolean)  => {
		const newQuestions = [...questions];
		const newAnswers = [...newQuestions[questionNr].answers];
		
		if (questions[questionNr].answerType.value === AnswerType.CHOOSE_ONE) {
			newAnswers.forEach((answer, idx) => {
				answer.isCorrect = idx === index;
			})
		} else {
			newAnswers[index].isCorrect = checked;
		}
		newQuestions[questionNr].answers = newAnswers;
		setQuestions(newQuestions)
	}
	
	const addAnswer = (questionNr: number) => {
		const newQuestions = [...questions];
		newQuestions[questionNr].answers = [...newQuestions[questionNr].answers, {text: "", isCorrect: false}]
		setQuestions(newQuestions);
	}
	
	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		postQuestionSet(questions, name, visibility.value).then(() => navigateToQuestionSetList());
	};
	
	return (
		<div className="create-question-page">
			<div className="title">
				<h1>Loo uus küsimustik</h1>
			</div>
			<div>
				<form onSubmit={handleFormSubmit} className="question-form">
					<div className="form-group">
						<label htmlFor="name">Nimi</label>
						<input
							type="text"
							id="name"
							className="form-control"
							value={name}
							onChange={handleNameChange}
							placeholder="Sisesta küsimustiku nimi"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="visibility">Nähtavus</label>
						<Select
							id="visibility"
							name="visibility"
							options={options}
							value={visibility}
							onChange={handleVisibilityChange}
						/>
					</div>
					<button type="button" className="form-group btn btn-primary mt-5" onClick={handleFormSubmit}>
						<FaPlusCircle /> Salvesta küsimustik
					</button>
				</form>
				{questions.map((question, index) => (
					<div key={index} className="questions-group mb-3">
						<label className="question-label"> Küsimus #{index + 1}</label>
						<input type="text" className="form-control" value={question.questionText}
						       onChange={(e) => handleQuestionTextChange(e, index)}
						       placeholder="Sisesta küsimuse tekst"
						       required>
						</input>
						<label> Vastuse tüüp</label>
						<Select className="mt-2" options={answerTypeOptions}
						        value={question.answerType}
						        onChange={(opt) => handleAnswerTypeChange(opt, index)}
						        placeholder="Vali vastuse tüüp"
						/>
						{question.answers.map((answer, idx) => {
							if (question.answerType.value === AnswerType.PLAIN_TEXT) {
								return <div key={idx}>
									<label>Õige vastus</label>
									<input
										type="text"
										className="form-control"
										value={answer.text}
										onChange={(e) => handleAnswerTextChange(e, index, idx)}
										placeholder="Sisesta õige vastuse tekst"
										required
									/>
								</div>
							}
							if (question.answerType.value === AnswerType.NUMBER) {
								return <div key={idx}>
									<label>Õige vastus</label>
									<input
										type="number"
										className="form-control"
										value={answer.text}
										onChange={(e) => handleAnswerTextChange(e, index, idx)}
										placeholder="Sisesta õige vastus arvuna"
										required
									/>
								</div>
							}
							if (question.answerType.value === AnswerType.CHOOSE_ONE) {
								return <div key={idx}>
									<label>Vastus #{idx + 1}</label>
									<input
										type="text"
										className="form-control"
										value={answer.text}
										onChange={(e) => handleAnswerTextChange(e, index, idx)}
										placeholder="Sisesta vastus"
										required
									/>
									<input
										type="radio"
										checked={answer.isCorrect}
										onChange={(e) => handleAnswerChange(index, idx, e.target.checked)}
									/>
									<label className="p-2">
										Õige vastus?
									</label>
									{idx === question.answers.length - 1 && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={() => addAnswer(index)}
										>
											<FaPlusCircle /> Lisa vastus
										</button>
									)}
								</div>
							}
							if (question.answerType.value === AnswerType.CHOOSE_MULTIPLE) {
								return <div key={idx}>
									<label>Vastus #{idx + 1}</label>
									<input
										type="text"
										className="form-control"
										value={answer.text}
										onChange={(e) => handleAnswerTextChange(e, index, idx)}
										placeholder="Sisesta vastus"
										required
									/>
									<input
										type="checkbox"
										checked={answer.isCorrect}
										onChange={(e) => handleAnswerChange(index, idx, e.target.checked)}
									/>
									<label className="p-2">
										Õige vastus?
									</label>
									{idx === question.answers.length - 1 && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={() => addAnswer(index)}
										>
											<FaPlusCircle /> Lisa vastus
										</button>
									)}
								</div>
							}
						}
						)}
						<hr/>
					</div>
					))}
				<div className="add-question">
					<button type="button" className="btn btn-primary mb-5" onClick={addQuestion}>
						<FaPlusCircle /> Lisa küsimus
					</button>
				</div>
			</div>
		</div>
	)
}

export default CreateOrEditQuestionSet
