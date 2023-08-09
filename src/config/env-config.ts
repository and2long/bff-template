import { get } from "lodash";


class EnvConfig {

  public get nodeEnv(): string {
    return get(process.env, "NODE_ENV", "development");
  }

  public get keycloakClientSecret(): string {
    return get(process.env, "KEYCLOAK_CLIENT_SECRET", "");
  }

  public get keycloakRealm(): string {
    return get(process.env, "KEYCLOAK_REALM", "");
  }

  public get keycloakClientId(): string {
    return get(process.env, "KEYCLOAK_CLIENT_ID", "");
  }

  public get keycloakHost(): string {
    return get(process.env, "KEYCLOAK_HOST", "localhost");
  }
}

export default new EnvConfig();