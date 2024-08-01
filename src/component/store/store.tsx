import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultType } from "../api/dataInterface";
import { starWarsApi } from "../api/starWarsApiSlice";

const initialState: ResultType[] = [];

const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<ResultType>) => {
      state.push(action.payload);
    },
    removeElement: (state, action: PayloadAction<ResultType>) => {
      state.forEach((elem, index) => {
        const idElement = action.payload.url?.split("/");
        if (idElement) {
          if (
            elem.url?.includes(
              `${idElement[idElement.length - 2]}/${idElement[idElement.length - 1]}`
            )
          ) {
            state.splice(index, 1);
          }
        }
      });
    },
    removeAll: () => {
      return initialState;
    },
  },
});

export const { addElement, removeElement, removeAll } = elementsSlice.actions;

export const store = configureStore({
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
