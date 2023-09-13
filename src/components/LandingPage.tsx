import { useContext } from "react";
import HomesForm from "./HomesForm";
import "./LandingPage.css";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="LandingPage">
      <h2>Here's how Eco Kilo Works:</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ea, sunt
        incidunt labore molestiae blanditiis ad debitis, nihil nobis tempora
        reprehenderit deserunt vero consectetur iste esse. Sapiente consectetur
        cumque quisquam.
      </p>
      {/* link to user form that inputs homes data */}
      {user ? (
        <>
          <HomesForm />
          <button>Submit your home data</button>
        </>
      ) : (
        <>
          <p>Sign in to submit your home's data</p>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </>
      )}
    </div>
  );
};

export default LandingPage;
