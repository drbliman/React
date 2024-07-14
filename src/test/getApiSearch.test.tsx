import { getApiSearch } from '../component/api/getApiSearch';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('getApiSearch function', () => {
  it('should fetch data without 404 error details', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    const result = await getApiSearch('people', '1', 'details');

    expect(result).toBeDefined();
  });

  it('should fetch data without 404 error search', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    const result = await getApiSearch('a', '1', 'search');

    expect(result).toBeDefined();
  });
});