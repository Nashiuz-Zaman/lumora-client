export const getHeight = (entry: ResizeObserverEntry): number => {
  if (!entry) return 0;

  if (entry.borderBoxSize) {
    // Some browsers return an array, others a single object
    const boxSize = Array.isArray(entry.borderBoxSize)
      ? entry.borderBoxSize[0]
      : entry.borderBoxSize;

    // blockSize is the height in block dimension
    return boxSize.blockSize;
  }

  // Fallback to contentRect
  return entry.contentRect.height;
};
