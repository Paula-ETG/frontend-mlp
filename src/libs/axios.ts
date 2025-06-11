import Axios, { type InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    urlParams?: Record<string, string>;
  }
}

const TOKEN_KEY = "journey_ai_access_token";

export const api = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Add authorization header if token exists
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

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
