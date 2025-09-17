import { ProductCollectionMain } from "@/components/page-specific";
import { Metadata } from "next";
import startCase from "lodash/startCase";

type TParams = Promise<{ slug: string }>;

export async function generateMetadata(props: {
  params: TParams;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const pageTitle = startCase(slug);
  return {
    title: `${pageTitle} Collection | Admin Panel`,
  };
}

const AdminProductCollectionPage = async (props: { params: TParams }) => {
  const { slug } = await props.params;
  const pageTitle = startCase(slug);

  return (
    <div className="grow flex flex-col">
      <h2 className="font-medium xl:text-xl border-b border-neutral-200 px-5 py-3 bg-white text-xl text-center sm:text-left">
        {`${pageTitle} Collection`}
      </h2>

      <ProductCollectionMain productCollectionSlug={slug} />
    </div>
  );
};

export default AdminProductCollectionPage;
