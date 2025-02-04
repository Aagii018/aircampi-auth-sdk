import { IResource, ResourceData, ResourceView, Resources } from "./schema";
import { HttpType } from "../global";
import { Base } from ".";

export class Resource extends Base implements IResource {
	async getResources(): Promise<Resources> {
		return this.request("resources", HttpType.Get);
	}

	async getResourceById(resource_id: string): Promise<ResourceView> {
		return this.request(`resources/${resource_id}`, HttpType.Get);
	}

	async updateResource(
		resource_id: string,
		body: ResourceData
	): Promise<ResourceView> {
		return this.request(
			`resources/${resource_id}`,
			HttpType.Put,
			(body = body)
		);
	}

	async createResources(body: {
		resource_name: string;
		resource_description: string;
		resource_type: string;
	}): Promise<ResourceView> {
		return this.request("resources", HttpType.Post, (body = body));
	}

	async deleteResource(resource_id: string): Promise<ResourceView> {
		return this.request(`resources/${resource_id}`, HttpType.Delete);
	}
}
