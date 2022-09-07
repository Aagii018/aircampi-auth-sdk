import { ITenant, TenantView, TenantId, TenantOptional } from "./schema";

enum HttpType {
	Get = "GET",
	Post = "POST",
	Put = "PUT",
	Delete = "DELETE",
}

export class Tenant implements ITenant {
	constructor(private client_id: string, private domain: string) {}

	async getTenants(): Promise<TenantView[]> {
		return this.request("tenants", HttpType.Get);
	}

	async getTenantById(form: TenantId): Promise<TenantView> {
		return this.request(`tenants/${form.tenant_id}`, HttpType.Get);
	}

	async updateTenant(form: TenantId & TenantOptional): Promise<TenantView> {
		return this.request(`tenants/${form.tenant_id}`, HttpType.Put, form);
	}

	protected request<T>(
		endpoint: string,
		type: HttpType,
		body?: object
	): Promise<T> {
		let config: object;
		let url: string;
		const headers = {
			"Content-Type": "application/json",
			"client-id": this.client_id,
		};
		if (body) {
			url = `${this.domain}/auth/v1/${endpoint}`;
			config = {
				body: JSON.stringify(body),
				headers,
				method: type,
			};
		} else {
			url = `${this.domain}/auth/v1/${endpoint}`;
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

function encodeGetParams(p: object): string {
	return Object.entries(p)
		.map((kv) => kv.map(encodeURIComponent).join("="))
		.join("&");
}
