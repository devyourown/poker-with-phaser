import call, { Methods } from "./api";

describe('api tests', () => {
    it('tests call func', () => {
        const result = call("/", Methods.GET, {});
        console.log(result);
    });
})