
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import envConfig from '../config/env-config';

export const KEYCLOAK_REALM = "qunai";
export const KEYCLOAK_CLIENT_ID = "qunai-medical";
export const KEYCLOAK_BASE_URL = "http://127.0.0.1:8080";

const kcConfig = {
  "confidential-port": 0,
  "auth-server-url": KEYCLOAK_BASE_URL,
  "resource": KEYCLOAK_CLIENT_ID,
  "ssl-required": "external",
  "bearer-only": true,
  "realm": KEYCLOAK_REALM,
  "credentials": {
    "secret": envConfig.keycloakClientSecret
  },
  "policy-enforcer": {}
};
export const memoryStore = new session.MemoryStore();
export const keycloak = new Keycloak({ store: memoryStore }, kcConfig);
