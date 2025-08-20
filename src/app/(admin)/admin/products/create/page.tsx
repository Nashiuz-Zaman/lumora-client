// THIS IS A PAGE

import { CreateProductMain } from "@/components/page-specific";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create A Product | Admin Panel",
};

const CreateProductPage = () => {
  return <CreateProductMain />;
};

export default CreateProductPage;
