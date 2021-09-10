import { ADD_HABBIT, START_DATE } from '../Constants'
const initialState = {
    habbitName: '',
    setTarget: '',
    ChallengestartDate:'',
};

const HomeReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_HABBIT:
            return {
                ...state,
                habbitName: payload.habbitName,
                setTarget: payload.setTarget,
            }
        case START_DATE:
            return {
                ...state,
                ChallengestartDate: payload.ChallengestartDate
            }
        default:
            return state;
    }

}
export default HomeReducer;