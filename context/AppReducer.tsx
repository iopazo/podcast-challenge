export const initialState = {
  stored: false,
  entries: [],
  selectedArtist: null,
  selectedEpisode: null,
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
    case 'setSelectedArtist': {
      return {
        ...state,
        selectedArtist: action.value,
      };
    }
    case 'setSelectedEpisode': {
      return {
        ...state,
        selectedEpisode: action.value,
      };
    }
    default:
      return state;
  }
};
