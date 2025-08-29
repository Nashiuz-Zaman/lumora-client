// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const catchAsyncServer = <T extends (...args: any[]) => Promise<any>>(
  fn: T
) => {
  return async (
    ...args: Parameters<T>
  ): Promise<
    Awaited<ReturnType<T>> | { isError: boolean; errorMessage: string }
  > => {
    try {
      return await fn(...args);
      // gracefully handle error
    } catch (error) {
      console.log(`Error in ${fn.name}:`, error);
      return {
        isError: true,
        errorMessage:
          error instanceof Error
            ? error.message
            : "Next js Server Function Error",
      };
    }
  };
};
