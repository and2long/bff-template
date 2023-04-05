import session from "express-session";
import Keycloak from "keycloak-connect";
import envConfig from "../config/env-config";

export const KEYCLOAK_REALM = "qunai";
export const KEYCLOAK_CLIENT_ID = "qunai-medical";
export const KEYCLOAK_BASE_URL = `http://${process.env.KEYCLOAK_HOST}:8080`;

const kcConfig = {
  "realm": KEYCLOAK_REALM,
  "auth-server-url": KEYCLOAK_BASE_URL,
  "ssl-required": "external",
  "resource": KEYCLOAK_CLIENT_ID,
  "verify-token-audience": false,
  "credentials": {
    "secret": envConfig.keycloakClientSecret
  },
  "confidential-port": 0,
  "policy-enforcer": {},
  "bearer-only": true
};

export const memoryStore = new session.MemoryStore();
export const keycloak = new Keycloak({ store: memoryStore }, kcConfig);
