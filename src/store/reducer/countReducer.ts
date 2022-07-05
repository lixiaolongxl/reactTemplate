import actionType from "../actionType";

const defaultCount = {
    count: 1
}

interface ActionType {
    type: string,
    payload?: any
}

const reducer = (state = defaultCount, action: ActionType) => {
    switch (action.type) {
        case actionType.INCREASE:
            return {
                ...state,
                count: state.count + 1
            }
        case actionType.DECREMENT:
            return {
                ...state,
                count: state.count - action.payload
            }
        default:
            return defaultCount
    }
}

export default reducer