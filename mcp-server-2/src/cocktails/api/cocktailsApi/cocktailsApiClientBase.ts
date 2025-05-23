/* tslint:disable */
/* eslint-disable */
// import { getAccessToken } from '../../utils/authConfig';
// import { getWindowEnv } from '../../utils/envConfig';
// import logger from '../../services/Logger';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isCocktailsApiClientException = true;

    static isCocktailsApiClientException(obj: any) {
        return obj.isCocktailsApiClientException === true;
    }
}

export class CocktailsApiClientBase {

    private requiredScopes: string[] = [];

    public setRequiredScopes = (scopes: string[]) => {
        this.requiredScopes = scopes;
    }

    async transformOptions(options: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        // const token = this.requiredScopes && this.requiredScopes.length > 0
        //     ? await getAccessToken(this.requiredScopes)
        //     : undefined;

        //const authHeader = token && { 'Authorization': `Bearer ${token}` } ??
        options.headers = {
            ...options.headers,
            'X-Key': ``
        };

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

    protected transformResult(_url: string, response: AxiosResponse, processor: (response: AxiosResponse) => any) {
        try {
            return processor(response);
        } catch (e: unknown) {
            //logger.logException({ exception: e as Error });
            throw e;
        }
    }

    protected getBaseUrl(_s: string): string {
        return `https://api.cezzis.com/prd/cocktails`;
    }

    private throwEx(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
        if (result !== null && result !== undefined)
            throw result;
        else
            throw new ApiException(message, status, response, headers, null);
    }
}
