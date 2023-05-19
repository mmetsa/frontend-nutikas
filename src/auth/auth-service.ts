import jwt_decode from "jwt-decode"
import { Role } from "../util/UserUtil"
import { ApiError } from "../util/ApiError"
import { type } from "os"
export interface IAuthTokens {
	accessToken: string;
	refreshToken: string;
}

class Auth {
	private baseUrl = process.env.REACT_APP_API_URL;
	private static instance: Auth;
	private tokens: IAuthTokens | null = null;
	
	public static getInstance(): Auth {
		if (!Auth.instance) {
			Auth.instance = new Auth();
		}
		return Auth.instance;
	}
	
	public setTokens(tokens: IAuthTokens) {
		this.tokens = tokens;
		localStorage.setItem('tokens', JSON.stringify(tokens));
	}
	
	public removeTokens() {
		this.tokens = null;
		localStorage.removeItem('tokens');
	}
	
	public isAuthenticated(): boolean {
		return this.tokens !== null;
	}
	
	public getUserId(): number | null {
		if (!this.tokens) {
			return null;
		}
		try {
			const decodedToken: any = jwt_decode(this.tokens.accessToken)
			const authorities: string[] = decodedToken.authorities;
			if (authorities && authorities.length > 0) {
				const firstAuthority = JSON.parse(authorities[0]);
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
			const decodedToken: any = jwt_decode(this.tokens.accessToken)
			const authorities: string[] = decodedToken.authorities;
			if (authorities && authorities.length > 0) {
				const firstAuthority = JSON.parse(authorities[0]);
				return firstAuthority.schoolId;
			}
			return null;
		} catch (error) {
			return null;
		}
	}
	
	public getCurrentXp(): number {
		if (!this.tokens) {
			return 0;
		}
		try {
			const decodedToken: any = jwt_decode(this.tokens.accessToken)
			const points: any = decodedToken.points;
			return JSON.parse(points).experience;
		} catch (error) {
			return 0;
		}
	}
	
	public getCoins(): number {
		if (!this.tokens) {
			return 0;
		}
		try {
			const decodedToken: any = jwt_decode(this.tokens.accessToken)
			const points: any = decodedToken.points;
			const value = JSON.parse(points).coins;
			if (value === null) {
				return 0;
			}
			return value;
		} catch (error) {
			return 0;
		}
	}
	
	public getNextLevelXp(): number {
		if (!this.tokens) {
			return 0;
		}
		try {
			const decodedToken: any = jwt_decode(this.tokens.accessToken)
			const points: any = decodedToken.points;
			return JSON.parse(points).experienceLeft;
		} catch (error) {
			return 0;
		}
	}
	
	public getStartingXp(): number {
		if (!this.tokens) {
			return 0;
		}
		try {
			const decodedToken: any = jwt_decode(this.tokens.accessToken)
			const points: any = decodedToken.points;
			return JSON.parse(points).startingXp;
		} catch (error) {
			return 0;
		}
	}
	
	public getCurrentLvl(): number {
		if (!this.tokens) {
			return 0;
		}
		try {
			const decodedToken: any = jwt_decode(this.tokens.accessToken)
			const points: any = decodedToken.points;
			return JSON.parse(points).level;
		} catch (error) {
			return 0;
		}
	}
	
	public getRole(): Role | null {
		if (!this.tokens) {
			return null;
		}
		try {
			const decodedToken: any = jwt_decode(this.tokens.accessToken)
			const authorities: string[] = decodedToken.authorities;
			if (authorities && authorities.length > 0) {
				const firstAuthority = JSON.parse(authorities[0]);
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
			const decodedToken: any = jwt_decode(this.tokens.accessToken)
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