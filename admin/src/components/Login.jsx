import React, { useState, useEffect } from "react";
import "../css/Login/login.css";
import Logo from "../resources/images/logo.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { signIn } from "../api/functionApis";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const history = useHistory();

  const signInValidation = () => {
    if (email === "" || password === "") {
      setError(true);
      setErrorMessage("Necesitas incluir tu correo y contraseña");
    } else {
      if (validateEmail(email)) {
        setError(false);
        setLoading(true);
        signIn(email, password)
          .then((x) => {
            //console.log(x);
            if (x) {
              //console.log(x[0]);
              localStorage.setItem("08191993", x[0].email);
              history.push("/bienvenido");
            } else {
              setError(true);
              setErrorMessage("Email o contraseña incorrectos");
            }
          })
          .catch((x) => {
            setError(true);
            setErrorMessage(`😱 Request failed: ${x}`);
            console.log(`😱 Request failed: ${x}`);
          })
          .finally(() => setLoading(false));
      } else {
        setError(true);
        setErrorMessage("El correo es incorrecto");
      }
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const session = () => {
    const loggedInUser = localStorage.getItem("08191993");
    if (loggedInUser) {
      history.push("/bienvenido");
    }
  };

  useEffect(() => {
    // creamos una función para actualizar el estado con el clientWidth
    session();
  }, []);

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div>
            <a href="https://tienditacafe.com/">
              <img
                src={Logo}
                className="img-fluid"
                alt="Responsive image"
              ></img>
            </a>
            <h3></h3>

            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electronico"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {error ? (
              <div className="alert alert-danger" role="alert">
                {erroMessage}
              </div>
            ) : null}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={() => signInValidation()}
            >
              Entrar
            </button>
            <p className="forgot-password text-right">
              {/*<a href="#">Olvide mi contraseña</a>*/}
            </p>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faCoffee} pulse />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
