import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "10%",
    marginLeft: "40%",
  },
  block: {
    width: "60px",
    height: "60px",
    paddingRight: "10px",
  },
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton variant="rect" className={classes.block} />
      <Skeleton variant="rect" className={classes.block} />
      <Skeleton variant="rect" className={classes.block} />
    </div>
  );
};

export default Loader;
