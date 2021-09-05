import { Column } from "@devexpress/dx-react-grid";
import { Memo } from "../../models/Memo";

export const columns: ReadonlyArray<Column> = [
  { name: "id", title: "ID" },
  { name: "status", title: "Status" },
  { name: "title", title: "Title" },
  { name: "tags", title: "Tags" },
  { name: "startAt", title: "Start At" },
  { name: "endAt", title: "End At" },
  { name: "actions", title: "Actions", getCellValue: (row: Memo) => row.id },
];
