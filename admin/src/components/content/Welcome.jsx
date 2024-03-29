import React, { useEffect, useState } from "react";
import "../../css/welcome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faTools } from "@fortawesome/free-solid-svg-icons";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Logo from "../../resources/images/logo.png";
import Products from "./Products";
import StartPage from "./Start";
import Packs from "./Packs";
import Loading from "../../utilities/Loading";
import { getAddressUser, getUserData } from "../../api/functionApis";
import Sales from "./Sales";
import AddressForm from "../AddressForm/AddressForm";

const Welcome = () => {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasAddress, setHasAddress] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const loggedInUser = localStorage.getItem("08191993");
    if (!loggedInUser) {
      history.push("/");
    }
    return loggedInUser;
  };

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  const startPage = () => {
    console.log("start");
  };

  const productsPage = () => {
    console.log("products");
  };

  const packsPage = () => {
    console.log("packs");
  };

  useEffect(() => {
    getUser()
      .then((x) => setUser(x))
      .finally(() => {
        getAddressUser(user).then((x) => {
          if (x === false) {
            setHasAddress(true);
          } else {
            setHasAddress(false);
          }
        });
        getUserData(user)
          .then((x) => {
            if (x) {
              const name = x[0].name + " " + x[0].last_name;
              setFullName(name);
            } else {
              setError(true);
              setErrorMessage(
                "Por el momento nuestros servicios se encuentran en mantenimiento, vuelve despues."
              );
            }
          })
          .finally(() => setLoading(false));
      });
  }, [fullName]);

  const updatingAdrress = (status) => {
    if (status) {
      setHasAddress(false);
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(
        "Por el momento nuestros servicios se encuentran en mantenimiento, vuelve despues."
      );
    }
  };

  if (error) {
    return (
      <div className="container loadingFull">
        <div className="row text-center">
          <div className="col-sm-12">
            <h3>
              <FontAwesomeIcon icon={faTools} size="lg" />
            </h3>
          </div>
          <div className="col-sm-12">
            <h3>{errorMessage}</h3>
          </div>
        </div>
      </div>
    );
  } else if (hasAddress) {
    return <AddressForm updateAddress={updatingAdrress} />;
  } else {
    return (
      <div>
        {loading ? (
          <Loading></Loading>
        ) : (
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
              <img
                src={Logo}
                className="img-fluid"
                alt="Responsive image"
                width="80"
              ></img>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <Link to="/bienvenido/">
                      <button className="nav-link btn btn-link">Inicio</button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/bienvenido/productos">
                      <button className="nav-link btn btn-link">
                        Productos
                      </button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/bienvenido/ventas">
                      <button className="nav-link btn btn-link">Ventas</button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#">
                      |
                    </a>
                  </li>
                </ul>
                <div className="my-4 my-lg-0">
                  <div className="container">
                    <div className="row h-100 justify-content-center align-items-center">
                      <div className="col-sm-12">{fullName}</div>
                    </div>
                  </div>
                </div>
                <div className=" my-4 my-lg-0">
                  <button
                    className="btn btn-outline-dark"
                    data-toggle="tooltip"
                    onClick={() => logout()}
                    data-placement="bottom"
                    title="Cerrar sesion"
                  >
                    <FontAwesomeIcon icon={faPowerOff} />
                  </button>
                </div>
              </div>
            </nav>
            <div style={{ minHeight: "51.5rem", paddingTop: "3.5rem" }}>
              <Switch>
                <Route path="/bienvenido/productos">
                  <Products></Products>
                </Route>
                <Router path="/bienvenido/paquetes">
                  <Packs></Packs>
                </Router>
                <Router path="/bienvenido/ventas">
                  <Sales />
                </Router>
                <Router path="/bienvenido/">
                  <StartPage></StartPage>
                </Router>
              </Switch>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Welcome;
