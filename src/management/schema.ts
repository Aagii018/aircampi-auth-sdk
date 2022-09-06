export interface ITenant {
	getTenants(): Promise<TenantView[]>;
	createTenant?(form: TenantName & TenantOptional): Promise<TenantView>;
	updateTenant?(form: TenantId & TenantOptional): Promise<TenantView>;
	deleteTenant?(form: TenantId): Promise<TenantView>;
	getTenantById(form: TenantId): Promise<TenantView>;
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
