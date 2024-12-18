const Auctions = require('/opt/nodejs/auction');

export const handler = async (event) => {
    try {
        const body = JSON.parse(JSON.stringify(event, null, 2));

        if (typeof body.num1 !== 'number' || typeof body.num2 !== 'number') {
            throw new Error('Both inputs must be numbers');
        }
        const result = body.num1 * body.num2 * Auctions.getMax([body.num1, body.num2]);
        return { result };
    } catch (error) {
        throw error;
    }
}