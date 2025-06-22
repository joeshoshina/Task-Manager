import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const NotFoundPage = () => {
  return (
    <div>
      <h1>404 Page Not Found</h1>
      <Link to={"/"}>
        <Button>Go back home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
