import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StarWarsEntity } from '../api/dataInterface';
import { starWarsApi } from '../api/starWarsApiSlice';

const initialState: StarWarsEntity[] = [];

const elementsSlice = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<StarWarsEntity>) => {
      state.push(action.payload);
    }
  }
});

export const { addElement } = elementsSlice.actions;

const store = configureStore({
  reducer: {
    elements: elementsSlice.reducer,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;