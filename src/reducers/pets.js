const INITIAL_STATE = {
  yourpets: {randomkey1: {petname: ""}, randomkey2: {petname: ""}},
};

const applySetPets = (state, action) => ({
  ...state,
  yourpets: action.yourpets
});
/*
const changeRankPets = (state, action) => ({
  ...state,
  yourpets: action.yourpets
});
*/
const changeRankPets = (state, action) => {
  return {
      ...state,
      yourpets: action.yourpets
  }
};

function petReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'PETS_SET' : {
      return applySetPets(state, action);
    }
    case 'RANK_SET' : {
      return applySetPets(state, action);
    }
    default : return state;
  }
}

export default petReducer;
