const updateCounter = (state = null, action) => {
    switch (action.type) {
        case "UPDATE_COUNTER":
            return action.payload;

        default:
            return state;
    }
};

export default updateCounter;
