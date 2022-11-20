import { createContext, useContext, useReducer, useMemo, useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// config theme
import config from "configs/config";

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
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
    darkMode: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

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
