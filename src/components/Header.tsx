import React, { useRef, useState } from "react"
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCoins, FaShopify } from "react-icons/fa";
import Auth from "../auth/auth-service";
import { Container, Row, Col, ProgressBar, OverlayTrigger, Tooltip, Overlay } from "react-bootstrap"

function Header() {
	const auth = Auth.getInstance();
	const navigate = useNavigate();
	const navigateToProfile = () => {
		navigate("/profile");
	};
	
	const [show, setShow] = useState(false);
	const target = useRef(null);
	
	const currentXp = auth.getCurrentXp();
	const currentLvl = auth.getCurrentLvl();
	const nextLevelXp = auth.getNextLevelXp();
	
	const currentLevelXp = currentLvl === 0 ? 0 : auth.getStartingXp();
	const progressPercentage = ((currentXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
	
	return (
		<header className="header">
			<Container fluid>
				<Row>
					<Col>
						{!auth.isAuthenticated() && (
							<div className="menu-container">
								<div className="menu-item" onClick={() => navigate("/join")}>
									Liitu oma kooliga
								</div>
								<div className="menu-item" onClick={() => navigate("/login")}>
									Logi sisse
								</div>
								<div className="menu-item" onClick={() => navigate("/register")}>
									Registreeri
								</div>
							</div>
						)}
						{auth.getNickname() && (
							<div className="menu-container">
								<div className="progress-container" ref={target} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
									<Overlay target={target.current} show={show} placement="bottom">
										{(props) => (
											<Tooltip id="overlay-example" {...props}>
												{`XP: ${auth.getCurrentXp()} / ${auth.getNextLevelXp()}`}
											</Tooltip>
										)}
									</Overlay>
									<ProgressBar className="xp-progress-bar">
										<ProgressBar striped variant="custom-yellow" now={progressPercentage} key={1} />
										<div className="progress-level-text">Level: {auth.getCurrentLvl()}</div>
									</ProgressBar>
								</div>
								<div className="menu-item-coins">
									<FaCoins size={20} style={{color: '#FFB511'}}></FaCoins> <label style={{color: 'white'}}>{auth.getCoins()}</label>
								</div>
								<div className="menu-item" onClick={navigateToProfile}>
									<FaUser size={20}></FaUser> {auth.getNickname()}
								</div>
							</div>
						)}
					</Col>
				</Row>
			</Container>
		</header>
	);
}

export default Header;