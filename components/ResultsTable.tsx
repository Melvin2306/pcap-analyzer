import { Packet } from "@/types/pcap";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

// Remove the getData function

export default function ResultsTable({ data }: { data: Packet[] }) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
