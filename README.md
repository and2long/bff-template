# qunai bff


# develop locally
Need to run postgres and keycloak in docker.
## run postgres
- `docker volume create pg_data`
- `docker run -itd --name postgres  -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -v pg_data:/var/lib/postgresql/data postgres:14.7`
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
--db-url=jdbc:postgresql://172.17.0.2:5432/keycloakdb \
--db-username=postgres \
--db-password=password \
--hostname=localhost
```
## initial db for this project
`npm run setup-database`
## start server
`npm run dev`
