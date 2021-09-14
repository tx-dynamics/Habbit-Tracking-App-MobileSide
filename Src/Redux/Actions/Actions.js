import {
    SESSION,
    ADD_HABBIT,
    COMPANY_DATA,
    START_DATE,
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
export const startDateStore = (data) => {
    return {
        type: START_DATE,
        payload: data,
    }
}