import { createStore } from 'redux';

const TOGGLE_THEME = 'TOGGLE_THEME';

const savedDarkMode = localStorage.getItem('darkMode') === 'true';
const initialState = {
  isDarkMode: savedDarkMode,
};

export const toggleTheme = () => ({ type: TOGGLE_THEME });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      const newIsDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', newIsDarkMode);
      return {
        ...state,
        isDarkMode: newIsDarkMode,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;