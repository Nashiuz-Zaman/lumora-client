export const fetchProductForAdmin = async (productId: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/products/${productId}/admin`
    );

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      return { data: null, error: errorText || "Failed to fetch product" };
    }

    return await res.json();
  } catch (err) {
    console.log(err instanceof Error ? err.message : "Unknown error");
    return;
  }
};
