import actionType from "../actionType";
import { setUser, getUser } from '../../utils/index'

const defaultUser = JSON.parse(getUser())
interface actionType {
    type: string,
    payload?: any
}
const reducer = (state = defaultUser, action:actionType) => {
    switch (action.type) {

        case actionType.UPDATEUSER:
            // setUser(JSON.stringify(action.payload))
            return {
                ...state,
                ...action.payload
            }
        default:
            return defaultUser
    }
}

export default reducer