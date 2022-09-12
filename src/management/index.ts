import { HttpType } from "../global";

export class Base {
	constructor(
		private client_id: string,
		private domain: string,
		public header?: object
	) {}
	protected request<T>(
		endpoint: string,
		type: HttpType,
		body?: object
	): Promise<T> {
		let config: object;
		const url = `${this.domain}/auth/v1/${endpoint}`;
		const headers = {
			"Content-Type": "application/json",
			"client-id": this.client_id,
			...this.header,
		};
		if (body) {
			config = {
				body: JSON.stringify(body),
				headers,
				method: type,
			};
		} else {
			config = {
				headers,
				method: type,
			};
		}

		return fetch(url, config).then((response) => {
			if (response.ok) {
				return response.json();
			}
			throw new Error(response.statusText);
		});
	}
}
