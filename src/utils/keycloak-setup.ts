import session from "express-session";
import Keycloak, { KeycloakConfig } from "keycloak-connect";
import envConfig from "../config/env-config";

export const KEYCLOAK_BASE_URL = `http://${envConfig.keycloakHost}:8080`;

const kcConfig: KeycloakConfig = {
  "realm": envConfig.keycloakRealm,
  "auth-server-url": KEYCLOAK_BASE_URL,
  "ssl-required": "external",
  "resource": envConfig.keycloakClientId,
  // "verify-token-audience": false,
  // "credentials": {
  //   "secret": envConfig.keycloakClientSecret
  // },
  "confidential-port": 0,
  // "policy-enforcer": {},
  "bearer-only": true
};

export const memoryStore = new session.MemoryStore();
export const keycloak = new Keycloak({ store: memoryStore }, kcConfig);
