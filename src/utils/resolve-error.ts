import { AxiosError } from "axios";

export const resolveAxiosError = (error: Error): string | undefined => {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data?.detail;
    return responseData;
  }
  return undefined;
};
