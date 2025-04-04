import { createSlice } from "@reduxjs/toolkit";

import { sqliteDB } from "../../persistence";
const { getTheme, saveTheme } = sqliteDB(); 

export const themeSlice = createSlice({
    name: "theme", 
    initialState: { darkMode: 0 },
    reducers: {
        toggleTheme: (state) => {
            if (state.darkMode == 0) {
                state.darkMode = 1;
            } else {
                state.darkMode = 0;
            }
            saveTheme(state.darkMode);
        },
        setTheme: (state, action) => {
          state.darkMode = action.payload.darkMode;
        }
    }
})

export const { toggleTheme, setTheme } = themeSlice.actions;

// Cargar el tema al iniciar la aplicación
export const loadThemeFromDB = () => async (dispatch) => {
    try {
      const darkMode = await getTheme();
      dispatch(setTheme(darkMode));
    } catch (error) {

    }
  };

export default themeSlice.reducer;
