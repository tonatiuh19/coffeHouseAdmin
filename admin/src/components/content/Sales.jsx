import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUserSales } from "../../api/functionApis";
import Loading from "../../utilities/Loading";

const Sales = () => {
  const [loading, setLoading] = useState(false);
  const [noSales, setNoSales] = useState(false);

  useEffect(() => {
    getUserSales().then((x) => {
      setLoading(true);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="mt-3">
          {noSales ? (
            <div className="container">
              <div className="row">
                <div className="col-sm-12"></div>
              </div>
            </div>
          ) : (
            <div className="container loadingFull">
              <div className="row text-center">
                <div className="col-sm-12">
                  <h3>Aun no tienes ventas</h3>
                </div>
                <div className="col-sm-12">
                  <p>Vendele mas duro</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Sales;
