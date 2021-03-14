import IssueItem from "./IssueItem";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  link: {
    textDecoration: "none",
  },
}));
interface Props {
  list: {
    node: {
      id: number;
      comments: {
        totalCount: number;
      };
      number: number;
      state: string;
      title: string;
      createdAt: string;
      author: {
        name: string;
      };
    };
  }[];
}
const IssueList: React.FC<Props> = ({ list }) => {
  const validatedList = list.filter(({ node }) => node.state);
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {validatedList.map(({ node }) => (
        <Link
          key={node.id}
          to={`/issue/${node.number}`}
          className={classes.link}
        >
          <IssueItem node={node} />
        </Link>
      ))}
    </List>
  );
};
export default IssueList;
