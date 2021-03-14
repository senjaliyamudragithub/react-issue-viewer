import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

interface Props {
  openedCount: number;
  closedCount: number;
  tabValue: string;
  onTabChange: Function;
}

const FilterTab: React.FC<Props> = ({
  openedCount,
  closedCount,
  tabValue,
  onTabChange,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tabs
        value={tabValue}
        onChange={(e,val) => onTabChange(val)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label={openedCount + " Open"} value={"OPEN"} />
        <Tab label={closedCount + " Closed"} value={"CLOSED"} />
      </Tabs>
    </div>
  );
};
export default FilterTab;
