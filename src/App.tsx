import React from "react"
import Header from "./components/Header"
import "bootstrap/dist/css/bootstrap.min.css"
import LoginForm from "./components/LoginForm"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import MainMenu from "./components/MainMenu"
import GameArea from "./pages/GameArea"
import './App.css'
import QuestionsPage from "./pages/QuestionsPage"
import CreateOrEditQuestionSet from "./pages/CreateOrEditQuestionSet"
import GamesPage from "./pages/GamesPage"
import CreateGame from "./pages/CreateGame"
import RegisterForm from "./components/RegisterForm"
function App() {
	
	return (
		<div className="App">
			<Header />
			<div className={"main-content"}>
				<MainMenu/>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/login" element={<LoginForm/>}/>
					<Route path="/register" element={<RegisterForm/>}/>
					<Route path="/game-area" element={<GameArea/>}/>
					<Route path="/games" element={<GamesPage/>}/>
					<Route path="/games/create" element={<CreateGame/>}/>
					<Route path="/questions" element={<QuestionsPage/>}/>
					<Route path="/questions/create" element={<CreateOrEditQuestionSet/>}/>
				</Routes>
			</div>
		</div>
	)
}

export default App
