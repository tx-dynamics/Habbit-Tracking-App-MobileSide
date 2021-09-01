import { ADD_HABBIT } from '../Constants'
const initialState = {
    habbitName: '',
    setTarget: '',
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
        default:
            return state;
    }

}
export default HomeReducer;