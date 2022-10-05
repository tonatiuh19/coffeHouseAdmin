import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { newAddress } from "../../api/functionApis";
import getUser from "../../utils/functions/getUser";

const AddressForm = ({ updateAddress }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loadingForm, setloadingForm] = useState(false);

  const onSubmit = (data) => {
    setloadingForm(true);
    newAddress(
      getUser(),
      data.street,
      data.no,
      data.noInt,
      data.city,
      data.state,
      data.cp,
      data.colony,
      data.description
    ).then((x) => {
      setloadingForm(false);
      if (x === 1) {
        updateAddress(true);
      } else {
        updateAddress(false);
      }
    });
  };

  return (
    <div className="container loadingFull">
      <div className="row text-center">
        <div className="col-sm-12">
          <h3>¿Cual es tu domicilio?</h3>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row mb-2">
                  <div className="col-6">
                    <input
                      type="text"
                      className={
                        errors.street
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      placeholder="Calle"
                      {...register("street", { required: true })}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className={
                        errors.no
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      placeholder="No ext"
                      {...register("no", { required: true })}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="No int"
                      {...register("noInt")}
                    />
                  </div>
                  <div className="col-3">
                    <input
                      type="text"
                      className={
                        errors.colony
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      placeholder="Colonia"
                      {...register("colony", { required: true })}
                    />
                  </div>
                </div>
                <div className="form-row mb-2">
                  <div className="col-7">
                    <input
                      type="text"
                      className={
                        errors.city
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      placeholder="Ciudad"
                      {...register("city", { required: true })}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className={
                        errors.state
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      placeholder="Estado"
                      {...register("state", { required: true })}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className={
                        errors.cp
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      placeholder="CP"
                      {...register("cp", { required: true })}
                    />
                  </div>
                </div>
                <div className="form-row mb-2">
                  <div className="col-12">
                    <textarea
                      className={
                        errors.description
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="exampleFormControlTextarea1"
                      placeholder="Descripción adicional"
                      rows="3"
                      {...register("description", { required: true })}
                    ></textarea>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12">
                    {loadingForm ? (
                      <button
                        type="submit"
                        className="btn btn-warning"
                        disabled
                      >
                        Guardando
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-success">
                        Guardar
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
