import { ITenant, TenantView, TenantId, TenantOptional } from "./schema";

enum HttpType {
	Get = "GET",
	Post = "POST",
	Put = "PUT",
	Delete = "DELETE",
}

export class Tenant implements ITenant {
	constructor(private client_id: string, private domain: string) {
		console.log("Working 2");
	}

	async getTenants(): Promise<TenantView[]> {
		return this.request("tenants");
	}

	async getTenantById(form: TenantId): Promise<TenantView> {
		return this.request(`tenants/${form.tenant_id}`);
	}

	async updateTenant(form: TenantId & TenantOptional): Promise<TenantView> {
		return this.request(`tenants/${form.tenant_id}`, HttpType.Post, form);
	}

	protected request<T>(
		endpoint: string,
		type?: HttpType,
		body?: object
	): Promise<T> {
		let url: string;
		if (body) {
			// url = `${this.domain}/auth/v1/${endpoint}/${encodeGetParams(body!)}`;
		} else {
			url = `${this.domain}/auth/v1/${endpoint}`;
		}

		const headers = {
			"Content-Type": "application/json",
			"client-id": this.client_id,
		};
		const config = {
			method: type,
			body: JSON.stringify(body),
			headers,
		};

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
