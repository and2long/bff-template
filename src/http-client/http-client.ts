import axios, { AxiosInstance } from "axios";
import { KEYCLOAK_BASE_URL } from "../utils/keycloak-setup";

export const keycloakApiClient: AxiosInstance = axios.create(
  {
    baseURL: KEYCLOAK_BASE_URL,
    timeout: 1000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }
);

keycloakApiClient.interceptors.request.use(request => {
  console.log('API Request', request.method, request.url);
  return request;
})

keycloakApiClient.interceptors.response.use(response => {
  const request = response.request;
  console.log('API Response', request.method, request.path, `Status: ${response.status}`);
  return response;
}, error => {
  console.log('API Error', error.request.method, error.request.path, `Status: ${error.response.status} ${error.response.statusText}`);
  return Promise.reject(error);
})
