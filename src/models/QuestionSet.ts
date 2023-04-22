export interface QuestionSet {
	id: number,
	name: string,
	visibility: Visibility,
	amount: number,
	date: Date
}

export interface QuestionSetVisibility {
	value: Visibility;
	label: string;
}
export enum Visibility {
	PUBLIC = "PUBLIC",
	PRIVATE = "PRIVATE"
}

export enum AnswerType {
	PLAIN_TEXT = "PLAIN_TEXT",
	NUMBER = "NUMBER",
	CHOOSE_ONE = "CHOOSE_ONE",
	CHOOSE_MULTIPLE = "CHOOSE_MULTIPLE"
}

export interface QuestionAnswerType {
	value: AnswerType;
	label: string;
}

export interface Question {
	questionText: string;
	answerType: QuestionAnswerType;
	answers: Answer[];
}

export interface ApiQuestion {
	questionText: string;
	answerType: AnswerType;
	answers: Answer[];
}

export interface Answer {
	text: string;
	isCorrect: boolean;
}