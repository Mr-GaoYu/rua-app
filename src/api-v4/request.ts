import Axios, { AxiosRequestConfig } from "axios";
import { APIError } from "./types";
import { ObjectSchema, ValidationError } from "yup";

export interface RequestConfig extends AxiosRequestConfig {
  validationErrors?: APIError[];
}

export type ConfigField = "headers" | "data" | "params" | "method" | "url";

export const isEmpty = (v: any) =>
  v === null ||
  v === undefined ||
  v.length === 0 ||
  (typeof v === "object" &&
    Object.keys(v).length === 0 &&
    v.constructor === Object);

export const baseRequest = Axios.create({
  baseURL: "http://localhost:3000",
});

export const setToken = (token: string) => {
  return baseRequest.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });
};

const set = (field: ConfigField, value: any) => (object: any) => {
  return !isEmpty(value) ? { ...object, [field]: value } : object;
};

export const setURL = (url: string) => set("url", url);

export const setMethod = (method: "GET" | "POST" | "PUT" | "DELETE") =>
  set("method", method);

export const setParams = (params: any = {}) => set("params", params);

export const setHeaders = (newHeaders: any = {}) => (object: any) => {
  return !isEmpty(newHeaders)
    ? { ...object, headers: { ...object.headers, ...newHeaders } }
    : object;
};

export const setData = <T extends {}>(
  data: T,

  schema?: ObjectSchema<T>,

  postValidationTransform?: (v: any) => any
) => {
  if (!schema) {
    return set("data", data);
  }

  const updatedData =
    typeof postValidationTransform === "function"
      ? postValidationTransform(data)
      : data;

  try {
    schema.validateSync(data, { abortEarly: false });
    return set("data", updatedData);
  } catch (error) {
    return (object: any) => ({
      ...object,
      data: updatedData,
      validationErrors: convertYupToLinodeErrors(error),
    });
  }
};

const convertYupToLinodeErrors = (
  validationError: ValidationError
): APIError[] => {
  const { inner } = validationError;

  /** If aggregate errors */
  if (inner && inner.length > 0) {
    return inner.reduce((result: APIError[], innerValidationError) => {
      const err = convertYupToLinodeErrors(innerValidationError);
      return Array.isArray(err) ? [...result, ...err] : [...result, err];
    }, []);
  }

  /** If single error.  */
  return [mapYupToLinodeAPIError(validationError)];
};

const mapYupToLinodeAPIError = ({
  message,
  path,
}: ValidationError): APIError => ({
  reason: message,
  ...(path && { field: path }),
});

const reduceRequestConfig = (...fns: Function[]): RequestConfig =>
  fns.reduceRight((result, fn) => fn(result), {
    url: "http://localhost:3000",
    headers: {},
  });

export const requestGenerator = <T>(...fns: Function[]): Promise<T> => {
  const config = reduceRequestConfig(...fns);
  if (config.validationErrors) {
    return Promise.reject(config.validationErrors);
  }
  return baseRequest(config).then((response) => response.data);
};

export default requestGenerator;
