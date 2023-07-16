export const initialState = {
  stored: false,
  entries: [],
};

interface ActionInterface {
  type: string;
  value: any;
}

export const AppReducer = (state: Object, action: ActionInterface) => {
  switch (action.type) {
    case 'init_stored': {
      return action.value;
    }
    case 'setStored': {
      return {
        ...state,
        stored: action.value,
      };
    }
    case 'setEntries': {
      return {
        ...state,
        entries: action.value,
      };
    }
    default:
      return state;
  }
};
