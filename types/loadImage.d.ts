export * from "./version";
/**
 * loadImage() function options.
 * @public
 */
export interface LoadImageOptions {
    /**
     * Timeout to abort loading in milliseconds.
     */
    timeout?: number;
    /**
     * Cross-Origin value.
     */
    crossOrigin?: string | "anonymous" | "use-credentials";
    /**
     * AbortController signal for manual abortion.
     */
    signal?: AbortSignal;
}
/**
 * Returns promise resolving preloaded HTMLImageElement from src string.
 *
 * @param src -
 * @param options -
 * @public
 */
export declare function loadImage(src: string, options?: LoadImageOptions): Promise<HTMLImageElement>;
