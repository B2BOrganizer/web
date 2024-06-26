import simpleRestProvider from "ra-data-simple-rest";
import inMemoryJWT from 'ra-in-memory-jwt';
import { fetchUtils } from 'ra-core';

const httpClient = (url, options = {}) => {
    options.headers = new Headers({ Accept: 'application/json', 'Content-Type': 'application/json+simpleRestProvider' });

    // const options = {
    //     headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json+simpleRestProvider' }),
    // };

    const token = inMemoryJWT.getToken();
    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }

    return fetchUtils.fetchJson(url, options);
};

const baseDataProvider = simpleRestProvider(import.meta.env.VITE_SIMPLE_REST_URL, httpClient);

export const dataProvider = {
    ...baseDataProvider,
    downloadOne: (resource, params) =>
        httpClient(`${baseDataProvider.apiUrl}${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    banUser: (userId) => {
        return fetch(`/api/user/${userId}/ban`, { method: 'POST' })
            .then(response => response.json());
    },
}
