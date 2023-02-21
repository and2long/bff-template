
import session from 'express-session';
import Keycloak from 'keycloak-connect';

const kcConfig = {
  "confidential-port": 0,
  "auth-server-url": "http://localhost:8080/",
  "resource": "qunai-medical",
  "ssl-required": "external",
  "bearer-only": true,
  "realm": "qunai",
  "credentials": {
    "secret": process.env.KEYCLOAK_CLIENT_SECRET
  },
  "policy-enforcer": {}
};
export const memoryStore = new session.MemoryStore();
export const keycloak = new Keycloak({ store: memoryStore }, kcConfig);