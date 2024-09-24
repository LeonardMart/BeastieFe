import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

export interface IResponse {
    data: any[],
    status: string | number;
    message: string;
}
export const useHttp = ({ url, method, body = null, params = null, headers = null, baseUrl = '' }
    : {
        url: string, method: 'post' | 'get' | 'put' | 'del',
        params?: any, body?: any, headers?: any, baseUrl?: string
    }) => {

    const [response, setResponse] = useState<IResponse>();
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const authorization = axios.defaults.headers.common.Authorization;
    useEffect(() => {
        const controller = new AbortController();
        const Authorization = axios.defaults.headers.common.Authorization;
        axios.request({
            baseURL: baseUrl,
            url: url,
            timeout: 0,
            headers: {
                ...headers, Authorization
            },
            method: method,
            params: params,
            data: body,
            signal: controller.signal
        }).then((res: AxiosResponse) => {
            setResponse(res.data);
        }).catch((err: any) => {
            setError(err);
        }).finally(() => {
            setloading(false);
        });

        return () => {
            controller.abort();
        };
    }, [method, url, body, headers, params, authorization]);

    return { response, error, loading };
};

