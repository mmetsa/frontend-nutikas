import { Question, QuestionSet, Visibility } from "../models/QuestionSet"
import Auth from "../../auth/auth-service"

export const fetchQuestionSets = async(): Promise<QuestionSet[]> => {
	const auth = Auth.getInstance();
	const response = await auth.fetchWithAuth(`http://localhost:8080/api/questionset/${auth.getUserId()}`)
	
	if (response.ok) {
		return await response.json();
	} else if (response.status === 401){
		throw new Error("AUTH_FAIL")
	} else {
		throw new Error("Failed to fetch question sets")
	}
}

export const postQuestionSet = async (questions: Question[], name: string, visibility: Visibility): Promise<void> => {
	const auth = Auth.getInstance();
	const questionsRequest = questions.map(q => {
		return {
			questionText: q.questionText,
			answerType: q.answerType.value,
			answers: q.answers
		}
	})
	const request = {
		name: name,
		questions: questionsRequest,
		visibility: visibility
	};
	const response = await auth.fetchWithAuth(`http://localhost:8080/api/questionset/create`, {
		method: 'POST',
		body: JSON.stringify(request)
	});
	if (!response.ok) {
		if (response.status === 401) {
			throw new Error("AUTH_FAIL");
		} else {
			throw new Error("Failed to fetch question sets")
		}
	}
}