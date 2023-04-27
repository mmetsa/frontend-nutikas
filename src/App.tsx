import React from "react"
import Header from "./components/Header"
import "bootstrap/dist/css/bootstrap.min.css"
import LoginForm from "./components/LoginForm"
import { Route, Routes } from "react-router-dom"
import MainMenu from "./components/MainMenu"
import GameArea from "./game/components/GameArea"
import './App.scss'
import QuestionsPage from "./questionsets/pages/QuestionsPage"
import CreateOrEditQuestionSet from "./questionsets/pages/CreateOrEditQuestionSet"
import GamesPage from "./game/pages/GamesPage"
import CreateGame from "./game/pages/CreateGame"
import RegisterForm from "./components/RegisterForm"
import ActiveGame from "./game/pages/ActiveGame"
import Auth from "./auth/auth-service"
function App() {
	const auth = Auth.getInstance();
	auth.initialize();
	return (
		<div className="App">
			<Header />
			<div className={"main-content"}>
				<MainMenu/>
				<Routes>
					<Route path="/" element={<GameArea/>}/>
					<Route path="/login" element={<LoginForm/>}/>
					<Route path="/register" element={<RegisterForm/>}/>
					<Route path="/game-area" element={<GameArea/>}/>
					<Route path="/games" element={<GamesPage/>}/>
					<Route path="/games/create" element={<CreateGame/>}/>
					<Route path="/questions" element={<QuestionsPage/>}/>
					<Route path="/questions/create" element={<CreateOrEditQuestionSet/>}/>
					<Route path="/game" element={<ActiveGame/>}/>
				</Routes>
			</div>
		</div>
	)
}

export default App
