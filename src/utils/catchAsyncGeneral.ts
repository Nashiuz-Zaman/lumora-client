import { showToast } from "./showToast";

type THandleErrorOption = "toast" | "function" | "throw";

// Matches what axiosBaseQuery throws
interface IAxiosQueryError {
  status?: number;
  data?: unknown;
}

interface ICatchAsyncOptions<T> {
  handleError?: THandleErrorOption;
  onFinally?: ((args?: T) => void) | null;
  onError?: ((error: unknown, args?: T, message?: string) => void) | null;
  autoPrevent?: boolean;
}

function isAxiosQueryError(error: unknown): error is IAxiosQueryError {
  return (
    typeof error === "object" &&
    error !== null &&
    ("status" in error || "data" in error)
  );
}

// any kind of object with possible "e" Event key
export type TWithEvent = {
  e?: { preventDefault: () => void } | Event;
  [key: string]: any;
};

export const catchAsyncGeneral = (
  fn: (args?: TWithEvent) => Promise<void>,
  options: ICatchAsyncOptions<TWithEvent> = {}
) => {
  const {
    handleError = "toast",
    onFinally = null,
    onError = null,
    autoPrevent = true,
  } = options;

  return async (args?: TWithEvent) => {
    // Narrow to any event-like object safely
    const possibleEvent = args?.e as TWithEvent["e"];

    if (autoPrevent && possibleEvent?.preventDefault) {
      possibleEvent.preventDefault();
    }

    try {
      return await fn(args);
    } catch (error: unknown) {
      let message: string | undefined;

      if (isAxiosQueryError(error)) {
        if (typeof error.data === "string") message = error.data;
        else if (
          typeof error.data === "object" &&
          error.data !== null &&
          "message" in error.data
        ) {
          message = (error.data as { message?: string }).message;
        }
      } else if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      } else {
        message = JSON.stringify(error);
      }

      switch (handleError) {
        case "toast":
          return showToast({
            message: message || "Something went wrong",
            type: "error",
            position: "top-center",
          });

        case "function":
          if (typeof onError === "function") onError(error, args, message);
          return;

        case "throw":
          throw error;

        default:
          console.error("❌ Error in catchAsyncGeneral:", error);
          return;
      }
    } finally {
      if (typeof onFinally === "function") onFinally(args);
    }
  };
};
