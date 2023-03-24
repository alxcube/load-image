import {loadImage} from "../../src/loadImage";

describe("loadImage", () => {
    it("should load the image from the specified URL", async () => {
        const image = await loadImage("https://via.placeholder.com/150x150.png?text=Test+Image");
        expect(image).toBeDefined();
        expect(image instanceof HTMLImageElement).toBe(true);
        expect(image.complete).toBe(true);
        expect(image.naturalWidth).toBeGreaterThan(0);
        expect(image.naturalHeight).toBeGreaterThan(0);
    });

    it("should reject with an error if the image cannot be loaded", async () => {
        try {
            await loadImage("https://example.com/nonexistent.jpg");
            fail("Expected loadImage to reject with an error.");
        } catch (error) {
            expect(error).toBeDefined();
            expect(error instanceof Error).toBe(true);
            expect(error.message).toContain("Couldn't load image");
        }
    });

    it("should respect the timeout option", async () => {
        jasmine.clock().install();
        const slowImagePromise = loadImage("https://example.com/slow-image.jpg", { timeout: 100 });
        jasmine.clock().tick(101);
        try {
            await slowImagePromise;
            fail("Expected loadImage to reject with a timeout error.");
        } catch (error) {
            expect(error).toBeDefined();
            expect(error instanceof Error).toBe(true);
            expect(error.message).toContain("timed out");
        }
        jasmine.clock().uninstall();
    });


    xit("should respect the crossOrigin option", async () => {
        const image = await loadImage("https://via.placeholder.com/150x150.png?text=Test+Image", { crossOrigin: "anonymous" });
        expect(image).toBeDefined();
        expect(image instanceof HTMLImageElement).toBe(true);
        expect(image.complete).toBe(true);
        expect(image.naturalWidth).toBeGreaterThan(0);
        expect(image.naturalHeight).toBeGreaterThan(0);
    });

    it("should abort the image loading if the signal is aborted", async () => {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);

        try {
            await loadImage("https://example.com/slow-image.jpg", { signal: controller.signal });
            fail("Expected loadImage to reject with an abort error.");
        } catch (error) {
            expect(error).toBeDefined();
            expect(error instanceof DOMException).toBe(true);
            expect(error.name).toBe("AbortError");
        }
    });
});
