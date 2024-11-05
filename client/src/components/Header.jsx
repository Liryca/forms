import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const goAccount = () => {
    user.role === "admin" ? navigate("/admin") : navigate(`/user/${user.id}`);
  };

  return (
    <Stack>
      <Navbar
        expand="lg"
        className="bg-body-tertiary justify-content-between p-3"
        gap={10}
      >
        <Stack direction="horizontal" gap={3}>
          <Navbar.Brand href="/">FillOut</Navbar.Brand>
        </Stack>

        {isAuth ? (
          <Stack direction="horizontal" gap={3}>
            <span onClick={goAccount} className="avatar text-bg-secondary">
              {user.username[0].toUpperCase()}
            </span>
            <Button onClick={signOut}>Logout</Button>
          </Stack>
        ) : (
          <Stack direction="horizontal" gap={3}>
            <Button href="/login">Login</Button>
            <Button href="/register">Sign up</Button>
          </Stack>
        )}
      </Navbar>
    </Stack>
  );
};
