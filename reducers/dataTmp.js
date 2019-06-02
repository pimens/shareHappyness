const initialState = {
    count: 50,
    dataStaf: [],
    da: [],
    editStaf: false
}
const dataTmp = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return Object.assign({}, state, {
                count: state.count + 1
            })
        case 'REMOVE_FROM_CART':
            return Object.assign({}, state, {
                count: state.count + 1
            })
        // return state.filter(cartItem => cartItem.id !== action.payload.id)
    }
    return state
}

export default dataTmp
