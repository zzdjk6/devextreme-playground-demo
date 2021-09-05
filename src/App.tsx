import React from "react";
import MainLayout from "./layouts/MainLayout";
import { NavigationItem } from "./models/NavigationItem";
import { NavigationContext } from "./contexts/NavigationContext";
import DataGridPage from "./pages/data-grid/DataGridPage";
import SchedulerPage from "./pages/schedular/SchedulerPage";
import ChartPage from "./pages/chart/ChartPage";
import { useSeedData } from "./hooks/useSeedData";

export default function App() {
  const { activeNavigation } = React.useContext(NavigationContext);

  const { seedData } = useSeedData();

  React.useEffect(() => {
    seedData();
  }, [seedData]);

  return (
    <MainLayout>
      {activeNavigation === NavigationItem.DataGrid && <DataGridPage />}
      {activeNavigation === NavigationItem.Scheduler && <SchedulerPage />}
      {activeNavigation === NavigationItem.Chart && <ChartPage />}
    </MainLayout>
  );
}
