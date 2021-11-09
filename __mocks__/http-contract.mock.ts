import HttpContract, {
  HttpResponseContract,
} from "@domain/contracts/http.contract";

export const httpMock = (
  success?: HttpResponseContract,
  delay?: number
): HttpContract => ({
  get: (path: string, headers?: object): Promise<HttpResponseContract> =>
    delay
      ? new Promise((resolve) =>
          setTimeout(
            () =>
              resolve(success || { data: {}, status: 200, error: undefined }),
            delay || 0
          )
        )
      : Promise.resolve(success || { data: {}, status: 200, error: undefined }),
  post: (path: string, headers?: object): Promise<HttpResponseContract> =>
    delay
      ? new Promise((resolve) =>
          setTimeout(
            () =>
              resolve(success || { data: {}, status: 200, error: undefined }),
            delay || 0
          )
        )
      : Promise.resolve(success || { data: {}, status: 200, error: undefined }),
});

type errorObj = {
  statusCode: number;
  message?: any;
  [key: string]: string | number;
};
export const errorhttpMock = (
  error: errorObj,
  statusCode: number = 409,
  delay?: number
): HttpContract => ({
  get: (path: string, headers?: object): Promise<HttpResponseContract> =>
    delay
      ? new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({ data: undefined, status: Number(statusCode), error }),
            delay
          )
        )
      : Promise.resolve({ data: undefined, status: Number(statusCode), error }),
  post: (path: string, headers?: object): Promise<HttpResponseContract> =>
    delay
      ? new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({ data: undefined, status: Number(statusCode), error }),
            delay
          )
        )
      : Promise.resolve({ data: undefined, status: Number(statusCode), error }),
});
