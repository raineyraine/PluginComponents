/// <reference types="@rbxts/testez/globals" />

_G.__ROACT_17_MOCK_SCHEDULER__ = true;

export = () => {
	describe("library", () => {
		it("should work", () => {
			expect(true).to.never.equal(false);
		});
	});

	afterAll(() => {
		_G.__ROACT_17_MOCK_SCHEDULER__ = false;
	});
};
