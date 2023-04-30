export class ApiError extends Error {
	constructor(message: string, status?: number, details?: ApiErrorDetail[]) {
		super(message)
		this.message = message;
		this.details = details;
		this.status = status;
	}
	
	message: string;
	status?: number;
	details?: ApiErrorDetail[]
}

export interface ApiErrorDetail {
	fieldName: string,
	message: string
}