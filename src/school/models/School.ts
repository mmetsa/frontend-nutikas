export interface School {
	id: number,
	name: string,
	classes: Class[]
}

export interface Class {
	id: number,
	name: string
}