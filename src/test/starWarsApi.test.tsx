import { FC } from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { starWarsApi } from '../component/api/starWarsApiSlice';
import { useGetEntityDetailsQuery, useSearchEntitiesQuery } from '../component/api/starWarsApiSlice';

const TestComponent: FC<{ root: string; id: string }> = ({root, id}) => {
  const { data, error, isLoading } = useGetEntityDetailsQuery({root, id});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return <div>{data ? data.name : 'No data'}</div>;
};

const TestComponent1: FC<{ root: string; search: string, page: string}> = ({root, search, page}) => {
  const { data, error, isLoading } = useSearchEntitiesQuery({root, search, page});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return <div>{`${data}`}</div>;
};

const store = configureStore({
  reducer: {
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

test('getEntityDetails returns data', async () => {
  render(
    <Provider store={store}>
      <TestComponent root="people" id="1" />
    </Provider>
  );

  expect(await screen.findByText('Error!')).toBeTruthy();
});

test('SearchEntitiesQuery returns data', async () => {
  render(
    <Provider store={store}>
      <TestComponent1 root="people" search="a" page="1"/>
    </Provider>
  );

  expect(await screen.findByText('Error!')).toBeTruthy();
});