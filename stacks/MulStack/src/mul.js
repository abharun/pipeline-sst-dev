export const handler = async (event) => {
    try {
        const body = JSON.parse(JSON.stringify(event, null, 2));

        console.log("Invoked payload:", body);

        if (typeof body.num1 !== 'number' || typeof body.num2 !== 'number') {
            throw new Error('Both inputs must be numbers');
        }
        const result = body.num1 * body.num2;
        return { result };
    } catch (error) {
        throw error;
    }
}