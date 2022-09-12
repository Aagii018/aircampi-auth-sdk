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
}
