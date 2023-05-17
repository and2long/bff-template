#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 -U postgres keycloakdb <<-EOSQL
    CREATE DATABASE qunai;
EOSQL