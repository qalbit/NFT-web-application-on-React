const defaultJobReducere = (state = null, action) => {
    switch (action.type) {
        case "UPDATE_DEFAULT_JOB":
            return action.payload;

        default:
            return state;
    }
};

export default defaultJobReducere;
