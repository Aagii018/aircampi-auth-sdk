import { Resource } from "./management/resource";
import { Tenant } from "./management/tenant";
import { User } from "./management/user";

export class Client {
	private client_id: string;
	private domain: string;
	constructor(config: Config) {
		this.client_id = config.client_id;

		this.domain = config.domain || "http://localhost:8536";
		fetch("http://localhost:8536/auth/v1/tenants", {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				"client-id": this.client_id,
			},
		})
			.then((response) => {
				return response.json();
			})
			.catch((err) => {
				return err;
			});
	}

	get tenant() {
		return new Tenant(this.client_id, this.domain);
	}

	get user() {
		return new User(this.client_id, this.domain, { tenant_id: "j" });
	}

	get resource() {
		return new Resource(this.client_id, this.domain);
	}
}

type Config = {
	client_id: string;
	domain?: string;
};
