import {
    SESSION,
    ADD_HABBIT,
    COMPANY_DATA
} from '../Constants'

export const SetSession = (data) => {
    return {
        type: SESSION,
        payload: data,
    }
}
export const SetCompanies = (data) => {
    return {
        type: COMPANY_DATA,
        payload: data,
    }
}
export const AddHabit = (data) => {
    return {
        type: ADD_HABBIT,
        payload: data,
    }
}