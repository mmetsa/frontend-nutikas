import React from "react"
import "../styles/UserProfile.css"
import { Col, Row } from "react-bootstrap"
export function UserProfile() {
	return (
		<div className="user-card">
			<div className="infos">
				<div className="image"></div>
				<div className="info">
					<div>
						<p className="name">
							Kalamees23
						</p>
						<p className="function">
							Roll: Õpetaja
						</p>
					</div>
					<Row>
						<Col className="mb-1">
							<button className="request" type="button">
								Muuda
							</button>
						</Col>
						<Col>
							<button className="request" type="button">
								Eemalda
							</button>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	)
}