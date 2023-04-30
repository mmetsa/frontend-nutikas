export interface School {
	id: number,
	name: string,
	classes: Class[]
}

export interface Class {
	id: number,
	name: string
	count?: number
}

export interface RegisterSchool {
	name: string,
	shortName: string,
	address: string,
	schoolEmail: string,
	phone: string,
	username: string,
	adminEmail: string,
	password: string,
	code: string
}