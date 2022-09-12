export interface ITenant {
	getTenants(): Promise<Tenants>;
	createTenant(body: { tenant_name: string } & TenantData): Promise<TenantView>;
	updateTenant(tenant_id: string, body: TenantData): Promise<TenantView>;
	deleteTenant(tenant_id: string): Promise<TenantView>;
	getTenantById(tenant_id: string): Promise<TenantView>;
}

export interface IUser {
	getUsers(): Promise<Users>;
	createUser(body: { username: string } & UserData): Promise<TenantView>;
	updateUser?(user_id: string, body: UserData): Promise<TenantView>;
	deleteUser?(user_id: string): Promise<TenantView>;
	getUserById?(user_id: string): Promise<UserView>;
}

export type Tenants = {
	count: number;
	has_more: false;
	limit: number;
	offset: number;
	items: TenantView[];
};

export type Users = {
	count: number;
	has_more: false;
	limit: number;
	offset: number;
	items: UserView[];
};

export type UserView = {
	id: string;
	username: string;
	email: string;
	email_verified: boolean;
	phone: string;
	phone_verified: boolean;
	nickname: string;
	firstname: string;
	middlename: string;
	lastname: string;
	familyname: string;
	fullname: string;
	picture: string;
	profile: string;
	website: string;
	gender: string;
	birthday: string;
	zoneinfo: string;
	locale: string;
	address: object;
	user_metadata: object;
	app_metadata: object;
	is_blocked: boolean;
	is_admin: boolean;
	is_invited: boolean;
	invited_at: string;
	created_at: string;
	updated_at: string;
};

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

export type TenantData = {
	tenant_name?: string;
	tenant_description?: string;
	tenant_metadata?: object;
	app_metadata?: object[];
};

export type UserData = {
	username?: string;
	email?: string;
	email_verified?: boolean;
	phone?: string;
	phone_verified?: boolean;
	nickname?: string;
	firstname?: string;
	middlename?: string;
	lastname?: string;
	familyname?: string;
	fullname?: string;
	picture?: string;
	profile?: string;
	website?: string;
	gender?: string;
	birthday?: string;
	zoneinfo?: string;
	locale?: string;
	address?: object;
	user_metadata?: object;
	app_metadata?: object;
	invited_at?: string;
};
