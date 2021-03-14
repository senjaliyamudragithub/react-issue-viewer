import { useQuery } from "@apollo/client";
import { RouteComponentProps } from "react-router";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import dateTransformer from "../../helpers/dateTransformer";
import { ISSUE_DETAIL_QUERY } from "../../query/issueDetailInfoQuery";
import Loader from "../Utils/Loader";
import NotFound from "../Utils/NotFound";
import CommentContainer from "../Comment/CommentContainer";
import StateIcon from "../Utils/StateIcon";
const useStyles = makeStyles((theme) => ({
  container: {
    margin: "0 10%",
  },
  header: {
    paddingTop: "1%",
    display: "flex",
    alignItems: "center",
  },
}));

interface MatchParams {
  id: string;
}

const formSecondaryHeader = (
  author: { name: string },
  createdAt: Date,
  issueNumber: string | number,
  totalCount: number
) =>
  `# ${issueNumber} ${author.name || "Unknown name"} ${dateTransformer(
    createdAt
  )} ${totalCount} comments`;
const IssueDetail: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  const classes = useStyles();
  const { id: issueNumber } = props.match.params || {};
  const { loading, error, data } = useQuery(ISSUE_DETAIL_QUERY, {
    variables: { number: Number(issueNumber), after: null },
  });

  if (error) return <NotFound />;
  if (loading || !data) return <Loader />;
  const {
    repository: { issue },
  } = data || {};
  return (
    <div className={classes.container}>
      <ListItem>
        <ListItemAvatar>
          <StateIcon state={issue.state} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h4">{issue.title}</Typography>}
          secondary={formSecondaryHeader(
            issue.author,
            issue.createdAt,
            issueNumber,
            issue.comments.totalCount
          )}
        />
      </ListItem>
      <CommentContainer commentList={issue.comments.edges} />
    </div>
  );
};
export default IssueDetail;
