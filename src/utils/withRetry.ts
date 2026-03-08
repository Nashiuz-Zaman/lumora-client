/**
 * Retries an async function a specified number of times with a delay.
 * * @param fn - The async function to execute
 * @param retries - Number of total attempts (default: 3)
 * @param delay - Milliseconds to wait between attempts (default: 1000ms)
 * @returns The result of the async function
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
): Promise<T> => {
  try {
    // Attempt the function
    return await fn();
  } catch (error) {
    // If no retries left, throw the final error
    if (retries <= 1) {
      throw error;
    }

    // Wait for the specified delay
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Recursively call with one less retry count
    console.warn(`Retrying... attempts left: ${retries - 1}`);
    return withRetry(fn, retries - 1, delay);
  }
};
