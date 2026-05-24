/**
 * const api = new APIClient({
 *    serverUrl: '',
 *    headers: { <optional headers> },
 *    isJson: <bool, default true> // sending data format json | form-data
 * })
 */
export interface APIClientOptions {
  serverUrl: string;
  headers?: Record<string, string>;
  isJson?: boolean;
}

export type RequestData = Record<string, any>;

export interface RequestOptions {
  data?: RequestData;
  headers?: Record<string, string>;
}

class APIClient {
  private serverUrl: string;
  private headers: Record<string, string>;
  private isJson: boolean;

  constructor(options: APIClientOptions) {
    this.serverUrl = options.serverUrl;
    this.headers = { Accept: 'application/json', ...(options.headers || {}) };
    this.isJson = options.isJson ?? true;
  }

  async Get<T = unknown>(endpoint: string, options?: RequestOptions) {
    return this.get<T>(endpoint, options);
  }

  async Post<T = unknown>(endpoint: string, options?: RequestOptions) {
    return this.post<T>(endpoint, options);
  }

  SetBasicAuthToken(token: string) {
    this.setBasicAuthToken(token);
  }

  setBasicAuthToken(token: string) {
    this.headers['Authorization'] = `Basic ${token}`;
  }

  async get<T = unknown>(endpoint: string, options?: RequestOptions) {
    return this.request<T>({
      method: 'GET',
      endpoint,
      data: options?.data,
      headers: options?.headers,
    });
  }

  async post<T = unknown>(endpoint: string, options?: RequestOptions) {
    return this.request<T>({
      method: 'POST',
      endpoint,
      data: options?.data,
      headers: options?.headers,
    });
  }

  private buildUrl(endpoint: string, data?: RequestData) {
    const url = new URL(endpoint, this.serverUrl);
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      }
    }
    return url.toString();
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    if (response.ok === false) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const contentType = response.headers?.get?.('content-type') || '';
    if (!contentType || contentType.includes('application/json')) {
      return response.json() as Promise<T>;
    }

    return response.text() as Promise<T>;
  }

  private async request<T = unknown>({
    method,
    endpoint,
    data,
    headers,
  }: {
    method: 'GET' | 'POST';
    endpoint: string;
    data?: RequestData;
    headers?: Record<string, string>;
  }): Promise<T> {
    let body: BodyInit | undefined;
    const _headers = { ...this.headers, ...headers };
    const url =
      method === 'GET'
        ? this.buildUrl(endpoint, data)
        : this.buildUrl(endpoint);

    if (method === 'POST') {
      if (this.isJson) {
        body = JSON.stringify(data);
        _headers['Content-Type'] = 'application/json';
      } else {
        body = new FormData();
        for (const [key, value] of Object.entries(data || {})) {
          if (value !== undefined && value !== null) {
            body.append(key, value);
          }
        }
      }
    }

    const response = await fetch(url, {
      method,
      headers: _headers,
      body,
    });
    return this.parseResponse<T>(response);
  }
}

export default APIClient;
