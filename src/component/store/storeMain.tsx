// import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { StarWarsEntity } from '../api/dataInterface';

// export interface RootState {
//   elements: StarWarsEntity[];
// }

// const initialState: StarWarsEntity[] = [];

// const elementsSlice = createSlice({
//   name: 'elements',
//   initialState,
//   reducers: {
//     addElement: (state, action: PayloadAction<StarWarsEntity>) => {
//       state.push(action.payload);
//     }
//   }
// });

// export const { addElement } = elementsSlice.actions;

// const storeElements = configureStore({
//   reducer: {
//     elements: elementsSlice.reducer
//   }
// });

// export type AppDispatch = typeof storeElements.dispatch;

// export { storeElements };