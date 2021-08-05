const price = (state = 0, action) => { // price state
    switch (action.type) {
        case 'INCREMENT':
            return state + action.amount;
        case 'DECREMENT':
            return state - action.amount;
        default:
            return state;
    }
}

export default price;