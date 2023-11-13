import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  completeOrder,
  editOrder,
  getAddressUserById,
  getUserProductById,
  getUserSales,
  updateOrder,
} from "../../api/functionApis";
import Loading from "../../utilities/Loading";
import decodeUtf8 from "../../utils/functions/decodeUtf8";
import getUser from "../../utils/functions/getUser";
import { FaBeer } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";
import { BsPatchCheckFill } from "react-icons/bs";
import {
  HiOutlineDownload,
  HiArrowCircleRight,
  HiPencil,
  HiOutlineCheck,
} from "react-icons/hi";
import { GiCoffeeBeans } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { Modal, Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SignupSchema = yup.object().shape({
  idShip: yup.string().required(),
  priceShip: yup.number().required().positive(),
  providerShip: yup.string().required(),
  trackShip: yup.string().required(),
  descriptionShip: yup.string(),
});

const Sales = () => {
  const [loading, setLoading] = useState(false);
  const [noSales, setNoSales] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [sales, setSales] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [type, setType] = useState("");
  const [onSubmitStatus, setOnSubmitStatus] = useState(1);
  const [addressModal, setAddressModal] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [emailUser, setEmailUser] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  useEffect(() => {
    let isRendered = true;
    getUserSales(getUser()).then((x) => {
      if (isRendered) {
        if (x !== false) {
          setNoSales(true);
          setSales(x);
        } else {
          setNoSales(false);
        }
      }
      setLoading(true);
    });

    return () => {
      isRendered = false;
    };
  }, [loading]);

  const statusOfPackage = (status) => {
    if (status === 0) {
      return (
        <button className="btn btn-warning btn-sm">
          <TiWarning />
        </button>
      );
    } else if (status === 2) {
      return (
        <button className="btn btn-outline-warning text-dark btn-sm">
          <MdOutlineLocalShipping />
        </button>
      );
    } else {
      return (
        <button className="btn btn-success btn-sm">
          <BsPatchCheckFill />
        </button>
      );
    }
  };

  const label = (status, label) => {
    if (status === 1) {
      return (
        <a className="btn btn-success btn-sm" target="_blank" href={label}>
          <HiOutlineDownload />
        </a>
      );
    } else if (status === 2) {
      return (
        <button className="btn btn-success btn-sm">
          <FaBeer />
        </button>
      );
    }
  };

  const subs = (type) => {
    if (type === 1) {
      return (
        <button className="btn btn-success btn-sm w-100">
          <GiCoffeeBeans /> Barista
        </button>
      );
    } else if (type === 2) {
      return (
        <button className="btn btn-success btn-sm w-100">
          <GiCoffeeBeans /> Barista Pro
        </button>
      );
    } else {
      return (
        <button className="btn btn-success btn-sm w-100">
          <GiCoffeeBeans /> Barista Dios
        </button>
      );
    }
  };

  const buttonAction = (item) => {
    if (item.complete === 2) {
      return (
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary btn-sm w-100"
              onClick={() => {
                setOrderId(item.id_orders);
                setEmailUser(item.email_user);
                setType(item.type);
                setOnSubmitStatus(2);
                setValue("idShip", item.shipment_id);
                setValue("priceShip", item.shipment_price);
                setValue("providerShip", item.shipment_provider);
                setValue("trackShip", item.track_id);
                setValue("descriptionShip", item.description);
                handleOrderModal(item);
              }}
            >
              <HiPencil />
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-success btn-sm w-100"
              onClick={() => {
                setOrderId(item.id_orders);
                setEmailUser(item.email_user);
                setOnSubmitStatus(3);
                setValue("idShip", item.shipment_id);
                setValue("priceShip", item.shipment_price);
                setValue("providerShip", item.shipment_provider);
                setValue("trackShip", item.track_id);
                setValue("descriptionShip", item.description);
                handleOrderModal(item);
              }}
            >
              <HiOutlineCheck />
            </button>
          </div>
        </div>
      );
    } else if (item.complete === 0) {
      return (
        <button
          className="btn btn-warning btn-sm w-100"
          onClick={() => {
            setOrderId(item.id_orders);
            setEmailUser(item.email_user);
            setType(item.type);
            setOnSubmitStatus(1);
            handleOrderModal(item);
          }}
        >
          <HiArrowCircleRight />
        </button>
      );
    } else {
      return (
        <button className="btn btn-success btn-sm w-100">
          <BsPatchCheckFill /> Completa
        </button>
      );
    }
  };

  const handleCloseOrderModal = () => {
    reset();
    setOrderModal(false);
  };
  const handleOrderModal = (item) => {
    setOrderModal(true);
  };

  const onSubmitOrder = (data) => {
    setOrderModal(false);
    setLoading(false);
    if (onSubmitStatus === 1) {
      updateOrder(
        data.idShip,
        data.priceShip,
        data.providerShip,
        data.trackShip,
        orderId,
        data.descriptionShip,
        type,
        emailUser
      ).then((x) => {
        setLoading(true);
        reset();
      });
    } else if (onSubmitStatus === 2) {
      editOrder(
        data.idShip,
        data.priceShip,
        data.providerShip,
        data.trackShip,
        orderId,
        data.descriptionShip,
        emailUser
      ).then((x) => {
        setLoading(true);
        reset();
      });
    } else if (onSubmitStatus === 3) {
      completeOrder(orderId, emailUser).then((x) => {
        setLoading(true);
        reset();
      });
    }
  };

  const onSubmit = (data) => {};

  const renderModalTitle = () => {
    if (onSubmitStatus === 1) {
      return <span>Orden pendiente: {orderId}</span>;
    } else if (onSubmitStatus === 2) {
      return <span>Editar orden: {orderId}</span>;
    } else if (onSubmitStatus === 3) {
      return <span>¿Completar orden: {orderId}?</span>;
    }
  };

  const renderAddress = (id_adress) => {
    setAddressModal(true);
    setAddressLoading(true);
    getAddressUserById(id_adress).then((x) => {
      setAddress(x);
      setAddressLoading(false);
    });
  };

  const renderProduct = (id_product) => {
    setProductModal(true);
    setProductLoading(true);
    getUserProductById(id_product).then((x) => {
      setProduct(x);
      setProductLoading(false);
    });
  };

  function decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }

  return (
    <div>
      {loading ? (
        <div className="mt-3">
          <Modal
            show={orderModal}
            onHide={handleCloseOrderModal}
            backdrop="static"
            keyboard={false}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{renderModalTitle()}</Modal.Title>
            </Modal.Header>
            {onSubmitStatus !== 3 ? (
              <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Ingresa id de envio:</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      onChange={(e) => {}}
                      {...register("idShip")}
                    />
                    {errors.idShip && (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas ingresar un id
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Ingresa precio de envio:</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      onChange={(e) => {}}
                      {...register("priceShip")}
                    />
                    {errors.priceShip && (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas ingresar un precio valido
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Ingresa proveedor de envio:</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      onChange={(e) => {}}
                      {...register("providerShip")}
                    />
                    {errors.providerShip && (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas ingresar un proveedor
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Ingresa track id de envio:</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      onChange={(e) => {}}
                      {...register("trackShip")}
                    />
                    {errors.trackShip && (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas ingresar un track id
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Alguna observacion:</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={3}
                      onChange={(e) => {}}
                      {...register("descriptionShip")}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
            ) : null}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseOrderModal}>
                Despues
              </Button>
              <Button
                variant={onSubmitStatus !== 3 ? "primary" : "success"}
                onClick={handleSubmit((d) => onSubmitOrder(d))}
              >
                Completar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={addressModal}
            onHide={() => setAddressModal(false)}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Enviar a</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {addressLoading ? (
                <Loading />
              ) : (
                address.map((item, index) => {
                  return (
                    <ListGroup key={index}>
                      <ListGroup.Item>
                        <strong>Calle: </strong>
                        {item.street}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Numero: </strong>
                        {item.number}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Numero Interior: </strong>
                        {item.number_interior}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>CP: </strong>
                        {item.cp}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Colonia: </strong>
                        {item.colony}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Ciudad: </strong>
                        {item.city}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Estado: </strong>
                        {item.state}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Descripcion: </strong>
                        {item.descripcion}
                      </ListGroup.Item>
                    </ListGroup>
                  );
                })
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setAddressModal(false)}
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={productModal}
            onHide={() => setProductModal(false)}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {productLoading ? (
                <Loading />
              ) : (
                product.map((item, index) => {
                  return (
                    <ListGroup key={index}>
                      <ListGroup.Item>
                        <strong>ID: </strong>
                        {item.id_products}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Producto: </strong>
                        {decode_utf8(item.name)}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Precio: </strong>
                        {item.price}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Peso: </strong>
                        {item.peso}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Descripcion: </strong>
                        {decode_utf8(item.description)}
                      </ListGroup.Item>
                    </ListGroup>
                  );
                })
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setProductModal(false)}
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          {noSales ? (
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Orden</th>
                        <th scope="col">ConektaID</th>
                        <th scope="col" className="table-secondary">
                          Suscripción
                        </th>
                        <th scope="col" className="table-secondary">
                          Producto
                        </th>
                        <th scope="col" className="table-secondary">
                          Enviar a
                        </th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Estatus</th>
                        <th scope="col">Precio Envio</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sales.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-center">{item.id_orders}</td>
                            <td className="text-center">{item.subs_id}</td>
                            <td className="table-secondary">
                              {subs(item.type)}
                            </td>
                            <td className="table-secondary text-center">
                              {item.id_products ? (
                                <button
                                  className="btn btn-warning btn-sm w-100"
                                  onClick={() =>
                                    renderProduct(item.id_products)
                                  }
                                >
                                  <GiCoffeeBeans /> Ver
                                </button>
                              ) : null}
                            </td>
                            <td className="table-secondary text-center">
                              <button
                                className="btn btn-warning btn-sm w-100"
                                onClick={() => renderAddress(item.id_adress)}
                              >
                                <MdOutlineLocalShipping /> Ver
                              </button>
                            </td>
                            <td className="text-center">
                              {item.first_name + " " + item.last_name}
                            </td>
                            <td className="text-center">
                              {statusOfPackage(item.complete)}
                            </td>
                            <td className="text-center">
                              {item.shipment_price &&
                                "$ " + item.shipment_price}
                            </td>
                            <td className="text-center">
                              {buttonAction(item)}
                            </td>
                          </tr>
                        );
                      })}
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
