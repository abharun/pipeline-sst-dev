export const Auctions = {
    getMax: (values: number[]): number => {
        if (values.length === 0) {
            throw new Error("The values array cannot be empty.");
        }
        return Math.max(...values);
    }
};
