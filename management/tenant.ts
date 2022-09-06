import { ITenant, TenantView, TenantId, TenantOptional } from "./schema";

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
		return this.request(`tenants/${form.tenant_id}`, {
			method: "PUT",
			body: JSON.stringify(form),
		});
	}

	protected request<T>(endpoint: string, options?: RequestInit): Promise<T> {
		const url = `${this.domain}/auth/v1/${endpoint}/${encodeGetParams(
			<RequestInit>options?.body
		)}`;
		const headers = {
			"Content-Type": "application/json",
			"client-id": this.client_id,
		};
		const config = {
			...options,
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

function encodeGetParams(p: object): string {
	return Object.entries(p)
		.map((kv) => kv.map(encodeURIComponent).join("="))
		.join("&");
}
