import React from "react";
import { useState } from "react";
import Loading from "../../utilities/Loading";

const Sales = () => {
  const [loading, setLoading] = useState(false);
  const [noSales, setNoSales] = useState(false);
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
                  <h3>Aun no tienes productos</h3>
                </div>
                <div className="col-sm-12">
                  <p>ggg</p>
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
