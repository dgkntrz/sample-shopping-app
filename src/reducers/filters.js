const filters = (state = "", action) => { // apply filter concats the string, remove filter removes the string, reset filter resets the filter
    switch (action.type) {
        case 'APPLY':
            return state += (action.filter);
        case 'REMOVE':
            return state.replaceAll(action.filter, "");
        case 'RESET':
            return state = "";
        default:
            return state;
    }
}

export default filters;