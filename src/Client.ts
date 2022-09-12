import { Tenant } from "./management/tenant";
import { User } from "./management/user";

export class Client {
	private client_id: string;
	private domain: string;
	protected default_tenant: Tenant;

	constructor(config: Config) {
		this.client_id = config.client_id;
		this.domain = config.domain || "http://localhost:8536";
		this.default_tenant = new Tenant(this.client_id, this.domain);
		console.log(this.default_tenant.createTenant())
	}

	get tenant() {
		return new Tenant(this.client_id, this.domain);
	}

	get user() {
		return new User(this.client_id, this.domain, {tenant_id: this.default_tenant.});
	}
}

type Config = {
	client_id: string;
	domain?: string;
};
