import { FormTable } from "@/features/form-table/FormTable";
import StoreProvider from "../StoreProvider";

export default function FormTablePage() {
  return (
    <StoreProvider>
      <FormTable />
    </StoreProvider>
  );
}
