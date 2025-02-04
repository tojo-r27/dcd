import type { AuthModel } from "~/models/auth.model";
import { createApiClient } from "~/services/api";

export class AuthController {
    private api = createApiClient();

    async login(param: AuthModel): Promise<any> {
        const res = await this.api.login(param)
        return res;
    }
}
