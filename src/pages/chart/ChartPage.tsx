import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Chart,
  PieSeries,
  Tooltip,
  Legend,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { MemosContext } from "../../contexts/MemosContext";
import { MemoStatus } from "../../models/MemoStatus";
import { useSeedData } from "../../hooks/useSeedData";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MuiGrid from "@material-ui/core/Grid";
import { EventTracker } from "@devexpress/dx-react-chart";

const ChartPage: React.FC = () => {
  const { data } = React.useContext(MemosContext);

  const { seedData } = useSeedData();

  const chartData = React.useMemo(() => {
    return [
      {
        status: MemoStatus.Active,
        count: Object.values(data).filter(
          (item) => item.status === MemoStatus.Active
        ).length,
      },
      {
        status: MemoStatus.Complete,
        count: Object.values(data).filter(
          (item) => item.status === MemoStatus.Complete
        ).length,
      },
    ];
  }, [data]);

  return (
    <Paper>
      <Toolbar>
        <Button variant={"outlined"} color={"primary"} onClick={seedData}>
          Seed Data
        </Button>
      </Toolbar>
      <MuiGrid container>
        <MuiGrid item xs={6}>
          <Chart data={chartData}>
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField="count" argumentField="status" />
            <BarSeries valueField="count" argumentField="status" />
            <EventTracker />
            <Tooltip />
            <Title text={"Bar"} />
          </Chart>
        </MuiGrid>
        <MuiGrid item xs={6}>
          <Chart data={chartData}>
            <PieSeries valueField="count" argumentField="status" />
            <EventTracker />
            <Tooltip />
            <Title text={"Pie"} />
            <Legend position={"bottom"} />
          </Chart>
        </MuiGrid>
      </MuiGrid>
    </Paper>
  );
};

export default ChartPage;
