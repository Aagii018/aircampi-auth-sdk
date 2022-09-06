import { Tenant } from "./management/tenant";

export class Client {
	private client_id: string;
	private domain: string;

	constructor(config: Config) {
		this.client_id = config.client_id;
		this.domain = config.domain || "http://localhost:8536";
		console.log("Working");
	}

	get tenant() {
		return new Tenant(this.client_id, this.domain);
	}
}

type Config = {
	client_id: string;
	domain?: string;
};
