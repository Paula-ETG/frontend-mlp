import Axios, { type InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    urlParams?: Record<string, string>;
  }
}

export const api = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!config.url) {
    return config;
  }

  if ("urlParams" in config) {
    if (config.urlParams === undefined) {
      return config;
    }

    const urlArray = config.url.split("/");
    Object.entries(config.urlParams).forEach(([v, k]) => {
      const index = urlArray.indexOf(v);
      urlArray[index] = k;
    });
    const newUrl = urlArray.join("/");

    return {
      ...config,
      url: newUrl,
    };
  }

  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);
