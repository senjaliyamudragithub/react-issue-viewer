import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    paddingRight: theme.spacing(1),
    width: "50%",
  },
  main: {
    marginLeft: "15%",
    marginTop: theme.spacing(3),
    alignItems: "center",
  },
}));

interface Props {
  searchField: string;
  onChangeSearchField: Function;
  onStateChange: Function;
  stateValue: string;
  onFindResult: Function;
}
const SearchHeader: React.FC<Props> = ({
  searchField,
  onChangeSearchField,
  onStateChange,
  stateValue,
  onFindResult,
}) => {
  const classes = useStyles();
  return (
    <nav className={classes.main}>
      <TextField
        id="outlined-full-width"
        label="Search Issue"
        value={searchField}
        onChange={(e) => onChangeSearchField(e)}
        placeholder="Search here"
        className={classes.textField}
        variant="outlined"
      />
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="status"
          name="status"
          data-testid="radio-group"
          value={stateValue}
          onChange={(e) => onStateChange(e)}
          style={{ flexDirection: "row" }}
        >
          <FormControlLabel
            value="open"
            control={<Radio color="default" />}
            label="Open"
          />
          <FormControlLabel
            value="closed"
            control={<Radio color="default" />}
            label="Closed"
          />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        color="default"
        data-testid="search-button"
        disabled={!searchField}
        onClick={() => onFindResult()}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </nav>
  );
};
export default SearchHeader;
