import jwt_decode from "jwt-decode"
import { Role } from "../util/UserUtil"
import { ApiError } from "../util/ApiError"
export interface IAuthTokens {
	accessToken: string;
	refreshToken: string;
}

export interface IToken {
	authorities: string[];
	exp: number;
	iat: number;
	points: string;
	sub: string;
}

export interface IAuthority {
	schoolId: number;
	userId: number;
	role: Role;
	disabled: boolean;
}

export interface IUserData {
	coins: number;
	experience: number;
	level: number;
	experienceLeft: number;
	startingXp: number;
}

class Auth {
	private baseUrl = process.env.REACT_APP_API_URL;
	private static instance: Auth;
	private tokens: IAuthTokens | null = null;
	private userData: IUserData | null = null;
	
	public static getInstance(): Auth {
		if (!Auth.instance) {
			Auth.instance = new Auth();
		}
		return Auth.instance;
	}
	
	public getUserData() {
		return this.userData;
	}
	
	public logout() {
		this.tokens = null;
		localStorage.removeItem("tokens")
	}
	
	public setTokens(tokens: IAuthTokens) {
		this.tokens = tokens;
		const decodedToken: IToken = jwt_decode(this.tokens.accessToken);
		this.userData = JSON.parse(decodedToken.points);
		localStorage.setItem('tokens', JSON.stringify(tokens));
	}
	
	public isAuthenticated(): boolean {
		return this.tokens !== null;
	}
	
	public getUserId(): number | null {
		if (!this.tokens) {
			return null;
		}
		try {
			const decodedToken: IToken = jwt_decode(this.tokens.accessToken)
			const authorities: string[] = decodedToken.authorities;
			if (authorities && authorities.length > 0) {
				const firstAuthority: IAuthority = JSON.parse(authorities[0]);
				return firstAuthority.userId;
			}
			return null;
		} catch (error) {
			return null;
		}
	}
	
	public getSchoolId(): number | null {
		if (!this.tokens) {
			return null;
		}
		try {
			const decodedToken: IToken = jwt_decode(this.tokens.accessToken)
			const authorities: string[] = decodedToken.authorities;
			if (authorities && authorities.length > 0) {
				const firstAuthority: IAuthority = JSON.parse(authorities[0]);
				return firstAuthority.schoolId;
			}
			return null;
		} catch (error) {
			return null;
		}
	}
	
	public getRole(): Role | null {
		if (!this.tokens) {
			return null;
		}
		try {
			const decodedToken: IToken = jwt_decode(this.tokens.accessToken)
			const authorities: string[] = decodedToken.authorities;
			if (authorities && authorities.length > 0) {
				const firstAuthority: IAuthority = JSON.parse(authorities[0]);
				return firstAuthority.role;
			}
			return null;
		} catch (error) {
			return null;
		}
	}
	
	public getNickname(): string | null {
		if (!this.tokens) {
			return null;
		}
		try {
			const decodedToken: IToken = jwt_decode(this.tokens.accessToken)
			return decodedToken.sub;
		} catch (error) {
			return null;
		}
	}
	
	public async fetchWithAuth(input: RequestInfo, init?: RequestInit): Promise<Response> {
		if (typeof input === "string") {
			input = this.baseUrl + input;
		}
		const requestInit = init ? { ...init } : {};
		if (this.tokens) {
			requestInit.headers = {
				...requestInit.headers,
				Authorization: `Bearer ${this.tokens.accessToken}`,
				'Content-Type': 'application/json',
			};
		}
		
		let response = await fetch(input, requestInit);
		
		if (response.status === 401) {
			const refreshResponse = await fetch(this.baseUrl + '/api/auth/refresh', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					refreshToken: this.tokens?.refreshToken
				}),
			});
			if (refreshResponse.ok) {
				const data: IAuthTokens = await refreshResponse.json()
				this.setTokens(data);
				response = await fetch(input, requestInit);
				if (response.ok) {
					return await response.json();
				}
				const error: ApiError = await response.json();
				throw new ApiError(error.message, response.status, []);
			} else {
				const error: ApiError = await response.json();
				throw new ApiError(error.message, response.status, []);
			}
		}
		
		return response;
	}
	
	public initialize() {
		const tokens = localStorage.getItem('tokens');
		
		if (tokens) {
			this.tokens = JSON.parse(tokens);
		}
	}
}

export default Auth;