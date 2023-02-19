
import session from 'express-session';
import Keycloak from 'keycloak-connect';

const kcConfig = {
  "realm": "qunai",
  "auth-server-url": "http://localhost:8080/",
  "ssl-required": "external",
  "resource": "qunai-medical",
  "verify-token-audience": true,
  "credentials": {
    "secret": process.env.KEYCLOAK_CLIENT_SECRET
  },
  "confidential-port": 0,
  "policy-enforcer": {}
};
export const memoryStore = new session.MemoryStore();
export const keycloak = new Keycloak({ store: memoryStore }, kcConfig);