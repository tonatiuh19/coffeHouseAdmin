import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUserSales } from "../../api/functionApis";
import Loading from "../../utilities/Loading";
import decodeUtf8 from "../../utils/functions/decodeUtf8";
import getUser from "../../utils/functions/getUser";
import { FaBeer } from 'react-icons/fa';
import { TiWarning } from 'react-icons/ti';
import { BsPatchCheckFill } from 'react-icons/bs';
import { HiOutlineDownload } from 'react-icons/hi';

const Sales = () => {
  const [loading, setLoading] = useState(false);
  const [noSales, setNoSales] = useState(false);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getUserSales(getUser()).then((x) => {
      console.log(x);
      if(x !== false){
        setNoSales(true);
        setSales(x);
      }else{
        setNoSales(false);
      }

      setLoading(true);
    });
  }, []);

  const statusOfPackage = (status) => {
    if(status === 1){
      return <button className="btn btn-warning btn-sm"><TiWarning /></button>
    }else if(status === 2){
      return <button className="btn btn-success btn-sm"><BsPatchCheckFill /></button>
    }
  }

  const label = (status, label) => {
    if(status === 1){
      return <a className="btn btn-warning btn-sm" 
      target="_blank" 
      href={label}>
        <HiOutlineDownload />
      </a>
    }else if(status === 2){
      return <button className="btn btn-success btn-sm" >
        <FaBeer />
      </button>
    }
  }

  return (
    <div>
      {loading ? (
        <div className="mt-3">
          {noSales ? (
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <table className="table">
                    <thead>
                        <tr>
                          <th scope="col">Orden</th>
                          <th scope="col" className="table-secondary">Producto</th>
                          <th scope="col" className="table-secondary">Cantidad</th>
                          <th scope="col">Cliente</th>
                          <th scope="col">Estatus</th>
                          <th
                            scope="col"
                            className="text-center bg-dark text-white"
                          >
                            Etiqueta
                          </th>
                        </tr>  
                    </thead>
                    <tbody>
                      {
                        sales.map((item, index) => {
                          return (
                          <tr key={index}>
                            <td className="text-center">
                              {
                                item.id_orders
                              }
                            </td>
                            <td className="table-secondary">
                              {
                                 <b>{decodeUtf8(item.name)}</b>
                              }
                            </td>
                            <td className="table-secondary text-center">
                              {
                                <b>{item.quantity}</b>
                              }
                            </td>
                            <td className="text-center">
                              {
                                item.first_name+' '+item.last_name
                              }
                            </td>
                            <td className="text-center">
                              {
                                statusOfPackage(item.complete)
                              }
                            </td>
                            <td className="table-dark text-center">
                              {
                                label(item.complete, item.shipment_label_url)
                              }
                            </td>
                          </tr>);
                        })
                      }
                    </tbody>
                  </table>
                </div>
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
