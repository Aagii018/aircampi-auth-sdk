import { HttpType } from "../global";
import { Base } from ".";
import { IUser, TenantView, UserData, Users } from "./schema";

export class User extends Base implements IUser {
	async getUsers(): Promise<Users> {
		return this.request("users", HttpType.Get);
	}

	async createUser(body: { username: string } & UserData): Promise<TenantView> {
		return this.request("users", HttpType.Post, body);
	}
	
async updateUser(user_id: string, body: UserData): Promise<TenantView> {
	return this.request(`users/${user_id}`, HttpType.Put, (body=body)); 
}

async deleteUser(user_id: string): Promise<TenantView> {
	return this.request(`user/${user_id}`, HttpType.Delete);
}
	
}
