import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  //navigation er maddome amra kothai user k nite cai.
  const navigate = useNavigate();
  const location = useLocation();
  //kotha jabe navigate kre er pathname
  const from = location?.state?.from?.pathname || "/";
  //email setting
  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  };
  //paswword setting
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  };
  //location code
  if (user) {
    navigate(from, { replace: true });
  }

  //navigate code
  if (user) {
    navigate("/shop");
  }
  //submit setting
  const handleUserSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="form-container">
      <div>
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleUserSignIn}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onBlur={handleEmailBlur}
              type="email"
              name="email"
              id=""
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onBlur={handlePasswordBlur}
              type="password"
              name="password"
              id=""
              required
            />
          </div>

          {/* error message */}
          <p style={{ color: "red" }}>{error?.message}</p>

          {/* loading  */}
          {loading && <p>Loading...</p>}
          <input className="form-submit" type="submit" value="Login" />
        </form>
        <p>
          New to Ema-Jhon?{" "}
          <Link className="form-link" to="/signup">
            Create an account
          </Link>
        </p>
        <div className="line">
          <hr></hr>
          <p className="or">or</p>
          <hr></hr>
        </div>
        <button className="connect-google">Continue With Google</button>
      </div>
    </div>
  );
};

export default Login;
