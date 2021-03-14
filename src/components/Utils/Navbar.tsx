import React  from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menu: {
    backgroundColor: theme.palette.common.black,
  },
  menuButton: {
    color: theme.palette.common.white,
  },
  searchButton: {
    marginLeft: "auto",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));


const Navbar: React.FunctionComponent = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.menu}>
        <Toolbar>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            React Issue Tracker
          </Typography>
          <Link to="/search" className={classes.searchButton}>
            <IconButton
              edge="start"
              color="inherit"
              className={classes.menuButton}
            >
              <SearchIcon fontSize="large" />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
};

export default Navbar;
