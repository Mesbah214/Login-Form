export const emailReducer = (state, action) => {
  switch (action.type) {
    case "on_change": {
      return {
        ...state,
        value: action.value,
        isValid: action.value.includes("@"),
      };
    }

    case "on_blur": {
      return {
        ...state,
        isValid: state.value.includes("@"),
      };
    }
  }
  return {
    value: "",
    isValid: false,
  };
};

export const passwordReducer = (state, action) => {
  switch (action.type) {
    case "on_change": {
      return {
        ...state,
        value: action.value,
        isValid: action.value.trim().length > 6,
      };
    }

    case "on_blur": {
      return {
        ...state,
        isValid: state.value.trim().length > 6,
      };
    }
  }
  return { value: "", isValid: false };
};