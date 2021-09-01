import { SESSION, COMPANY_DATA } from '../Constants'
const initialState = {
    userId: '',
    isLogin: '',
    userData: '',
    CompanyData:''
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    // console.warn(payload)
    switch (type) {
        case SESSION:
            return {
                ...state,
                userId: payload.userId,
                isLogin: payload.isLogin,
                userData: payload.userData,
            }
        case COMPANY_DATA:
            return {
                ...state,
                CompanyData: payload.CompanyData
            }
        default:
            return state;
    }

}
export default authReducer