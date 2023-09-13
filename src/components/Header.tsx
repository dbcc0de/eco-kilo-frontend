import "./Header.css";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="Header">
      <h1>Eco Kilo</h1>

      {user ? (
        <>
          <button onClick={signOut}>Sign Out</button>
          <p>Hello, {user?.displayName?.split(" ")[0]}!</p>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Header;
