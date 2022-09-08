export interface ITenant {
	getTenants(): Promise<TenantView[]>;
	createTenant?(body: TenantName & TenantOptional): Promise<TenantView>;
	updateTenant?(tenant_id: string, body: TenantOptional): Promise<TenantView>;
	deleteTenant?(tenant_id: string): Promise<TenantView>;
	getTenantById(tenant_id: string): Promise<TenantView>;
}

export type TenantView = {
	tenant_id: string;
	tenant_name: string;
	tenant_description: string;
	tenant_metadata: object;
	app_metadata: object[];
	default: boolean;
	created_at: string;
	updated_at: string;
	aggregations: object;
	admins: object[];
	identity_providers: object[];
};

export type TenantId = {
	tenant_id: string;
};

type TenantName = {
	tenant_name: string;
};

export type TenantOptional = {
	tenant_name?: string;
	tenant_description?: string;
	tenant_metadata?: object;
	app_metadata?: object[];
};
