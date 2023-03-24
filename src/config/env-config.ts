import { get } from "lodash";

class EnvConfig {
  public get nodeEnv(): string {
    return get(process.env, "NODE_ENV", "development");
  }

  public get keycloakClientSecret(): string {
    return get(process.env, "KEYCLOAK_CLIENT_SECRET", "");
  }
}

export default new EnvConfig();