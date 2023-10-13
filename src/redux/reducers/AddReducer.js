const {ADD_DATA, DELET_DATA, LIKE} = require('../type');

const INITIAL_VALUE = {
  Data: [],
};

console.log();

export const UserReducer = (state = INITIAL_VALUE, action) => {
  console.log('action', action.payload);
  switch (action.type) {
    case ADD_DATA:
      return {...state, Data: [...state.Data, action?.payload]};

    case DELET_DATA:
      return {...state, Data: [...state.Data, action?.payload]};

    case LIKE:
      return {
        ...state,
        Data: state.Data.map(i => {
          if (i.id === action?.payload.id) {
            return {
              ...state,
              Data: [...state.Data],
            };
          } else {
            return i;
          }
        }),
      };
    default:
      return state;
  }
};
