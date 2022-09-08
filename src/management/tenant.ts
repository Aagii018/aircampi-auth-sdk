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

	async getTenantById(tenant_id: string): Promise<TenantView> {
		return this.request(`tenants/${tenant_id}`, HttpType.Get);
	}

	async updateTenant(
		tenant_id: string,
		body: TenantOptional
	): Promise<TenantView> {
		return this.request(`tenants/${tenant_id}`, HttpType.Put, body);
	}

	async createTenant(
		body: { tenant_name: string } & TenantOptional
	): Promise<TenantView> {
		return this.request("tenants", HttpType.Post, body);
	}

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

// function encodeGetParams(p: object): string {
// 	return Object.entries(p)
// 		.map((kv) => kv.map(encodeURIComponent).join("="))
// 		.join("&");
// }
