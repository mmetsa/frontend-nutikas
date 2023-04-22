
export interface User {
	id: number,
	nickname: string,
	email: string,
	firstName: string,
	lastName: string,
	birthday: Date,
	coins: number,
	experience: number
	authorities: Authority[]
}

interface Authority {
	authority: Role
}

export enum Role {
	STUDENT= "STUDENT",
	TEACHER = "TEACHER",
	ADMIN = "ADMIN",
	SCHOOL_ADMIN = "SCHOOL_ADMIN"
}