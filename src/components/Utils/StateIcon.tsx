import InfoIcon from "@material-ui/icons/InfoOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    open: {
      color: theme.palette.success.main,
    },
    closed: {
      color: theme.palette.error.main,
    },
  };
});

interface Props {
  state: string;
}

const StateIcon: React.FC<Props> = ({state}) => {
  const classes = useStyles();
  return (
    <InfoIcon data-testid="custom-state-element"
      className={state === "OPEN" ? classes.open : classes.closed}
    />
  );
};
export default StateIcon;
