export * from "./version";

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
  crossOrigin?: string | "anonymous" | "use-credentials";

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
export function loadImage(
  src: string,
  options: LoadImageOptions = {}
): Promise<HTMLImageElement> {
  const { timeout = 0, crossOrigin, signal } = options;

  return new Promise((resolve, reject) => {
    const image = new Image();

    let timer: number;

    function cleanup() {
      if (timer) {
        clearTimeout(timer);
      }
      image.onerror = null;
      image.onload = null;
    }

    if (timeout > 0) {
      timer = setTimeout(() => {
        cleanup();
        reject(new Error(`Image ${src} timed out after ${timeout}ms.`));
      }, timeout);
    }

    image.onerror = () => {
      cleanup();
      reject(new Error(`Couldn't load image from ${src}.`));
    };

    image.onload = () => {
      cleanup();
      resolve(image);
    };

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }

    if (signal) {
      signal.addEventListener("abort", () => {
        cleanup();
        reject(new DOMException("Aborted", "AbortError"));
        image.src = "";
      });
    }

    image.src = src;
  });
}
