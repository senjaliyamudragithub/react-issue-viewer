import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import { useQuery } from "@apollo/client";
import NotFound from "../Utils/NotFound";
import Loader from "../Utils/Loader";
import { REPOSITORY_INFO } from "../../query/repositoryInfoQuery";


const useStyles = makeStyles((theme) => ({
  secondary: {
    color: theme.palette.grey[800],
  },
  badge: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    paddingRight: theme.spacing(2),
  },
  container: {
    backgroundColor: theme.palette.grey[100],
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    display: "flex",
  },
  item: {
    marginLeft: theme.spacing(3),
  },
}));

const RepoHeader: React.FunctionComponent = (props) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(REPOSITORY_INFO);
  if (error) return <NotFound />;
  if (loading || !data) return <Loader />;
  return (
    <>
      <div className={classes.container}>
        <div>
          <Typography variant="h4">{data.repository.name}</Typography>
          <Typography className={classes.secondary}>
            {data.repository.description}
          </Typography>
        </div>
        <div className={classes.badge}>
          <StarIcon />
          <Typography className={classes.secondary}>
            {data.repository.stargazers.totalCount}
          </Typography>
        </div>
      </div>
      {props.children}
    </>
  );
};

export default RepoHeader;
