import Paper from "@material-ui/core/Paper";
import React from "react";
import {
  Appointments,
  AppointmentTooltip,
  CurrentTimeIndicator,
  DateNavigator,
  DayView,
  DragDropProvider,
  Scheduler,
  TodayButton,
  Toolbar,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  AppointmentModel,
  EditingState,
  IntegratedEditing,
  Toolbar as ToolbarBase,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import { MemosContext } from "../../contexts/MemosContext";
import { useSeedData } from "../../hooks/useSeedData";
import Button from "@material-ui/core/Button";
import MuiGrid from "@material-ui/core/Grid";
import ExternalViewSwitcher from "./ExternalViewSwitcher";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import EditDialog from "../../components/EditDialog";
import { MemoEditContext } from "../../contexts/MemoEditContext";
import CreateDialog from "../../components/CreateDialog";
import _ from "lodash";

const CurrentViewNameContext = React.createContext({
  currentViewName: "",
  setCurrentViewName: (name: string) => {},
});

const SchedulerPage: React.FC = () => {
  const { data, updateOne } = React.useContext(MemosContext);

  const [currentViewName, setCurrentViewName] = React.useState("Week");

  const [editingId, setEditingId] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);

  const [editingAppointment, setEditingAppointment] = React.useState<
    Partial<AppointmentModel>
  >();

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

  const handleCommitChanges = React.useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        // TODO:
        return;
      }

      if (changed) {
        const id = Object.keys(changed)[0];
        const newStartDate = changed[id].startDate;
        const newEndDate = changed[id].endDate;
        updateOne(id, {
          startAt: newStartDate,
          endAt: newEndDate,
        });
        return;
      }

      if (deleted) {
        // TODO:
        return;
      }
    },
    [updateOne]
  );

  return (
    <CurrentViewNameContext.Provider
      value={{
        currentViewName,
        setCurrentViewName,
      }}
    >
      <MemoEditContext.Provider
        value={{
          editingId,
          setEditingId,
          isCreating,
          setIsCreating,
        }}
      >
        <Paper>
          <Box height={"calc(100vh - 88px)"}>
            <Scheduler data={appointments} firstDayOfWeek={1}>
              <ViewState currentViewName={currentViewName} />
              <EditingState
                onCommitChanges={handleCommitChanges}
                editingAppointment={editingAppointment}
                onEditingAppointmentChange={(value) => {
                  setEditingAppointment(value);
                }}
              />
              <IntegratedEditing />

              <DayView />
              <WeekView
                timeTableCellComponent={TimeTableCell}
                dayScaleCellComponent={DayScaleCell}
              />
              <WeekView
                name="Work Week"
                excludedDays={[0, 6]}
                startDayHour={9}
                endDayHour={19}
              />
              <Appointments />
              <Toolbar rootComponent={ToolbarRoot} />
              <DateNavigator />
              <TodayButton />

              <AppointmentTooltip
                showCloseButton
                showOpenButton
                layoutComponent={(props) => {
                  return (
                    <AppointmentTooltip.Layout
                      {...props}
                      onOpenButtonClick={() => {
                        setEditingId(_.toString(editingAppointment?.id));
                      }}
                    />
                  );
                }}
                onAppointmentMetaChange={(meta) => {
                  setEditingAppointment(meta.data);
                }}
              />
              <DragDropProvider />

              <CurrentTimeIndicator />
            </Scheduler>
          </Box>

          <EditDialog />
          <CreateDialog />
        </Paper>
      </MemoEditContext.Provider>
    </CurrentViewNameContext.Provider>
  );
};

// TODO: Separate file
const ToolbarRoot: React.ComponentType<ToolbarBase.RootProps> = (props) => {
  const { seedData } = useSeedData();
  const { currentViewName, setCurrentViewName } = React.useContext(
    CurrentViewNameContext
  );

  const { setIsCreating } = React.useContext(MemoEditContext);

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
              <Button variant={"outlined"} color={"primary"} onClick={seedData}>
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
};

// TODO: styled-components
// https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/fundamentals/#customize-the-appearance
const useStyles = makeStyles((theme) => ({
  todayCell: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.14),
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    "&:hover": {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
  },
  today: {
    backgroundColor: fade(theme.palette.primary.main, 0.16),
  },
  weekend: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
  },
}));

// TODO: Separate file
const TimeTableCell = (props) => {
  const classes = useStyles();
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <WeekView.TimeTableCell {...props} className={classes.todayCell} />;
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <WeekView.TimeTableCell {...props} className={classes.weekendCell} />
    );
  }
  return <WeekView.TimeTableCell {...props} />;
};

// TODO: Separate file
const DayScaleCell = (props) => {
  const classes = useStyles();
  const { startDate, today } = props;

  if (today) {
    return <WeekView.DayScaleCell {...props} className={classes.today} />;
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...props} className={classes.weekend} />;
  }
  return <WeekView.DayScaleCell {...props} />;
};

export default SchedulerPage;
