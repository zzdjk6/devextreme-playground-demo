import Paper from "@material-ui/core/Paper";
import React from "react";
import {
  Appointments,
  DateNavigator,
  DayView,
  Scheduler,
  TodayButton,
  Toolbar,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { AppointmentModel, ViewState } from "@devexpress/dx-react-scheduler";
import { MemosContext } from "../../contexts/MemosContext";
import { useSeedData } from "../../hooks/useSeedData";
import Button from "@material-ui/core/Button";
import MuiGrid from "@material-ui/core/Grid";
import ExternalViewSwitcher from "./ExternalViewSwitcher";

const SchedulerPage: React.FC = () => {
  const { data } = React.useContext(MemosContext);

  const { seedData } = useSeedData();

  const [currentViewName, setCurrentViewName] = React.useState("Week");

  const appointments = React.useMemo<AppointmentModel[]>(() => {
    return Object.values(data)
      .filter((item) => {
        return item.startAt && item.endAt;
      })
      .map((item) => {
        return {
          id: item.id,
          title: item.title,
          startDate: item.startAt!,
          endDate: item.endAt!,
        };
      });
  }, [data]);

  const renderToolbarRoot = React.useCallback(
    (props) => {
      return (
        <Toolbar.Root {...props}>
          <MuiGrid
            container
            spacing={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <MuiGrid item xs={6} style={{ display: "flex" }}>
              {props.children}
            </MuiGrid>
            <MuiGrid item xs={6}>
              <MuiGrid container spacing={2} justifyContent={"flex-end"}>
                <MuiGrid item>
                  <Button
                    variant={"outlined"}
                    color={"primary"}
                    onClick={seedData}
                  >
                    Seed Data
                  </Button>
                </MuiGrid>
                <MuiGrid item>
                  <ExternalViewSwitcher
                    currentViewName={currentViewName}
                    onChange={(e) => setCurrentViewName(e.target.value)}
                  />
                </MuiGrid>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
        </Toolbar.Root>
      );
    },
    [currentViewName, seedData]
  );

  return (
    <Paper>
      <Scheduler data={appointments} height={660}>
        <ViewState currentViewName={currentViewName} />
        <DayView />
        <WeekView startDayHour={9} endDayHour={19} />
        <WeekView
          name="Work Week"
          excludedDays={[0, 6]}
          startDayHour={9}
          endDayHour={19}
        />
        <Appointments />
        <Toolbar rootComponent={renderToolbarRoot} />
        <DateNavigator />
        <TodayButton />
      </Scheduler>
    </Paper>
  );
};

export default SchedulerPage;
