import React, {useEffect, useState} from 'react'
import Loading from '../../utilities/Loading';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Flag from 'react-world-flags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faImage } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { getUserProducts, getCountries, updateProducs, deactivateProduct, getProductImage, uploadFile } from '../../api/functionApis'

const Products = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [countries, setCountries] = useState([]);
    const [user, setUser] = useState('');
    const [error, setError] = useState(false);
    const [erroMessage, setErrorMessage] = useState('');

    //EditModal
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [titleEdit, setTitleEdit] = useState('');
    const [nameEdit, setNameEdit] = useState('');
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [descriptionLongEdit, setLongDescriptionEdit] = useState('');
    const [idCountryEdit, setIdCountryEdit] = useState(0);
    const [priceEdit, setPriceEdit] = useState('');
    const [quantityEdit, setQuantityEdit] = useState(0);
    const [idProductEdit, setIdProductEdit] = useState(0);

    const [nameEditValidation, setNameEditValidation] = useState(false);
    const [descriptionEditValidation, setDescriptionEditValidation] = useState(false);
    const [descriptionLongEditValidation, setLongDescriptionEditValidation] = useState(false);
    const [priceEditValidation, setPriceEditValidation] = useState(false);
    const [quantityEditValidation, setQuantityEditValidation] = useState(false);

    //DeactivateModal
    const [showCancel, setShowCancel] = useState(false);
    const [idProductDelete, setIdProductDelete] = useState(0);

    //ImageModal
    const [showImage, setShowImage] = useState(false);
    const [productImage, setProductImage] = useState('');
    const [loadingImage, setLoadingImage] = useState(false);
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [idProductImage, setIdProductImage] = useState(0);
    const [errorImage, setErrorImage] = useState(false);
    const [errorImageText, setErrorImageText] = useState('Error');

    const handleCloseEdit = () => setShowEdit(false);

    const handleShowEdit = (item) => {
        setLoadingEdit(true);
        setShowEdit(true);
        getCountries().then((x) => {
            setCountries(x);
            setIdCountryEdit(item.id_country);
            setIdProductEdit(item.id_products);
            setTitleEdit('#'+item.id_products+' '+'-'+' '+decode_utf8(item.name));
            setNameEdit(decode_utf8(item.name));
            setPriceEdit(item.price);
            setQuantityEdit(item.quantity);
            setDescriptionEdit(decode_utf8(item.description));
            setLongDescriptionEdit(decode_utf8(item.long_description));
        }).finally(() => {setLoadingEdit(false)});
    };

    const validationEditForm = () =>{
        let rValue = false;
        if(nameEdit === ''){
            setNameEditValidation(true);
            return false;
        }else{
            setNameEditValidation(false);
        }
        if(descriptionEdit === ''){
            setDescriptionEditValidation(true);
            return false;
        }else{
            setDescriptionEditValidation(false);
        }
        if(descriptionLongEdit === ''){
            setLongDescriptionEditValidation(true);
            return false;
        }else{
            setLongDescriptionEditValidation(false);
        }
        if(priceEdit === '' || priceEdit == 0){
            setPriceEditValidation(true);
            return false;
        }else{
            setPriceEditValidation(false);
        }
        if(quantityEdit === '' || quantityEdit == 0){
            setQuantityEditValidation(true);
            return false;
        }else{
            setQuantityEditValidation(false);
        }
        return true;
    };

    const sendEditForm = () =>{
        if(validationEditForm()){
            setShowEdit(false);
            setLoading(true);
            updateProducs(getUser(), nameEdit, descriptionEdit, descriptionLongEdit, idCountryEdit, priceEdit, quantityEdit, idProductEdit).then(() => {
                getUserProducts(getUser()).then((x) => setProducts(x)).finally(() => setLoading(false));
            });
        }
    };

    const handleShowEditImage = (item) =>{
        setTitleEdit('#'+item.id_products+' '+'-'+' '+decode_utf8(item.name));
        setImage({ preview: "", raw: "" });
        setShowImage(true);
        setLoadingImage(true);
        setIdProductImage(item.id_products);
        getProductImage(item.id_products).then((x) => setProductImage(x)).finally(() => setLoadingImage(false));
    }

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
            getUserProducts(getUser()).then((x) => setProducts(x)).finally(() => setLoading(false));
        });
    };

    const getUser = () =>{
        const loggedInUser = localStorage.getItem("08191993");
        return loggedInUser;
    };

    const handleChangeImage = e => {
        if (e.target.files.length) {
          setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
          });
        }
    };

    const handleUploadImage = async e => {
        e.preventDefault();
        setLoadingImage(true);
        const formData = new FormData();
        formData.append("avatar", image.raw);
        formData.append("id_products", idProductImage);
        
        axios.post( 'http://localhost:8016/dashboard/user/uploadImage.php',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(res){
          //console.log('SUCCESS!!', res.data);
          if(res.data.status == 1){
            setLoadingImage(false);
            getUserProducts(getUser()).then((x) => setProducts(x)).finally(() => {
                setLoadingImage(false);
                setShowImage(false);
            });
          }else if(res.data.status == 2){
            setLoadingImage(false);
            setErrorImage(true);
            setErrorImageText('Servicio actualmente no disponible');
          }else if(res.data.status == 3){
            setLoadingImage(false);
            setErrorImage(true);
            setErrorImageText('El tipo de archivo no es permitido');
          }
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
    };

    useEffect(() => {
        getUserProducts(getUser()).then((x) => setProducts(x)).finally(() => setLoading(false));
    }, []);

    
    function decode_utf8(s) {
        return decodeURIComponent(escape(s));
    }

    return (
        <div>
            {loading ? 
            (<Loading></Loading>) : 
            (<div className="mt-3">
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
                        {loadingEdit ? (<Loading></Loading>) : 
                        (<Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Nombre del producto</Form.Label>
                                <Form.Control required type="text" defaultValue={nameEdit} onChange={e => {setNameEdit(e.target.value)}} />
                                {nameEditValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir un nombre</div>) : null}
                            </Form.Group>
                            <Form.Group controlId="validationCustomUsername">
                                <Form.Label>Precio</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        required
                                        type="number"
                                        defaultValue={priceEdit}
                                        onChange={e => {setPriceEdit(e.target.value)}}
                                    />
                                </InputGroup>
                                {priceEditValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir el precio mayor a 0</div>) : null}
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control required type="number" defaultValue={quantityEdit} onChange={e => {setQuantityEdit(e.target.value)}} />
                                {quantityEditValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir stock mayor a 0</div>) : null}
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Descripción corta del producto</Form.Label>
                                <Form.Control required as="textarea" rows={3} defaultValue={descriptionEdit} onChange={e => {setDescriptionEdit(e.target.value)}} />
                                {descriptionEditValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir una descripcion</div>) : null}
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Descripción larga del producto</Form.Label>
                                <Form.Control required as="textarea" rows={3} defaultValue={descriptionLongEdit} onChange={e => {setLongDescriptionEdit(e.target.value)}} />
                                {descriptionLongEditValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir una descripcion mas amplia</div>) : null}
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Pais</Form.Label>
                                <Form.Control required as="select" defaultValue={idCountryEdit} onChange={e => {setIdCountryEdit(e.target.value)}}>
                                    {countries.map((x) => {
                                        return (<option value={x.id_country} key={x.id_country}>{decode_utf8(x.country)}</option>);
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form>)}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                            Cancelar
                        </Button>
                        <Button variant="success" onClick={() => sendEditForm()}>Guardar cambios</Button>
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
                    <Button variant="danger" onClick={() => deleteProduct()}>Eliminar</Button>
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
                        {loadingImage ? (<Loading></Loading>) 
                        : (<div className="card text-center" style={{width: "18rem"}}>
                            <label htmlFor="upload-button">
                              {image.preview ? (
                                <img src={image.preview} alt={titleEdit} width="300" height="300" />
                              ) : (
                                <>
                                  <img class="card-img-top" src={productImage} alt={titleEdit} />
                                  <h5 className="btn btn-primary">Seleccionar nueva imagen</h5>
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
                            {errorImage ? (<div class="alert alert-danger" role="alert">{errorImageText}</div>) : null}
                            <button className="btn btn-success" onClick={handleUploadImage}>Guardar cambios</button>
                          </div>)}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseImage}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="container">
                    <div className="row">
                    
                        <div className="col-sm-12"><button className="btn btn-outline-success float-right">+ Nuevo producto</button></div>
                        <div className="col-sm-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">Titulo</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Lugar</th>
                                        <th scope="col">Editar</th>
                                        <th scope="col">Imagen</th>
                                        <th scope="col">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { products.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <th scope="row">{item.id_products}</th>
                                            <td>{decode_utf8(item.name)}</td>
                                            <td>$ {item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{decode_utf8(item.country)}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => handleShowEdit(item)}>
                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-success" onClick={() => handleShowEditImage(item)}>
                                                    <FontAwesomeIcon icon={faImage} />
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => handleShowCancel(item)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                    })
                                }      
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                    
                    
            </div>    
            )}
            
        </div>
    )
}

export default Products
