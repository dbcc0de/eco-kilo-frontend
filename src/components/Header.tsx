import "./Header.css";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="Header">
      <Link to="/">
        <h1>Eco Kilo</h1>
      </Link>
      <Link to="/education">
        <h2>Education</h2>
      </Link>
      {user ? (
        <div className="userHeader">
          <p>Hello, {user?.displayName?.split(" ")[0]}!</p>
          <button onClick={signOut}>Sign Out</button>
          <Link to="/homes">
            <p id="seeHomesButton">See My Homes</p>
          </Link>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Header;
