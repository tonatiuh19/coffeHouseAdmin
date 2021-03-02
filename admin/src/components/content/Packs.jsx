import React, {useState, useEffect} from 'react';
import Loading from '../../utilities/Loading';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faImage, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { getUserPacks, getCountUserProducts, getUserProducts } from '../../api/functionApis';

const Packs = () => {
    const [loading, setLoading] = useState(false);
    const [noPacks, setNoPacks] = useState(true);
    const [packs, setPacks] = useState([]);
    const [productsCount, setProductsCount] = useState(false);
    const [products, setProducts] = useState([]);
    const [productsToAdd, setProductsToAdd] = useState([]);

    //NewPack
    const [showNew, setShowNew] = useState(false);
    const [loadingNew, setLoadingNew] = useState(false);
    const [nameNew, setNameNew] = useState('');
    const [priceNew, setPriceNew] = useState('');
    const [descriptionNew, setDescriptionNew] = useState('');
    const [longDescriptionNew, setLongDescriptionNew] = useState('');
    const [productPack, setProductPack] = useState({});

    const [formValidated, setFormValidated] = useState(false);
    const [nameNewValidation, setNameNewValidation] = useState(false);
    const [priceNewValidation, setPriceNewValidation] = useState(false);
    const [descriptionNewValidation, setDescriptionNewValidation] = useState(false);
    const [descriptionLongNewValidation, setDescriptionLongNewValidation] = useState(false);
    const [stockEmpty, setStockEmpty] = useState(false);

    const getUser = () =>{
        const loggedInUser = localStorage.getItem("08191993");
        return loggedInUser;
    };

    const handleCloseNew = () => setShowNew(false);

    const handleShowNew = () =>{
        setNameNew('');
        setPriceNew('');
        setDescriptionNew('');
        setLongDescriptionNew('');
        setProducts([]);
        setProductsToAdd([]);
        setShowNew(true);
        setLoadingNew(true);
        getUserProducts(getUser()).then((x) =>{
            setProducts(x);
        }).finally(() => setLoadingNew(false));

    };

    const validateNewForm = () =>{
        if(nameNew === ''){
            setNameNewValidation(true);
            setFormValidated(true);
            return false;
        }else{
            setNameNewValidation(false);
        }
        if(priceNew === '' && priceNew <= 0){
            setPriceNewValidation(true);
            setFormValidated(true);
            return false;
        }else{
            setPriceNewValidation(false);
        }
        if(descriptionNew === ''){
            setDescriptionNewValidation(true);
            setFormValidated(true);
            return false;
        }else{
            setDescriptionNewValidation(false);
        }
        if(longDescriptionNew === ''){
            setDescriptionLongNewValidation(true);
            setFormValidated(true);
            return false;
        }else{
            setDescriptionLongNewValidation(false);
        }
        if(!(productsToAdd.length >= 2)){
            setFormValidated(true);
            return false;
        }
        for(let key in productsToAdd){
            if(productsToAdd[key].validated === true || productsToAdd[key].stock == 0){
                setStockEmpty(true);
                setFormValidated(true);
                return false;
            }
        }
        setStockEmpty(false);
        setFormValidated(false);
        return true;
    }

    const sendNewForm = () =>{
        if(validateNewForm()){
            console.log("Me fui");
        }
    }

    const validateQuantity = (value, idProduct, quantity) =>{
        //setProducts([...products, prd]);
        setProductsToAdd((productsToAdd) => {
            let prd = productsToAdd;
            for(let key in prd){
                if(prd[key].id_products == idProduct){
                    if(value > Number(prd[key].quantity)){
                        prd[key].validated = true;
                        prd[key].stock = 0;
                    }else{
                        prd[key].validated = false;
                        prd[key].stock = value;
                    }
                }
            }
            return [...prd];
        });
        console.log(productsToAdd);
    };

    const addProducts = (item) =>{
        
        let idProducts = item.split("|")[0];
        let name = (item.split("|")[1]).split("/")[0];
        let quantity = (item.split("|")[1]).split("/")[1];
        //console.log("id", idProducts, "name", name, "qty", quantity);
        setProductsToAdd([...productsToAdd, {
            id_products: idProducts,
            name: name,
            quantity: quantity,
            stock: 0,
        }]);
        setProducts((products) => {
            let prd = [];
            for(let key in products){
                if(products[key].id_products != idProducts){
                    prd.push(products[key]);
                }
            }
            return [...prd];
        });

    };


    useEffect(() => {
        getUserPacks(getUser()).then((x) => {
            if(x !== 'No results'){
                setNoPacks(false);
                setPacks(x);
            }else{
                setNoPacks(true);
            }
            getCountUserProducts(getUser()).then((y) =>{
                if(y[0].count !== 0){
                    setProductsCount(false);
                }else{
                    setProductsCount(true);
                }
            })
        }).finally(() => setLoading(false));
    }, []);

    function decode_utf8(s) {
        return decodeURIComponent(escape(s));
    }

    return (
        <div>
            <div className="mt-3">
                {loading ? (<Loading></Loading>) : 
                (
                    <>
                    <Modal
                        show={showNew}
                        size="lg"
                        onHide={handleCloseNew}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                                    <Modal.Title>Nuevo paquete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {loadingNew ? (<Loading></Loading>) : 
                            (<Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nombre del paquete</Form.Label>
                                    <Form.Control type="text" placeholder="Paquete de primavera, Paquete especial" onChange={e => {setNameNew(e.target.value)}} />
                                    {nameNewValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir un nombre</div>) : null}
                                </Form.Group>
                                <Form.Group controlId="validationCustomUsername">
                                    <Form.Label>Precio</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            placeholder="100"
                                            type="number"
                                            onChange={e => {setPriceNew(e.target.value)}}
                                        />
                                    </InputGroup>
                                    {priceNewValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir el precio mayor a 0</div>) : null}
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Descripción corta del paquete</Form.Label>
                                    <Form.Control as="textarea" placeholder="Descripcion corta donde se describa en menos de 30 caracteres tu paquete" rows={3} onChange={e => {setDescriptionNew(e.target.value)}} />
                                    {descriptionNewValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir una descripcion</div>) : null}
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Descripción larga del producto</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Descripcion completa del paquete" onChange={e => {setLongDescriptionNew(e.target.value)}} />
                                    {descriptionLongNewValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir una descripcion mas amplia</div>) : null}
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Incluir productos</Form.Label>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Control required as="select" onChange={e => {
                                                        //console.log(e.target.value);
                                                        setProductPack(e.target.value);
                                                    }}>
                                                        <option value={0}>Selecciona un producto...</option>
                                                        {products.map((x) => {
                                                            return (<option value={x.id_products+'|'+decode_utf8(x.name)+'/'+x.quantity} key={x.id_products}>{decode_utf8(x.name)}</option>);
                                                        })}
                                                    </Form.Control>
                                                    
                                                </Form.Group>
                                                <button type="button" className="btn btn-primary btn-sm" onClick={() => addProducts(productPack)}>Añadir</button>
                                            </div>
                                            <div className="col-sm-2"></div>
                                            <div className="col-sm-6">
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Col sm="7">
                                                        <b>Producto</b>
                                                    </Col>
                                                    <Col sm="5">
                                                        <b>Cantidad</b>
                                                    </Col>
                                                </Form.Group>
                                                {productsToAdd.map((x, index) => {
                                                    //console.log(x);
                                                    return (<div key={index}><Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Col sm="7">
                                                            {x.name}
                                                        </Col>
                                                        <Col sm="5">
                                                            <Form.Control type="number" placeholder={x.quantity} max={x.quantity} onChange={e => {validateQuantity(e.target.value, x.id_products, x.quantity)}} />
                                                            {x.validated ? (<div class="alert alert-warning" role="alert">La cantidad no puede ser mayor al stock</div>) : null}
                                                        </Col>
                                                    </Form.Group></div>);
                                                })}
                                                {stockEmpty ? (<div class="alert alert-warning" role="alert">Te faltan campos</div>) : null}
                                            </div>
                                        </div>
                                    </div>
                                </Form.Group>
                               
                            </Form>)}
                        </Modal.Body>
                        <Modal.Footer>
                            {formValidated ? (<div class="alert alert-danger p-1" role="alert">Necesitas completar todos los campos</div>) : null }
                            {productsToAdd.length >= 2 ? null : (<div class="alert alert-danger p-1" role="alert">Necesitas agregar mas de dos productos</div>) }
                            <Button variant="secondary" onClick={handleCloseNew}>
                                Cancelar
                            </Button>
                            <Button variant="success" onClick={() => sendNewForm()}>Guardar cambios</Button>
                        </Modal.Footer>
                    </Modal>
                    {noPacks ? (<div className="container loadingFull">
                        <div className="row text-center">
                            <div className="col-sm-12"><h3>En esta seccion podras crear paquetes de tus propios productos e incrementar tus ventas</h3></div>
                            <div className="col-sm-12">
                                <p>
                                    {productsCount ? (<span className="btn btn-warning">No puedes añadir paquetes sin productos activos</span>) : 
                                    (<button className="btn btn-outline-success" onClick={() => handleShowNew()}>+ Añadir paquete</button>)}
                                </p>
                            </div>
                        </div>
                    </div>) : 
                    (<div className="container">
                        <div className="row">
                            <div className="col-sm-12"><button className="btn btn-outline-success float-right" onClick={() => handleShowNew()}>+ Nuevo paquete</button></div>
                            <div className="col-sm-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">id</th>
                                            <th scope="col">Titulo</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col" className="text-center bg-dark text-white">Stock</th>
                                            <th scope="col">Editar</th>
                                            <th scope="col">Imagen</th>
                                            <th scope="col">Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { packs.map((item, index) => {
                                        return(
                                            <tr key={index} >
                                                <th scope="row">{item.active === 2 ? (<FontAwesomeIcon icon={faExclamationTriangle} className="text-warning" />) : item.id_products}</th>
                                                <td>{item.active === 2 ? decode_utf8(item.name)+' (Producto sin imagen)' : decode_utf8(item.name)}</td>
                                                <td>$ {item.price}</td>
                                                <td className="text-center bg-dark text-white">{item.quantity === 0 ? (<span className="btn btn-warning btn-sm">Agotado</span>) : item.quantity}</td>
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => console.log("Edit")}>
                                                        <FontAwesomeIcon icon={faPencilAlt} />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-success" onClick={() => console.log("Edit image")}>
                                                        <FontAwesomeIcon icon={faImage} />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => console.log("Delete")}>
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
                    </div>)}
                    </>
                    
                )}
                
            </div>
        </div>
    )
}

export default Packs
