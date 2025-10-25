import { DynamicTable } from "@/components/DynamicTable";

// Data array
const data = [
  {
    name: "Md Saif",
    age: 89,
    city: "Helsinki",
    isStudent: true,
    date: "2025-10-25",
  },
  {
    name: "Mahbub Hasan",
    age: 22,
    city: "Vantaa",
    isStudent: false,
    date: "2025-10-25",
  },
];

const Example = () => {
  return (
    <div className="min-h-screen">
      <DynamicTable data={data} />
    </div>
  );
};

export default Example;
