# qunai bff


# develop locally
Need to run postgres and keycloak in docker.
## run postgres
- `docker volume create pg_data`
- `docker run -itd --name postgres  -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -v pg_data:/var/lib/postgresql/data postgres:latest`
## create database `keycloakdb`
create the database if it does not exist.
## run keycloak
```
docker run -itd \
--name keycloak \
-p 8080:8080 \
-e KEYCLOAK_ADMIN=admin \
-e KEYCLOAK_ADMIN_PASSWORD=admin \
quay.io/keycloak/keycloak:latest \
start-dev \
--db=postgres \
--db-url=jdbc:postgresql://host.docker.internal:5432/keycloakdb \
--db-username=postgres \
--db-password=password \
--hostname=localhost
```
## setup keycloak
1. create new realm
2. create new client
3. set Valid redirect URIs: `http://localhost:3001/*` for client
   - `Clients` -> `Client details` -> `Settings` -> `Valid redirect URIs`
4. assign `manage-users` role to client
   - `Clients` -> `Client details` -> `Service accounts roles` -> `Assign role`

## initial db for this project
`npm run setup-database`
## start server
`npm run dev`

# build qunai-bff image
`docker build . -t qunai-bff:0.0.1`

## run qunai-bff container
```
docker run -itd \
--name qunai-bff \
-p 3001:3001 \
-e NODE_ENV=dev \
-e KEYCLOAK_CLIENT_SECRET=REPLACE_ME \
-e DB_HOST=host.docker.internal \
-e KEYCLOAK_HOST=host.docker.internal \
qunai-bff:0.0.1
```