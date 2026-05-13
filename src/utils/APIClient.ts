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

export interface RequestOptions {
  data?: Record<string, any>;
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

  async Get(endpoint: string, options?: RequestOptions) {
    return await this.pull({
      method: 'GET',
      endpoint,
      data: options?.data,
      headers: options?.headers,
    });
  }

  async Post(endpoint: string, options?: RequestOptions) {
    return await this.pull({
      method: 'POST',
      endpoint,
      data: options?.data,
      headers: options?.headers,
    });
  }

  SetBasicAuthToken(token: string) {
    this.headers['Authorization'] = `Basic ${token}`;
  }

  private async pull({
    method,
    endpoint,
    data,
    headers,
  }: {
    method: 'GET' | 'POST';
    endpoint: string;
    data?: Record<string, any>;
    headers?: Record<string, string>;
  }) {
    let body: any;
    let _headers = { ...this.headers, ...headers };
    let appendToUrl = endpoint;

    if (method === 'POST') {
      if (this.isJson) {
        body = JSON.stringify(data);
        _headers['Content-Type'] = 'application/json';
      } else {
        body = new FormData();
        for (const t in data) {
          if (data.hasOwnProperty(t)) {
            body.append(t, data[t]);
          }
        }
      }
    } else if (method === 'GET' && data) {
      appendToUrl += '?';
      const qs = [];
      for (const t in data) {
        if (data.hasOwnProperty(t)) {
          qs.push(`${t}=${data[t]}`);
        }
      }
      appendToUrl += qs.join('&');
    }
    const fetch_url = this.serverUrl + appendToUrl;
    return await fetch(fetch_url, {
      method,
      headers: _headers,
      body,
    })
      .then((r) => r.json?.() || r)
      .catch((apiError) => console.error({ apiError }));
  }
}

export default APIClient;
