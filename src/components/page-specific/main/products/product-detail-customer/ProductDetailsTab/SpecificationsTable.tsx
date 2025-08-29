"use client";

import { NoData } from "@/components/shared";

interface ISpecification {
  key: string;
  value: string;
}

const SpecificationsTable = ({ data }: { data?: ISpecification[] | null }) => {
  return (
    <section className="bg-white grow relative">
      {!data && <NoData text="No specifications" centered={true} />}

      {data && (
        <table className="w-full border-collapse text-left rounded-lg p-6">
          <tbody>
            {data.map((el, i) => (
              <tr key={`key-${i}`}>
                <th scope="row" className="px-4 py-2 font-semibold">
                  {el.key}
                </th>
                <td className="px-4 py-2">{el.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default SpecificationsTable;
