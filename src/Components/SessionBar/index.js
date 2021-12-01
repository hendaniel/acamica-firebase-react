import { logout, googleLogin, getCurrentUser } from "./../../firebase";
import "./styles.scss";

export function SessionBar() {
  const user = getCurrentUser();
  return (
    <div className="session-bar__container">
      {user ? (
        <div className="session-bar__user">
          <img
            data-testid="imagen"
            className="session-bar--img"
            src={user.photoURL}
            alt=""
            referrerPolicy="no-referrer"
          />
          <p>¡Hola {user.displayName}!</p>
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
        <button className="session-bar__login" onClick={googleLogin}>
          Login con google
        </button>
      )}
    </div>
  );
}
