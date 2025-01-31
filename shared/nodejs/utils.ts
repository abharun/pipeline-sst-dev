const MathFunc = {
    getMax: (values) => {
        if (values.length === 0) {
            throw new Error("The values array cannot be empty.");
        }
        return Math.max(...values);
    },
    getMin: (values) => {
        if (values.length === 0) {
            throw new Error("The values array cannot be empty.");
        }
        return Math.min(...values);
    }
};

export default MathFunc;