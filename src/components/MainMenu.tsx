import React from "react";
import { Link, useLocation } from "react-router-dom" // Import Link from React Router
import { FaGamepad, FaUsers, FaTrophy, FaUser, FaWrench, FaPuzzlePiece } from "react-icons/fa"
import '../styles/MainMenu.css'
import { Role } from "../util/UserUtil"
import Auth from "../auth/auth-service"

const MainMenu = () => {
	const auth = Auth.getInstance();
	const location = useLocation();
	
	const role: Role | null = auth.getRole();
	
	// Render the main menu
	return (
		<>
		{role === Role.STUDENT && (
			<div style={menuContainerStyle}>
				<div style={menuHeaderStyle}>MÄNG</div>
				{/* Menu elements */}
				<Link to="/game-area" style={menuItemStyle}
						className={location.pathname === "/game-area" ? "active" : ""}>
					<FaGamepad size={30} style={menuIconStyle}/>Mänguväljak
				</Link>
				<Link to="/hiscores" style={menuItemStyle}
						className={location.pathname === "/hiscores" ? "active" : ""}>
					<FaTrophy size={30} style={menuIconStyle}/>Edetabelid
				</Link>
				<div style={menuHeaderStyle}>KOGUKOND</div>
				<Link to="/friends" style={menuItemStyle}
						className={location.pathname === "/friends" ? "active" : ""}>
					<FaUsers size={30} style={menuIconStyle}/>Minu sõbrad
				</Link>
				<Link to="/competitions" style={menuItemStyle}
						className={location.pathname === "/competitions" ? "active" : ""}>
					<FaPuzzlePiece size={30} style={menuIconStyle}/>Võistlused
				</Link>
				<div style={menuHeaderStyle}>Profiil</div>
				<Link to="/profile" style={menuItemStyle}
						className={location.pathname === "/profile" ? "active" : ""}>
					<FaUser size={30} style={menuIconStyle}/>Minu profiil
				</Link>
				<Link to="/settings" style={menuItemStyle}
						className={location.pathname === "/settings" ? "active" : ""}>
					<FaWrench size={30} style={menuIconStyle}/>Seaded
				</Link>
			</div>
		)}
		{role === Role.TEACHER && (
			<div style={menuContainerStyle}>
				<div style={menuHeaderStyle}>ÕPETAJALE</div>
				{/* Menu elements */}
				<Link to="/questions" style={menuItemStyle}
						className={location.pathname === "/questions" ? "active" : ""}>
					<FaGamepad size={30} style={menuIconStyle}/>Küsimustepank
				</Link>
				<Link to="/games" style={menuItemStyle}
					className={location.pathname === "/games" ? "active" : ""}>
					<FaTrophy size={30} style={menuIconStyle}/>Minu mängud
				</Link>
				<Link to="/friends" style={menuItemStyle}
					className={location.pathname === "/friends" ? "active" : ""}>
					<FaUsers size={30} style={menuIconStyle}/>Minu õpilased
				</Link>
				<div style={menuHeaderStyle}>KOGUKOND</div>
				<Link to="/competitions" style={menuItemStyle}
					className={location.pathname === "/competitions" ? "active" : ""}>
					<FaPuzzlePiece size={30} style={menuIconStyle}/>Edetabelid
				</Link>
				<Link to="/competitions" style={menuItemStyle}
				      className={location.pathname === "/competitions" ? "active" : ""}>
					<FaPuzzlePiece size={30} style={menuIconStyle}/>Võistlused
				</Link>
				<div style={menuHeaderStyle}>Profiil</div>
				<Link to="/profile" style={menuItemStyle}
					className={location.pathname === "/profile" ? "active" : ""}>
					<FaUser size={30} style={menuIconStyle}/>Minu profiil
				</Link>
				<Link to="/settings" style={menuItemStyle}
					className={location.pathname === "/settings" ? "active" : ""}>
					<FaWrench size={30} style={menuIconStyle}/>Seaded
				</Link>
			</div>
		)}
		</>
	);
};

// Menu container styles
const menuContainerStyle = {
	backgroundColor: "#fff",
	color: "#000",
	width: "15%",
	display: "flex",
	flexDirection: "column" as 'column',
	padding: "1rem",
	alignItems: "flex-start"
};

// Menu header styles
const menuHeaderStyle = {
	color: "#777", // Set grey color for menu header
	fontWeight: "bold",
	marginTop: "1rem",
	textAlign: "left" as 'left',
};

// Menu item styles
const menuItemStyle = {
	textDecoration: "none",
	fontSize: "large",
	color: "#000",
	margin: "1rem 0",
	textAlign: "left" as 'left'
};

const menuIconStyle = {
	marginRight: "0.5rem", // Add margin to the right of the icon
	color: "#0071ce"
};

export default MainMenu;