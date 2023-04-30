import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from "react-bootstrap"
import '../../styles/QuestionsPage.css'
import { fetchQuestionSets } from "../service/questionset-api"
import { QuestionSet, Visibility } from "../models/QuestionSet"
import { FiEdit, FiGlobe, FiLock, FiTrash } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"

function QuestionsPage() {
	const [questionSets, setQuestionSets] = useState<QuestionSet[]>([])
	const location = useLocation();
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	useEffect(() => {
		if (location.state && location.state.created) {
			setShowSuccessMessage(true);
			setTimeout(() => {
				setShowSuccessMessage(false);
			}, 5000);
		}
		const fetchQuestionSetsData = async () => {
			try {
				const questionSetsData = await fetchQuestionSets();
				questionSetsData.sort((a: QuestionSet, b: QuestionSet) => {
					const dateA = new Date(a.date).getTime();
					const dateB = new Date(b.date).getTime();
					return dateB - dateA;
				})
				setQuestionSets(questionSetsData);
				setFilteredQuestionSets(questionSetsData)
			} catch (error) {
				// Handle the error
			}
		};
		
		fetchQuestionSetsData();
	}, [location.state]);
	const [searchText, setSearchText] = useState("");
	const [filteredQuestionSets, setFilteredQuestionSets] = useState<QuestionSet[]>([]);
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchText(value);
		setTimeout(() => {
			const filteredQuestionSets: QuestionSet[] = questionSets.filter((questionSet) =>
				questionSet.name.toLowerCase().includes(value.toLowerCase())
			);
			setFilteredQuestionSets(filteredQuestionSets)
		}, 300);
	};
	const navigate = useNavigate();
	const handleEdit = (questionSet: QuestionSet) => {
		// TODO: Handle question set edit
	};
	
	const handleCreate = () => {
		navigate('/questions/create');
	}
	
	const handleDelete = (questionSet: QuestionSet) => {
		// TODO: Handle question set delete
	};
	
	return (
		<div className="questions-page">
			{ showSuccessMessage && (
				<div className="alert alert-success" role="alert">
					Küsimustik edukalt loodud!
				</div>
			)}
			<div className="title">
				<h1>Minu Küsimustepank</h1>
				<Button variant="primary" size="lg" className="mt-1" onClick={handleCreate}>
					Loo uus küsimustik
				</Button>
			</div>
			<div className="d-flex justify-content-center mt-3 mb-3">
				<input
					type="text"
					value={searchText}
					onChange={handleSearchChange}
					className="form-control search-box"
					placeholder="Otsi küsimustikku..."
				/>
			</div>
			<div className="content justify-content-center">
				<ul className="row">
					{filteredQuestionSets.map(qs => (
						<div key={qs.id} className="col-md-6 mb-3 list-group">
							<div className="list-group-item d-flex justify-content-between align-items-center bg-light min-height">
								<div className="">
									<h5 className="mb-0">{qs.name}</h5>
									<p className="mb-1">
										<strong>Nähtavus: </strong>
										{qs.visibility === Visibility.PUBLIC ?
											<span><FiGlobe/> Avalik</span> : <span><FiLock/> Privaatne</span>}
									</p>
									<p className="mb-1">
										<strong>Küsimuste arv: </strong>
										{qs.amount}
									</p>
									<p className="mb-1">
										<strong>Loomise kuupäev: </strong>
										{new Date(qs.date).toLocaleDateString("et-EE", {day: "2-digit", month: "2-digit", year: "numeric"})}
									</p>
								</div>
								<div className="d-flex justify-content-end">
									<button className="btn btn-primary mb-2 ms-2" onClick={() => handleEdit(qs)}>
										<FiEdit/> Muuda
									</button>
									<button className="btn btn-danger mb-2 ms-2" onClick={() => handleDelete(qs)}>
										<FiTrash/> Kustuta
									</button>
								</div>
							</div>
						</div>
					))}
				</ul>
			</div>
		</div>
	)
}

export default QuestionsPage
