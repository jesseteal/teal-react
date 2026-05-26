import APIClient from '../APIClient.js';

describe('APIClient', () => {
  const serverUrl = 'https://api.example.com';
  const headers = { 'Custom-Header': 'value' };
  const token = 'test-token';
  let api: APIClient;

  beforeEach(() => {
    api = new APIClient({ serverUrl, headers });
  });

  test('should initialize with default values', () => {
    expect(api).toBeInstanceOf(APIClient);
    expect((api as any).serverUrl).toBe(serverUrl);
    expect((api as any).headers).toEqual({
      Accept: 'application/json',
      'Custom-Header': 'value',
    });
    expect((api as any).isJson).toBe(true);
  });

  test('should set basic auth token', () => {
    api.SetBasicAuthToken(token);
    expect((api as any).headers['Authorization']).toBe(`Basic ${token}`);
  });

  test('should make a GET request', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      }),
    ) as jest.Mock;

    const response = await api.Get('/test', { data: { param: 'value' } });
    expect(global.fetch).toHaveBeenCalledWith(
      `${serverUrl}/test?param=value`,
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Accept: 'application/json',
          'Custom-Header': 'value',
        }),
      }),
    );
    expect(response).toEqual({ success: true });
  });

  test('should make a POST request with JSON data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      }),
    ) as jest.Mock;

    const response = await api.Post('/test', { data: { key: 'value' } });
    expect(global.fetch).toHaveBeenCalledWith(
      `${serverUrl}/test`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Accept: 'application/json',
          'Custom-Header': 'value',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ key: 'value' }),
      }),
    );
    expect(response).toEqual({ success: true });
  });

  test('should make a POST request with form-data', async () => {
    api = new APIClient({ serverUrl, headers, isJson: false });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      }),
    ) as jest.Mock;

    const formData = new FormData();
    formData.append('key', 'value');

    const response = await api.Post('/test', { data: { key: 'value' } });
    expect(global.fetch).toHaveBeenCalledWith(
      `${serverUrl}/test`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Accept: 'application/json',
          'Custom-Header': 'value',
        }),
        body: expect.any(FormData),
      }),
    );
    expect(response).toEqual({ success: true });
  });
});
