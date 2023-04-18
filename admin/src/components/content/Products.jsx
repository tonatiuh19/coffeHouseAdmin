import React, { useEffect, useState } from "react";
import Loading from "../../utilities/Loading";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faImage,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import {
  getUserProducts,
  getCountries,
  updateProducs,
  deactivateProduct,
  getProductImage,
  getTypesProducts,
  newProduct,
} from "../../api/functionApis";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [noProducts, setNoProducts] = useState(true);

  //EditModal
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [weightEdit, setWeightEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [descriptionLongEdit, setLongDescriptionEdit] = useState("");
  const [idCountryEdit, setIdCountryEdit] = useState(0);
  const [priceEdit, setPriceEdit] = useState("");
  const [quantityEdit, setQuantityEdit] = useState(0);
  const [idProductEdit, setIdProductEdit] = useState(0);
  const [idProductTypeEdit, setIdProductTypeEdit] = useState(1);
  const [productSaborEdit, setProductSaborEdit] = useState(0);
  const [productCuerpoEdit, setProductCuerpoEdit] = useState(0);
  const [productAcidezEdit, setProductAcidezEdit] = useState(0);

  const [nameEditValidation, setNameEditValidation] = useState(false);
  const [weightEditValidation, setWeightEditValidation] = useState(false);
  const [descriptionEditValidation, setDescriptionEditValidation] =
    useState(false);
  const [descriptionLongEditValidation, setLongDescriptionEditValidation] =
    useState(false);
  const [priceEditValidation, setPriceEditValidation] = useState(false);
  const [quantityEditValidation, setQuantityEditValidation] = useState(false);

  //NewModal
  const [loadingNew, setLoadingNew] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [titleNew, setTitleNew] = useState("Nuevo producto");
  const [nameNew, setNameNew] = useState("");
  const [descriptionNew, setDescriptionNew] = useState("");
  const [descriptionLongNew, setLongDescriptionNew] = useState("");
  const [idCountryNew, setIdCountryNew] = useState(1);
  const [priceNew, setPriceNew] = useState("");
  const [weightNew, setWeightNew] = useState("");
  const [quantityNew, setQuantityNew] = useState(0);
  const [idProductNew, setIdProductNew] = useState(0);
  const [idProductTypeNew, setIdProductTypeNew] = useState(1);
  const [productSaborNew, setProductSaborNew] = useState(0);
  const [productCuerpoNew, setProductCuerpoNew] = useState(0);
  const [productAcidezNew, setProductAcidezNew] = useState(0);
  const [newProductItem, setNewProductItem] = useState([]);

  const [nameNewValidation, setNameNewValidation] = useState(false);
  const [descriptionNewValidation, setDescriptionNewValidation] =
    useState(false);
  const [descriptionLongNewValidation, setLongDescriptionNewValidation] =
    useState(false);
  const [priceNewValidation, setPriceNewValidation] = useState(false);
  const [weightNewValidation, setWeightNewValidation] = useState(false);
  const [quantityNewValidation, setQuantityNewValidation] = useState(false);

  //DeactivateModal
  const [showCancel, setShowCancel] = useState(false);
  const [idProductDelete, setIdProductDelete] = useState(0);

  //ImageEditModal
  const [showImage, setShowImage] = useState(false);
  const [productImage, setProductImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [idProductImage, setIdProductImage] = useState(0);
  const [errorImage, setErrorImage] = useState(false);
  const [errorImageText, setErrorImageText] = useState("Error");

  //ImageNewAlert
  const [showAlertImgNew, setShowAlertImgNew] = useState(false);

  const handleCloseNew = () => setShowNew(false);

  const handleShowNew = () => {
    setNameNew("");
    setWeightNew('');
    setDescriptionNew("");
    setLongDescriptionNew("");
    setPriceNew("");
    setQuantityNew(0);
    setLoadingNew(true);
    setShowNew(true);
    getCountries()
      .then((x) => {
        setCountries(x);
        getTypesProducts().then((x) => {
          setProductTypes(x);
        });
      })
      .finally(() => {
        setLoadingNew(false);
      });
  };

  const validationNewForm = () => {
    if (nameNew === "") {
      setNameNewValidation(true);
      setFormValidated(true);
      return false;
    } else {
      setNameNewValidation(false);
    }
    if (descriptionNew === "") {
      setDescriptionNewValidation(true);
      setFormValidated(true);
      return false;
    } else {
      setDescriptionNewValidation(false);
    }
    if (descriptionLongNew === "") {
      setLongDescriptionNewValidation(true);
      setFormValidated(true);
      return false;
    } else {
      setLongDescriptionNewValidation(false);
    }
    if (priceNew === "" || priceNew == 0) {
      setPriceNewValidation(true);
      setFormValidated(true);
      return false;
    } else {
      setPriceNewValidation(false);
    }

    if (weightNew === "" || weightNew == 0) {
      setWeightNewValidation(true);
      setFormValidated(true);
      return false;
    } else {
      setWeightNewValidation(false);
    }

    if (quantityNew === "" || quantityNew == 0) {
      setQuantityNewValidation(true);
      setFormValidated(true);
      return false;
    } else {
      setQuantityNewValidation(false);
    }
    setFormValidated(false);
    return true;
  };

  const sendNewForm = () => {
    if (validationNewForm()) {
      setShowNew(false);
      setLoading(true);
      newProduct(
        getUser(),
        nameNew,
        weightNew,
        descriptionNew,
        idProductTypeNew,
        idCountryNew,
        descriptionLongNew,
        quantityNew,
        priceNew,
        productAcidezNew,
        productCuerpoNew,
        productSaborNew
      ).then((x) => {
        getUserProducts(getUser())
          .then((x) => {
            if (x !== "No results") {
              setNoProducts(false);
              setProducts(x);
            } else {
              setNoProducts(true);
            }
          })
          .finally(() => {
            setLoading(false);
            setNewProductItem(x[0]);
            setShowAlertImgNew(true);
          });
      });
    }
  };

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = (item) => {
    setLoadingEdit(true);
    setShowEdit(true);
    getCountries()
      .then((x) => {
        setCountries(x);
        setIdProductTypeEdit(item.id_product_type);
        setProductSaborEdit(item.id_product_f_sabor_types);
        setProductCuerpoEdit(item.id_product_f_cuerpo_types);
        setProductAcidezEdit(item.id_product_f_acidez_types);
        setIdCountryEdit(item.id_country);
        setIdProductEdit(item.id_products);
        setTitleEdit(
          "#" + item.id_products + " " + "-" + " " + decode_utf8(item.name)
        );
        setNameEdit(decode_utf8(item.name));
        setWeightEdit(item.peso);
        setPriceEdit(item.price);
        setQuantityEdit(item.quantity);
        setDescriptionEdit(decode_utf8(item.description));
        setLongDescriptionEdit(decode_utf8(item.long_description));
        getTypesProducts().then((y) => {
          setProductTypes(y);
        });
      })
      .finally(() => {
        setLoadingEdit(false);
      });
  };

  const validationEditForm = () => {
    let rValue = false;
    if (nameEdit === "") {
      setNameEditValidation(true);
      return false;
    } else {
      setNameEditValidation(false);
    }

    if (weightEdit === "") {
      setWeightEditValidation(true);
      return false;
    } else {
      setWeightEditValidation(false);
    }

    if (descriptionEdit === "") {
      setDescriptionEditValidation(true);
      return false;
    } else {
      setDescriptionEditValidation(false);
    }
    if (descriptionLongEdit === "") {
      setLongDescriptionEditValidation(true);
      return false;
    } else {
      setLongDescriptionEditValidation(false);
    }
    if (priceEdit === "" || priceEdit == 0) {
      setPriceEditValidation(true);
      return false;
    } else {
      setPriceEditValidation(false);
    }
    if (quantityEdit === "" || quantityEdit == 0) {
      setQuantityEditValidation(true);
      return false;
    } else {
      setQuantityEditValidation(false);
    }
    return true;
  };

  const sendEditForm = () => {
    if (validationEditForm()) {
      setShowEdit(false);
      setLoading(true);
      updateProducs(
        getUser(),
        nameEdit,
        weightEdit,
        descriptionEdit,
        descriptionLongEdit,
        idCountryEdit,
        priceEdit,
        quantityEdit,
        idProductEdit,
        idProductTypeEdit,
        productAcidezEdit,
        productCuerpoEdit,
        productSaborEdit
      ).then(() => {
        getUserProducts(getUser())
          .then((x) => {
            if (x !== "No results") {
              setNoProducts(false);
              setProducts(x);
            } else {
              setNoProducts(true);
            }
          })
          .finally(() => setLoading(false));
      });
    }
  };

  const handleShowEditImage = (item) => {
    setTitleEdit(
      "#" + item.id_products + " " + "-" + " " + decode_utf8(item.name)
    );
    setImage({ preview: "", raw: "" });
    setShowImage(true);
    setLoadingImage(true);
    setIdProductImage(item.id_products);
    getProductImage(item.id_products)
      .then((x) => setProductImage(x))
      .finally(() => setLoadingImage(false));
  };

  const handleCloseImgNew = () => setShowAlertImgNew(false);

  const handleCloseImage = () => setShowImage(false);

  const handleCloseCancel = () => setShowCancel(false);

  const handleShowCancel = (item) => {
    setShowCancel(true);
    setIdProductDelete(item.id_products);
  };

  const deleteProduct = () => {
    setShowCancel(false);
    setLoading(true);
    deactivateProduct(idProductDelete).then(() => {
      getUserProducts(getUser())
        .then((x) => {
          if (x !== "No results") {
            setNoProducts(false);
            setProducts(x);
          } else {
            setNoProducts(true);
          }
        })
        .finally(() => setLoading(false));
    });
  };

  const getUser = () => {
    const loggedInUser = localStorage.getItem("08191993");
    return loggedInUser;
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("avatar", image.raw);
    formData.append("id_products", idProductImage);

    axios
      .post(
        "https://bolsadecafe.com/dashboard/user/uploadImage.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (res) {
        //console.log('SUCCESS!!', res.data);
        if (res.data.status == 1) {
          getUserProducts(getUser())
            .then((x) => setProducts(x))
            .finally(() => {
              setLoadingImage(false);
              setShowImage(false);
            });
        } else if (res.data.status == 2) {
          setLoadingImage(false);
          setErrorImage(true);
          setErrorImageText("Servicio actualmente no disponible");
        } else if (res.data.status == 3) {
          setLoadingImage(false);
          setErrorImage(true);
          setErrorImageText("El tipo de archivo no es permitido");
        }
      })
      .catch(function () {
        console.log("FAILURE!!");
      });
  };

  useEffect(() => {
    getUserProducts(getUser())
      .then((x) => {
        if (x !== "No results") {
          setNoProducts(false);
          setProducts(x);
        } else {
          setNoProducts(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  function decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }

  const acidezTypes = (x) => {
    if (x == "5") {
      return "5 - Acidez Alta";
    } else if (x == "1") {
      return "1 - Acidez muy baja";
    }
    return x;
  };

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="mt-3">
          <Modal
            show={showAlertImgNew}
            onHide={handleCloseImgNew}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Para que el producto sea visible en BolsaDeCafe, necesitas
                incluir una imagen del producto.
              </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseImgNew}>
                Despues
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowAlertImgNew(false);
                  handleShowEditImage(newProductItem);
                }}
              >
                Subir imagen
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showNew}
            size="lg"
            onHide={handleCloseNew}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{titleNew}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {loadingNew ? (
                <Loading></Loading>
              ) : (
                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre del producto</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Cafe Nuevo, Taza nueva, etc."
                      onChange={(e) => {
                        setNameNew(e.target.value);
                      }}
                    />
                    {nameNewValidation ? (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas incluir un nombre
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Peso del producto en gramos</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="340"
                      onChange={(e) => {
                        setWeightNew(e.target.value);
                      }}
                    />
                    {weightNewValidation ? (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas incluir un peso
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Tipo de producto</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      defaultValue="1"
                      onChange={(e) => {
                        setIdProductTypeNew(e.target.value);
                      }}
                    >
                      <option value="1">Bolsa</option>
                      <option value="3">Paquete</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="validationCustomUsername">
                    <Form.Label>Precio</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">
                          $
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        required
                        placeholder="100"
                        type="number"
                        onChange={(e) => {
                          setPriceNew(e.target.value);
                        }}
                      />
                    </InputGroup>
                    {priceNewValidation ? (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas incluir el precio mayor a 0
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="300"
                      onChange={(e) => {
                        setQuantityNew(e.target.value);
                      }}
                    />
                    {quantityNewValidation ? (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas incluir stock mayor a 0
                      </div>
                    ) : null}
                  </Form.Group>
                  {idProductTypeNew == 1 ? (
                    <>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Cuerpo</Form.Label>
                        <Form.Control
                          required
                          as="select"
                          defaultValue={1}
                          onChange={(e) => {
                            setProductCuerpoNew(e.target.value);
                          }}
                        >
                          {productTypes.map((x) => {
                            if (
                              Object.keys(x)[0] === "id_product_f_cuerpo_types"
                            ) {
                              return (
                                <option
                                  value={x.id_product_f_cuerpo_types}
                                  key={x.id_product_f_cuerpo_types}
                                >
                                  {decode_utf8(x.value)}
                                </option>
                              );
                            }
                          })}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Sabor</Form.Label>
                        <Form.Control
                          required
                          as="select"
                          defaultValue={1}
                          onChange={(e) => {
                            setProductSaborNew(e.target.value);
                          }}
                        >
                          {productTypes.map((x) => {
                            if (
                              Object.keys(x)[0] === "id_product_f_sabor_types"
                            ) {
                              return (
                                <option
                                  value={x.id_product_f_sabor_types}
                                  key={x.id_product_f_sabor_types}
                                >
                                  {decode_utf8(x.value)}
                                </option>
                              );
                            }
                          })}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Acidez</Form.Label>
                        <Form.Control
                          required
                          as="select"
                          defaultValue={1}
                          onChange={(e) => {
                            setProductAcidezNew(e.target.value);
                          }}
                        >
                          {productTypes.map((x) => {
                            if (
                              Object.keys(x)[0] === "id_product_f_acidez_types"
                            ) {
                              return (
                                <option
                                  value={x.id_product_f_acidez_types}
                                  key={x.id_product_f_acidez_types}
                                >
                                  {acidezTypes(x.value)}
                                </option>
                              );
                            }
                          })}
                        </Form.Control>
                      </Form.Group>
                    </>
                  ) : null}

                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Descripción corta del producto</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      placeholder="Descripcion corta donde se describa en menos de 30 caracteres tu producto"
                      rows={3}
                      defaultValue={descriptionNew}
                      onChange={(e) => {
                        setDescriptionNew(e.target.value);
                      }}
                    />
                    {descriptionNewValidation ? (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas incluir una descripcion
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Descripción larga del producto</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={3}
                      placeholder="Descripcion completa del producto"
                      defaultValue={descriptionLongNew}
                      onChange={(e) => {
                        setLongDescriptionNew(e.target.value);
                      }}
                    />
                    {descriptionLongNewValidation ? (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas incluir una descripcion mas amplia
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Pais</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      defaultValue={1}
                      onChange={(e) => {
                        setIdCountryNew(e.target.value);
                      }}
                    >
                      {countries.map((x) => {
                        return (
                          <option value={x.id_country} key={x.id_country}>
                            {decode_utf8(x.country)}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              {formValidated ? (
                <div class="alert alert-danger p-1" role="alert">
                  Necesitas completar todos los campos
                </div>
              ) : null}
              <Button variant="secondary" onClick={handleCloseNew}>
                Cancelar
              </Button>
              <Button variant="success" onClick={() => sendNewForm()}>
                Guardar cambios
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showEdit}
            size="lg"
            onHide={handleCloseEdit}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{titleEdit}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {loadingEdit ? (
                <Loading></Loading>
              ) : (
                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre del producto</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={nameEdit}
                      onChange={(e) => {
                        setNameEdit(e.target.value);
                      }}
                    />
                    {nameEditValidation ? (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas incluir un nombre
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Peso del producto</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      defaultValue={weightEdit}
                      onChange={(e) => {
                        setWeightEdit(e.target.value);
                      }}
                    />
                    {weightEditValidation ? (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas incluir un peso
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="validationCustomUsername">
                    <Form.Label>Precio</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">
                          $
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        required
                        type="number"
                        defaultValue={priceEdit}
                        onChange={(e) => {
                          setPriceEdit(e.target.value);
                        }}
                      />
                    </InputGroup>
                    {priceEditValidation ? (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas incluir el precio mayor a 0
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      defaultValue={quantityEdit}
                      onChange={(e) => {
                        setQuantityEdit(e.target.value);
                      }}
                    />
                    {quantityEditValidation ? (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas incluir stock mayor a 0
                      </div>
                    ) : null}
                  </Form.Group>
                  {idProductTypeEdit == 1 ? (
                    <>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Cuerpo</Form.Label>
                        <Form.Control
                          required
                          as="select"
                          onChange={(e) => {
                            setProductCuerpoEdit(e.target.value);
                          }}
                        >
                          {productTypes.map((x) => {
                            if (
                              Object.keys(x)[0] === "id_product_f_cuerpo_types"
                            ) {
                              if (
                                x.id_product_f_cuerpo_types ===
                                productCuerpoEdit
                              ) {
                                return (
                                  <option
                                    value={x.id_product_f_cuerpo_types}
                                    key={x.id_product_f_cuerpo_types}
                                    selected
                                  >
                                    {decode_utf8(x.value)}
                                  </option>
                                );
                              } else {
                                return (
                                  <option
                                    value={x.id_product_f_cuerpo_types}
                                    key={x.id_product_f_cuerpo_types}
                                  >
                                    {decode_utf8(x.value)}
                                  </option>
                                );
                              }
                            }
                          })}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Sabor</Form.Label>
                        <Form.Control
                          required
                          as="select"
                          onChange={(e) => {
                            setProductSaborEdit(e.target.value);
                          }}
                        >
                          {productTypes.map((x) => {
                            if (
                              Object.keys(x)[0] === "id_product_f_sabor_types"
                            ) {
                              if (
                                x.id_product_f_sabor_types === productSaborEdit
                              ) {
                                return (
                                  <option
                                    value={x.id_product_f_sabor_types}
                                    key={x.id_product_f_sabor_types}
                                    selected
                                  >
                                    {decode_utf8(x.value)}
                                  </option>
                                );
                              } else {
                                return (
                                  <option
                                    value={x.id_product_f_sabor_types}
                                    key={x.id_product_f_sabor_types}
                                  >
                                    {decode_utf8(x.value)}
                                  </option>
                                );
                              }
                            }
                          })}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Acidez</Form.Label>
                        <Form.Control
                          required
                          as="select"
                          onChange={(e) => {
                            setProductAcidezEdit(e.target.value);
                          }}
                        >
                          {productTypes.map((x) => {
                            if (
                              Object.keys(x)[0] === "id_product_f_acidez_types"
                            ) {
                              if (
                                x.id_product_f_acidez_types ===
                                productAcidezEdit
                              ) {
                                return (
                                  <option
                                    value={x.id_product_f_acidez_types}
                                    key={x.id_product_f_acidez_types}
                                    selected
                                  >
                                    {acidezTypes(x.value)}
                                  </option>
                                );
                              } else {
                                return (
                                  <option
                                    value={x.id_product_f_acidez_types}
                                    key={x.id_product_f_acidez_types}
                                  >
                                    {acidezTypes(x.value)}
                                  </option>
                                );
                              }
                            }
                          })}
                        </Form.Control>
                      </Form.Group>
                    </>
                  ) : null}
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Descripción corta del producto</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={3}
                      defaultValue={descriptionEdit}
                      onChange={(e) => {
                        setDescriptionEdit(e.target.value);
                      }}
                    />
                    {descriptionEditValidation ? (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas incluir una descripcion
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Descripción larga del producto</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={3}
                      defaultValue={descriptionLongEdit}
                      onChange={(e) => {
                        setLongDescriptionEdit(e.target.value);
                      }}
                    />
                    {descriptionLongEditValidation ? (
                      <div class="alert alert-danger p-1" role="alert">
                        Necesitas incluir una descripcion mas amplia
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Pais</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      defaultValue={idCountryEdit}
                      onChange={(e) => {
                        setIdCountryEdit(e.target.value);
                      }}
                    >
                      {countries.map((x) => {
                        return (
                          <option value={x.id_country} key={x.id_country}>
                            {decode_utf8(x.country)}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Cancelar
              </Button>
              <Button variant="success" onClick={() => sendEditForm()}>
                Guardar cambios
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showCancel}
            size="lg"
            onHide={handleCloseCancel}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>¿Estas seguro?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCancel}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={() => deleteProduct()}>
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showImage}
            onHide={handleCloseImage}
            backdrop="static"
            size="lg"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{titleEdit}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-auto">
              {loadingImage ? (
                <Loading></Loading>
              ) : (
                <div className="card text-center" style={{ width: "18rem" }}>
                  <label htmlFor="upload-button">
                    {image.preview ? (
                      <img
                        src={image.preview}
                        alt={titleEdit}
                        width="300"
                        height="300"
                      />
                    ) : (
                      <>
                        <img
                          class="card-img-top"
                          src={productImage}
                          alt={titleEdit}
                        />
                        <h5 className="btn btn-primary">
                          Seleccionar nueva imagen
                        </h5>
                        <p>Solo se permiten archivos jpg & png.</p>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    id="upload-button"
                    style={{ display: "none" }}
                    onChange={handleChangeImage}
                  />
                  <br />
                  {errorImage ? (
                    <div class="alert alert-danger" role="alert">
                      {errorImageText}
                    </div>
                  ) : null}
                  <button
                    className="btn btn-success"
                    onClick={handleUploadImage}
                  >
                    Guardar cambios
                  </button>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseImage}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>
          {noProducts ? (
            <div className="container loadingFull">
              <div className="row text-center">
                <div className="col-sm-12">
                  <h3>Aun no tienes productos</h3>
                </div>
                <div className="col-sm-12">
                  <p>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleShowNew()}
                    >
                      + Añadir producto
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <button
                      className="btn btn-outline-success float-right"
                      onClick={() => handleShowNew()}
                    >
                      + Nuevo producto
                    </button>
                  </div>
                  <div className="col-sm-12">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">id</th>
                          <th scope="col">Titulo</th>
                          <th scope="col">Precio</th>
                          <th scope="col">Peso</th>
                          <th
                            scope="col"
                            className="text-center bg-dark text-white"
                          >
                            Stock
                          </th>
                          <th scope="col">Lugar</th>
                          <th scope="col">Editar</th>
                          <th scope="col">Imagen</th>
                          <th scope="col">Eliminar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">
                                {item.active === 2 ? (
                                  <FontAwesomeIcon
                                    icon={faExclamationTriangle}
                                    className="text-warning"
                                  />
                                ) : (
                                  item.id_products
                                )}
                              </th>
                              <td>
                                {item.active === 2
                                  ? decode_utf8(item.name) +
                                    " (Producto sin imagen)"
                                  : decode_utf8(item.name)}
                              </td>
                              <td>$ {item.price}</td>
                              <td>{item.peso} gr</td>
                              <td className="text-center bg-dark text-white">
                                {item.quantity === 0 ? (
                                  <span className="btn btn-warning btn-sm">
                                    Agotado
                                  </span>
                                ) : (
                                  item.quantity
                                )}
                              </td>
                              <td>{decode_utf8(item.country)}</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleShowEdit(item)}
                                >
                                  <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleShowEditImage(item)}
                                >
                                  <FontAwesomeIcon icon={faImage} />
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleShowCancel(item)}
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
