import { get } from "lodash";

class EnvConfig {

  public get keycloakClientSecret(): string {
    return get(process.env, "KEYCLOAK_CLIENT_SECRET", "");
  }
}

export default new EnvConfig();