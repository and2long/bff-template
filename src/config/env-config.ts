import { get } from "lodash";

class EnvConfig {
  public get nodeEnv(): String {
    return get(process.env, "NODE_ENV", "dev");
  }

  public get keycloakClientSecret(): String {
    return get(process.env, "KEYCLOAK_CLIENT_SECRET", "");
  }
}

export default new EnvConfig();