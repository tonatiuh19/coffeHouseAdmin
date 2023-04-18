import React from "react";
import { useHistory, Link } from "react-router-dom";

const Start = () => {
  const history = useHistory();

  const productsPage = () => {
    history.push("/bienvenido/productos");
  };

  const packsPage = () => {
    history.push("/bienvenido/paquetes");
  };

  return (
    <div className="container loadingFull">
      <div className="row text-center">
        <div className="col-sm-12">
          <h3>Bienvenido al portal de proveedores</h3>
        </div>
        <div className="col-sm-12">
          Aqui podras administrar tus productos y crear paquetes para vender de
          manera optima tus productos en BolsaDeCafe.
        </div>
        <div className="col-sm-12">
          <p>
            <small>Usa las pestañas de arriba para navegar.</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Start;
