const initialState = {
    count: 50,
    userData: {
        nama: 'n',
        foto: 'default.jpg'
    },
    barangEdit: '',
    barangDetail: '',
    server: 'http://sampeweweh.dx.am/backend/',
    da: [],
    editStaf: false,
    notif: 0
}
const dataTmp = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return Object.assign({}, state, {
                userData: action.data
            })
        case 'REMOVE_FROM_CART':
            return Object.assign({}, state, {
                count: state.count + 1
            })
        case 'EDIT_BARANG':
            return Object.assign({}, state, {
                barangEdit: action.data
            })
        case 'DETAIL_BARANG':
            return Object.assign({}, state, {
                barangDetail: action.data
            })
        case 'NOTIF':
            return Object.assign({}, state, {
                notif: action.data
            })
        // return state.filter(cartItem => cartItem.id !== action.payload.id)
    }
    return state
}

export default dataTmp
