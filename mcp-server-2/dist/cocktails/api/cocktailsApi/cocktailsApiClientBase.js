import { config } from "../../../config.js";
export class ApiException extends Error {
    constructor(message, status, response, headers, result) {
        super();
        this.isCocktailsApiClientException = true;
        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }
    static isCocktailsApiClientException(obj) {
        return obj.isCocktailsApiClientException === true;
    }
}
export class CocktailsApiClientBase {
    constructor() {
        this.requiredScopes = [];
        this.setRequiredScopes = (scopes) => {
            this.requiredScopes = scopes;
        };
    }
    async transformOptions(options) {
        // const token = this.requiredScopes && this.requiredScopes.length > 0
        //     ? await getAccessToken(this.requiredScopes)
        //     : undefined;
        //const authHeader = token && { 'Authorization': `Bearer ${token}` } ??
        options.headers = {
            ...options.headers,
            'X-Key': config.api.subscriptionKey,
        };
        options.baseURL = this.getBaseUrl();
        options.transformResponse = (data) => data;
        // if (token) {
        //     options.headers = {
        //         'Authorization': `Bearer ${token}`,
        //         ...options.headers
        //     };
        // }
        // options.credentials = 'same-origin';
        // options.redirect = 'error';
        // options..mode = 'cors';
        return Promise.resolve(options);
    }
    transformResult(_url, response, processor) {
        try {
            return processor(response);
        }
        catch (e) {
            //logger.logException({ exception: e as Error });
            throw e;
        }
    }
    getBaseUrl() {
        return config.api.baseUrl;
    }
    throwEx(message, status, response, headers, result) {
        if (result !== null && result !== undefined)
            throw result;
        else
            throw new ApiException(message, status, response, headers, null);
    }
}
