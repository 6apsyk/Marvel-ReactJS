import ErrorMsg from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";

const setContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;
    case "pending":
      return <Spinner />;
    case "fulfilled":
      return <Component data={data} />;
    case "rejected":
      return <ErrorMsg />;
    default:
      throw new Error("Unexpected process state");
  }
};

export default setContent;
