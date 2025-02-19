/**
 * Debouncing creates a factory function that limits high consecutive callbacks, effectively excluded from executing.
 * A good example is window resizing.
 *
 * @param {UnknownFunction} callback - The function to debounce.
 * @param {number} timeout - The number of milliseconds to delay the invocation of the callback.
 * @return {UnknownFunction} A debounced function that can be invoked with arguments.
 */
export function debounce(callback: UnknownFunction, timeout: number): UnknownFunction {
  let timeoutId: number | undefined = undefined;
  return (...args: any[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), timeout);
  };
}

export type UnknownFunction = (...args: unknown[]) => unknown;