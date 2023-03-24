/**
 * loadImage() function options.
 */
export interface LoadImageOptions {
    /**
     * Timeout to abort loading in milliseconds.
     */
    timeout?: number;
    /**
     * Cross-Origin value.
     */
    crossOrigin?: string | 'anonymous' | 'use-credentials';
    /**
     * AbortController signal for manual abortion.
     */
    signal?: AbortSignal;
}
/**
 * Returns promise resolving preloaded HTMLImageElement from src string.
 *
 * @param src
 * @param options
 */
export declare function loadImage(src: string, options?: LoadImageOptions): Promise<HTMLImageElement>;
