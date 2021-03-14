import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const dateTransformer = (date: string| Date) => {
  return dayjs(date).fromNow();
};

export default dateTransformer;
