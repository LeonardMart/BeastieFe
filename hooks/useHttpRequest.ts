import {useRef, useState} from 'react';
import axios, { AxiosResponse } from 'axios';

export interface IResponse {
  data: any;
  status: string | number;
  message: string;
}

export const useHttpRequest = (baseHttpUrl?: string) => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const controller = useRef<AbortController>(new AbortController());

  const sendRequest = async ({
    url,
    method,
    body = null,
    params = null,
    baseUrl = '',
  }: {
    url: string;
    method: 'post' | 'get' | 'put' | 'delete';
    params?: any;
    body?: any;
    baseUrl?: string;
  }) => {
    setLoading(true);
    setProgress(0);

    controller.current = new AbortController()
    let response : AxiosResponse<any, any> | null = null
    try {
        response = await axios.request({
            baseURL: baseHttpUrl?baseHttpUrl:baseUrl,
            url: url,
            timeout: 0,
            method:method,
            params: params,
            data:body,
            signal: controller.current.signal,
            // onUploadProgress:(event)=>{
            //     setProgress(event.loaded/event.total)
            // }
        })
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
    return response?.data as IResponse;
  };

  return {sendRequest, error, loading, progress};
};
