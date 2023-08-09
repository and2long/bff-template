# dpzs bff

# Setup
1. Run keycloak on Docker
Run command `docker-compose -f docker-compose-keycloak.yml up`

2. Config Keycloak
- create new realm named `qunai`
- create new client with Client ID: `qunai-medical`, and enable `Client authentication`
- set `Valid redirect URIs`: `http://localhost:3000/*`
- Find `KEYCLOAK_CLIENT_SECRET` value in client adaptor config and set environment variable.

3. Make environment variables effective
`source .envrc`

4. Install deps
`yarn`

3. Init Database
`yarn setup-database`

4. Start
`yarn dev`