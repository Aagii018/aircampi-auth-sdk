import { ITenant, TenantView, TenantData, Tenants } from "./schema";
import { HttpType } from "../global";
import { Base } from ".";

export class Tenant extends Base implements ITenant {
	async getTenants(): Promise<Tenants> {
		return this.request("tenants", HttpType.Get);
	}

	async getTenantById(tenant_id: string): Promise<TenantView> {
		return this.request(`tenants/${tenant_id}`, HttpType.Get);
	}

	async updateTenant(tenant_id: string, body: TenantData): Promise<TenantView> {
		return this.request(`tenants/${tenant_id}`, HttpType.Put, (body = body));
	}

	async createTenant(
		body: { tenant_name: string } & TenantData
	): Promise<TenantView> {
		return this.request("tenants", HttpType.Post, (body = body));
	}

	async deleteTenant(tenant_id: string): Promise<TenantView> {
		return this.request(`tenants/${tenant_id}`, HttpType.Delete);
	}
}
