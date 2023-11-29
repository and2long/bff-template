# dpzs bff

# Setup
## 1. Run keycloak on Docker
- Run command `docker-compose -f docker-compose-keycloak.yml up`

## 2. Configure Keycloak
- create new realm named `myrealm`
- create new client with Client ID: `myrealm-app1`, and enable `Client authentication` and `Service accounts roles`
- set `Valid redirect URIs`: `http://localhost:3000/*`
- Find `KEYCLOAK_CLIENT_SECRET` value in client adaptor config and set environment variable.

### 2.1 Enable logging user events
`Realm settings` -> `Events` -> `User event settings` -> enable `Save events` and `Save`

### 2.2 Assign `manage-users` role
`Clients` -> `myrealm-app1` -> `Service accounts roles` -> `Assign role` -> `Filter by clients` -> find `manage-realm` and enable it

## 3. Configure environment variables
- create `.envrc` file from `.envrc.template` file
- replace some necessary values

## 4. Make environment variables effective
- `source .envrc`


# Start & Run 
1. Install deps
- `yarn`

2. Init Database
- `yarn setup-database`

3. Start
- `yarn dev`
