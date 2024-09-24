import { useHttp } from './useHttp';

export const useHttpChat = ({ url, method, body = null, params = null, headers = null }
    : {
        url: string, method: 'post' | 'get' | 'put' | 'del',
        params?: any, body?: any, headers?: any
    }) => {
    const baseUrl = String(process.env.REACT_APP_CHAT_SERVICE);
    return {
        ...useHttp({
            baseUrl,
            url, method, body, params, headers
        }),
        chatBaseUrl: baseUrl
    };
};

