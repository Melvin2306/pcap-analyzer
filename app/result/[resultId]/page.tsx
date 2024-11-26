"use client";

import ResultsTable from "@/components/ResultsTable";
import { useDataContext } from "@/components/context/DataContext";

export default function ResultsPage() {
  const { data } = useDataContext();

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <ResultsTable data={data} />
    </div>
  );
}
