/**
 * Retries an async function a specified number of times with a delay.
 * * @param fn - The async function to execute
 * @param retries - Number of total attempts (default: 3)
 * @param delay - Milliseconds to wait between attempts (default: 1000ms)
 * @param shouldRetry - boolean flag to determine if the retry should happen
 * @returns The result of the async function
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
  shouldRetry: (error: any) => boolean = () => true,
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 1) throw error;

    // Jitter: a random offset between 0 and 200ms
    const offset = Math.random() * 400;
    const totalDelay = delay + offset;

    await new Promise((resolve) => setTimeout(resolve, totalDelay));

    console.warn(
      `Retryable error detected. Retrying in ${Math.round(totalDelay)}ms...`,
    );
    return withRetry(fn, retries - 1, delay, shouldRetry);
  }
};
