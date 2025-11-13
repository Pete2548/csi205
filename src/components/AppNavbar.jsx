import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppNavbar({ products, carts, setToken }) {
  return (
    <div
      className="d-flex justify-content-center gap-2 p-2"
      style={{ backgroundColor: "#0D6EFD" }}
    >
      <Link to={"home"}>
        <Button variant="success">Home</Button>
      </Link>
      <Link to={"calculator"}>
        <Button variant="success">Calculator</Button>
      </Link>
      <Link to={"animation"}>
        <Button variant="success">Animation</Button>
      </Link>
      <Link to={"components"}>
        <Button variant="success">Components</Button>
      </Link>
      <Link to={"todos"}>
        <Button variant="success">Todo</Button>
      </Link>
      <Link to={"products"}>
        <Button variant="success">Products ({products.length})</Button>
      </Link>
      <Link to={"carts"}>
        <Button variant="success">Carts ({carts.length})</Button>
      </Link>

      <button
        className="btn btn-danger"
        style={{ marginLeft: "1rem" }}
        onClick={() => {
          setToken("");
        }}
      >
        Login
      </button>
    </div>
  );
}

export default AppNavbar;
