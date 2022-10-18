import { Tenant } from "./management/tenant";
import { User } from "./management/user";

export class Client {
	private client_id: string;
	private domain: string;

	constructor(config: Config) {
		this.client_id = config.client_id;
		
		this.domain = config.domain || "http://localhost:8536";
		console.log("Working");
		fetch("http://localhost:8536/auth/v1/tenants", {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				"client-id": this.client_id,
			},
		}).then((response) => {
			if (response.ok) {
				return response.json();
			}     
			throw new Error(response.statusText);
		});
	}

	get tenant() {
		return new Tenant(this.client_id, this.domain);
	}

	get user() {
		return new User(this.client_id, this.domain, { tenant_id: "j" });
	}
}

type Config = {
	client_id: string;
	domain?: string;
};
