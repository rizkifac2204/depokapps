import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useMemo,
  useRef,
} from "react";

// action
import * as actionTypes from "store/actions";

const handleMenuOpen = (dispatch, value) =>
  dispatch({ type: actionTypes.MENU_OPEN, value });
const handleDrawerToggle = (dispatch, value) =>
  dispatch({ type: actionTypes.SET_MENU, value });
const handleDarkMode = (dispatch, value) =>
  dispatch({ type: actionTypes.SET_DARK_MODE, value });
const handleFont = (dispatch, value) =>
  dispatch({ type: actionTypes.SET_FONT_FAMILY, value });
const handleBorder = (dispatch, value) =>
  dispatch({ type: actionTypes.SET_BORDER_RADIUS, value });

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      return { ...state, isOpen: [action.value] };
    case actionTypes.SET_DARK_MODE:
      return { ...state, darkMode: action.value };
    case actionTypes.SET_MENU:
      return { ...state, opened: action.value };
    case actionTypes.SET_FONT_FAMILY:
      return { ...state, fontFamily: action.value };
    case actionTypes.SET_BORDER_RADIUS:
      return { ...state, borderRadius: action.value };
    default:
      return state;
  }
}

const RizkiFach = createContext();

const useRizkiContext = () => {
  const context = useContext(RizkiFach);
  return context;
};

const ContextProvider = ({ children }) => {
  const initialState = {
    isOpen: [], // for active default menu
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: 12,
    opened: true,
    darkMode: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      const settingDisplay = localStorage.getItem("settingDisplay");
      if (settingDisplay) {
        const setting = JSON.parse(settingDisplay);
        handleFont(dispatch, setting.fontFamily);
        handleBorder(dispatch, setting.borderRadius);
        handleDarkMode(dispatch, setting.darkMode);
      }
      return;
    }
    localStorage.setItem("settingDisplay", JSON.stringify(state));
  }, [state.darkMode, state.fontFamily, state.borderRadius]);

  return (
    <RizkiFach.Provider value={[state, dispatch]}>
      {children}
    </RizkiFach.Provider>
  );
};

export {
  ContextProvider,
  RizkiFach,
  useRizkiContext,
  handleMenuOpen,
  handleDrawerToggle,
  handleDarkMode,
  handleFont,
  handleBorder,
};
