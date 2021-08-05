// used to increase the total price of cart
export const increment = t => {
    return {
        type: 'INCREMENT',
        amount: t
    }
}
// used to decrease the total price of cart
export const decrement = t => {
    return {
        type: 'DECREMENT',
        amount: t
    }
}
// used to apply new filter
export const apply = t => {
    return {
        type: 'APPLY',
        filter: t.filter,
    }
}
// used to remove previously applied filter
export const remove = t => {
    return {
        type: 'REMOVE',
        filter: t.filter,
    }
}
// used to reset filters
export const reset = t => {
    return {
        type: 'RESET',
    }
}