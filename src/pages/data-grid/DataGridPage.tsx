import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  TableColumnResizing,
  TableFilterRow,
  TableHeaderRow,
  TableRowDetail,
  TableSelection,
  VirtualTable,
} from "@devexpress/dx-react-grid-material-ui";
import {
  FilteringState,
  IntegratedFiltering,
  IntegratedSelection,
  IntegratedSorting,
  RowDetailState,
  SelectionState,
  SortingState,
  TableColumnWidthInfo,
} from "@devexpress/dx-react-grid";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { MemosContext } from "../../contexts/MemosContext";
import styled from "styled-components";
import DateTypeProvider from "./DateTypeProvider";
import TagTypeProvider from "./TagTypeProvider";
import ActionsTypeProvider from "./ActionsTypeProvider";
import RowDetail from "./RowDetail";
import FilterCell from "./FilterCell";
import GridRoot from "./GridRoot";
import { columns } from "./constants";
import EditDialog from "../../components/EditDialog";
import { MemoEditContext } from "../../contexts/MemoEditContext";
import CreateDialog from "../../components/CreateDialog";
import MuiGrid from "@material-ui/core/Grid";
import { Memo } from "../../models/Memo";
import { useSeedData } from "../../hooks/useSeedData";

const DataGridPage: React.FC = () => {
  const { data, deleteOne } = React.useContext(MemosContext);
  const containerRef = React.useRef<HTMLDivElement>();
  const rows = React.useMemo(() => Object.values(data), [data]);

  const [editingId, setEditingId] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);

  const [selection, setSelection] = React.useState<string[]>([]);

  // TODO: issue - can't use other units than px when using virtual table
  const [columnWidths, setColumnWidths] = React.useState<
    TableColumnWidthInfo[]
  >(
    columns.map(({ name }) => ({
      columnName: name,
      width: 0,
    }))
  );
  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    // Scrollbar width = 15, Show details column width = 48, Selection column width = 58
    const containerWidth = containerRef.current.clientWidth - 15 - 48 - 58;
    let remainWidth = containerWidth;
    const returnWidth = (width: number) => {
      remainWidth -= width;
      return width;
    };

    const widthInfoList: TableColumnWidthInfo[] = [];
    widthInfoList.push({ columnName: "id", width: returnWidth(200) });
    widthInfoList.push({ columnName: "status", width: returnWidth(120) });
    widthInfoList.push({ columnName: "tags", width: returnWidth(300) });
    widthInfoList.push({ columnName: "startAt", width: returnWidth(150) });
    widthInfoList.push({ columnName: "endAt", width: returnWidth(150) });
    widthInfoList.push({ columnName: "actions", width: returnWidth(150) });
    widthInfoList.push({ columnName: "title", width: remainWidth });

    setColumnWidths(widthInfoList);
  }, []);

  const { seedData } = useSeedData();

  const handleClickSeedData = React.useCallback(() => {
    seedData();
  }, [seedData]);

  return (
    <MemoEditContext.Provider
      value={{
        editingId,
        setEditingId,
        isCreating,
        setIsCreating,
      }}
    >
      <StyledPaper ref={containerRef}>
        <Toolbar>
          <MuiGrid container spacing={2}>
            <MuiGrid item>
              <Button
                variant={"outlined"}
                color={"primary"}
                onClick={handleClickSeedData}
              >
                Seed Data
              </Button>
            </MuiGrid>
            <MuiGrid item>
              <Button
                variant={"outlined"}
                color={"primary"}
                onClick={() => setIsCreating(true)}
              >
                Create
              </Button>
            </MuiGrid>
            <MuiGrid item>
              <Button
                variant={"outlined"}
                color={"secondary"}
                disabled={selection.length === 0}
                onClick={() => {
                  selection.forEach((id) => deleteOne(id));
                }}
              >
                Delete Selection
              </Button>
            </MuiGrid>
          </MuiGrid>
        </Toolbar>
        <Grid
          rows={rows}
          columns={columns}
          rootComponent={GridRoot}
          getRowId={(row: Memo) => row.id}
        >
          <RowDetailState />
          <FilteringState
            defaultFilters={[]}
            columnExtensions={[
              { columnName: "actions", filteringEnabled: false },
            ]}
          />
          <IntegratedFiltering />
          <SortingState />
          <IntegratedSorting />
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection as any}
          />
          <IntegratedSelection />
          <VirtualTable height={"auto"} />
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={setColumnWidths}
            resizingMode="nextColumn"
          />
          <TableHeaderRow showSortingControls />
          <DateTypeProvider for={["startAt", "endAt"]} />
          <TagTypeProvider for={["tags"]} />
          <ActionsTypeProvider for={["actions"]} />
          <TableFilterRow cellComponent={FilterCell} showFilterSelector />
          <TableRowDetail contentComponent={RowDetail} />
          <TableSelection showSelectAll />
        </Grid>
        <EditDialog />
        <CreateDialog />
      </StyledPaper>
    </MemoEditContext.Provider>
  );
};

const StyledPaper = styled(Paper)`
  height: calc(100vh - 120px);
`;

export default DataGridPage;
