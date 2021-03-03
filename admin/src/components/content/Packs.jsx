import React, {useState, useEffect} from 'react';
import Loading from '../../utilities/Loading';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faImage, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { getUserPacks, getCountUserProducts, getUserProducts, newPack, newPackProductsIds, getProductImage, deactivateProduct, getPacksUserProductsIds, updatePack, updatePackProductsIds } from '../../api/functionApis';

const Packs = () => {
    const [loading, setLoading] = useState(true);
    const [noPacks, setNoPacks] = useState(true);
    const [packs, setPacks] = useState([]);
    const [productsCount, setProductsCount] = useState(false);
    const [products, setProducts] = useState([]);
    const [productsToAdd, setProductsToAdd] = useState([]);
    const [titleModal, setTitleModal] = useState([]);

    //NewPack
    const [showNew, setShowNew] = useState(false);
    const [loadingNew, setLoadingNew] = useState(false);
    const [nameNew, setNameNew] = useState('');
    const [priceNew, setPriceNew] = useState('');
    const [descriptionNew, setDescriptionNew] = useState('');
    const [longDescriptionNew, setLongDescriptionNew] = useState('');
    const [productPack, setProductPack] = useState({});
    const [quantityNew, setQuantityNew] = useState(0);
    const [newPackItem, setNewPackItem] = useState([]);

    const [formValidated, setFormValidated] = useState(false);
    const [nameNewValidation, setNameNewValidation] = useState(false);
    const [priceNewValidation, setPriceNewValidation] = useState(false);
    const [descriptionNewValidation, setDescriptionNewValidation] = useState(false);
    const [descriptionLongNewValidation, setDescriptionLongNewValidation] = useState(false);
    const [quantityNewValidation, setQuantityNewValidation] = useState(false);
    const [stockEmpty, setStockEmpty] = useState(false);

    //ImgHandling
    const [showAlertImgNew, setShowAlertImgNew] = useState(false);
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [showImage, setShowImage] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const [idProductImage, setIdProductImage] = useState(0);
    const [productImage, setProductImage] = useState('');
    const [errorImageText, setErrorImageText] = useState('Error');
    const [errorImage, setErrorImage] = useState(false);

    //DeactivateModal
    const [showCancel, setShowCancel] = useState(false);
    const [idProductDelete, setIdProductDelete] = useState(0);

    //EditPack
    const [showEdit, setShowEdit] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [nameEdit, setNameEdit] = useState('');
    const [priceEdit, setPriceEdit] = useState('');
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [longDescriptionEdit, setLongDescriptionEdit] = useState('');
    const [productPackEdit, setProductPackEdit] = useState({});
    const [quantityEdit, setQuantityEdit] = useState(0);
    const [idPack, setIdPack] = useState(0);

    const [formValidatedEdit, setFormValidatedEdit] = useState(false);
    const [nameEditValidation, setNameEditValidation] = useState(false);
    const [priceEditValidation, setPriceEditValidation] = useState(false);
    const [descriptionEditValidation, setDescriptionEditValidation] = useState(false);
    const [descriptionLongEditValidation, setDescriptionLongEditValidation] = useState(false);
    const [quantityEditValidation, setQuantityEditValidation] = useState(false);
    const [stockEmptyEdit, setStockEmptyEdit] = useState(false);

    const getUser = () =>{
        const loggedInUser = localStorage.getItem("08191993");
        return loggedInUser;
    };

    const handleCloseImgNew = () => setShowAlertImgNew(false);

    const handleShowEditImage = (item) =>{
        setTitleModal('#'+item.id_products+' '+'-'+' '+decode_utf8(item.name));
        setImage({ preview: "", raw: "" });
        setShowImage(true);
        setLoadingImage(true);
        setIdProductImage(item.id_products);
        getProductImage(item.id_products).then((x) => setProductImage(x)).finally(() => setLoadingImage(false));
    }

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
        
        axios.post( 'https://tienditacafe.com/dashboard/user/uploadImage.php',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(res){
          //console.log('SUCCESS!!', res.data);
          if(res.data.status == 1){
            //setLoadingImage(false);
            getUserPacks(getUser()).then((x) => {
                if(x !== 'No results'){
                    setNoPacks(false);
                    setPacks(x);
                }else{
                    setNoPacks(true);
                }
            }).finally(() => {
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

    const handleShowCancel = (item) => {
        setShowCancel(true);
        setIdProductDelete(item.id_products);
    };

    const deleteProduct = () => {
        setShowCancel(false);
        setLoading(true);
        deactivateProduct(idProductDelete).then(() => {
            getUserPacks(getUser()).then((x) => {
                if(x !== 'No results'){
                    setNoPacks(false);
                    setPacks(x);
                }else{
                    setNoPacks(true);
                }
            }).finally(() => setLoading(false));
        });
    };

    const handleShowEdit = (item) => {
        setLoadingEdit(true);
        setShowEdit(true);
        getUserProducts(getUser()).then((y) =>{
            setProducts(y);
        }).then(() => {
            getPacksUserProductsIds(item.id_products).then((x) =>{
                let prdAdd = [];
                for(let key in x){
                    prdAdd.push({
                        id_products: x[key].id_products,
                        name: x[key].name,
                        quantity: x[key].quantity,
                        stock: x[key].stock,
                    });
                    
                    setProducts((products) => {
                        let prd = [];
                        for(let keyy in products){
                            if(products[keyy].id_products != x[key].id_products){
                                prd.push(products[keyy]);
                            }
                        }
                        return [...prd];
                    });

                }
                setProductsToAdd(prdAdd);
                setTitleModal('#'+item.id_products+' '+'-'+' '+decode_utf8(item.name));
                setNameEdit(item.name);
                setPriceEdit(item.price);
                setQuantityEdit(item.quantity);
                setDescriptionEdit(item.description);
                setLongDescriptionEdit(item.long_description);
                setIdPack(item.id_products);
            });
        }).finally(() => {
            
            setLoadingEdit(false);
        });
        
        
    };

    const handleCloseEdit = () => setShowEdit(false);

    const handleCloseCancel = () => setShowCancel(false);

    const handleCloseImage = () => setShowImage(false);

    const handleCloseNew = () => setShowNew(false);

    const handleShowNew = () =>{
        setNameNew('');
        setPriceNew('');
        setDescriptionNew('');
        setLongDescriptionNew('');
        setProducts([]);
        setProductsToAdd([]);
        setQuantityNew(0);
        setShowNew(true);
        setLoadingNew(true);
        getUserProducts(getUser()).then((x) =>{
            setProducts(x);
        }).finally(() => setLoadingNew(false));

    };

    const validateEditForm = () =>{
        if(nameEdit === ''){
            setNameEditValidation(true);
            setFormValidatedEdit(true);
            return false;
        }else{
            setNameEditValidation(false);
        }
        if(priceEdit === '' && priceEdit <= 0){
            setPriceEditValidation(true);
            setFormValidatedEdit(true);
            return false;
        }else{
            setPriceEditValidation(false);
        }
        if(quantityEdit === '' && quantityEdit <= 0){
            setQuantityEditValidation(true);
            setFormValidatedEdit(true);
            return false;
        }else{
            setQuantityEditValidation(false);
        }
        if(descriptionEdit === ''){
            setDescriptionEditValidation(true);
            setFormValidatedEdit(true);
            return false;
        }else{
            setDescriptionEditValidation(false);
        }
        if(longDescriptionEdit === ''){
            setDescriptionLongEditValidation(true);
            setFormValidatedEdit(true);
            return false;
        }else{
            setDescriptionLongEditValidation(false);
        }
        if(!(productsToAdd.length >= 2)){
            setFormValidatedEdit(true);
            return false;
        }
        for(let key in productsToAdd){
            if(productsToAdd[key].validated === true || productsToAdd[key].stock == 0){
                setStockEmptyEdit(true);
                setFormValidatedEdit(true);
                return false;
            }
        }
        setStockEmptyEdit(false);
        setFormValidatedEdit(false);
        return true;
    };

    const promisesProductsPackEdit = (idCampaign) =>{
        let promises = [];
        for(let key in productsToAdd){
            promises.push(updatePackProductsIds(productsToAdd[key].id_products, idCampaign, productsToAdd[key].stock));
        }
        return promises;
    };

    const sendEditForm = () =>{
        if(validateEditForm()){
            setShowEdit(false);
            setLoading(true);
            updatePack(getUser(), idPack, nameEdit, descriptionEdit, longDescriptionEdit, quantityEdit, priceEdit).then((x) =>{
                setNewPackItem(x[0]);
                Promise.all(promisesProductsPack(idPack)).then(function (results) {
                    getUserPacks(getUser()).then((x) => {
                        if(x !== 'No results'){
                            setNoPacks(false);
                            setPacks(x);
                        }else{
                            setNoPacks(true);
                        }
                    }).finally(() => {
                        setLoading(false);
                    });
                });
            })
        }
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
        if(quantityNew === '' && quantityNew <= 0){
            setQuantityNewValidation(true);
            setFormValidated(true);
            return false;
        }else{
            setQuantityNewValidation(false);
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
    };

    const promisesProductsPack = (idCampaign) =>{
        let promises = [];
        for(let key in productsToAdd){
            promises.push(newPackProductsIds(productsToAdd[key].id_products, idCampaign, productsToAdd[key].stock));
        }
        return promises;
    };

    const sendNewForm = () =>{
        if(validateNewForm()){
            setShowNew(false);
            setLoading(true);
            newPack(getUser(), nameNew, descriptionNew, longDescriptionNew, quantityNew, priceNew).then((x) =>{
                setNewPackItem(x[0]);
                Promise.all(promisesProductsPack(x[0].id_products)).then(function (results) {
                    for(let key in results){
                        if(results[key] != 1){
                            console.log("Error");
                        }
                    }
                    getUserPacks(getUser()).then((x) => {
                        if(x !== 'No results'){
                            setNoPacks(false);
                            setPacks(x);
                        }else{
                            setNoPacks(true);
                        }
                    }).finally(() => {
                        setLoading(false);
                        setShowAlertImgNew(true);
                    });
                });
            });
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
        //console.log(productsToAdd);
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
                        show={showEdit}
                        size="lg"
                        onHide={handleCloseEdit}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{titleModal}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {loadingEdit ? (<Loading></Loading>) : 
                            (<Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nombre del paquete</Form.Label>
                                    <Form.Control type="text" placeholder="Paquete de primavera, Paquete especial" value={nameEdit} onChange={e => {setNameEdit(e.target.value)}} />
                                    {nameEditValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir un nombre</div>) : null}
                                </Form.Group>
                                <Form.Group controlId="validationCustomUsername">
                                    <Form.Label>Precio</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            placeholder="100"
                                            value={priceEdit}
                                            type="number"
                                            onChange={e => {setPriceEdit(e.target.value)}}
                                        />
                                    </InputGroup>
                                    {priceEditValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir el precio mayor a 0</div>) : null}
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Stock del paquete</Form.Label>
                                    <Form.Control required type="number" placeholder="10" value={quantityEdit} onChange={e => {setQuantityEdit(e.target.value)}} />
                                    {quantityEditValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir stock mayor a 0</div>) : null}
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Descripción corta del paquete</Form.Label>
                                    <Form.Control as="textarea" placeholder="Descripcion corta donde se describa en menos de 30 caracteres tu paquete" value={descriptionEdit} rows={3} onChange={e => {setDescriptionEdit(e.target.value)}} />
                                    {descriptionEditValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir una descripcion</div>) : null}
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Descripción larga del producto</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Descripcion completa del paquete" value={longDescriptionEdit} onChange={e => {setLongDescriptionEdit(e.target.value)}} />
                                    {descriptionLongEditValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir una descripcion mas amplia</div>) : null}
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Incluir productos</Form.Label>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Control required as="select" onChange={e => {
                                                        //console.log(e.target.value);
                                                        setProductPackEdit(e.target.value);
                                                    }}>
                                                        <option value={0}>Selecciona un producto...</option>
                                                        {products.map((x) => {
                                                            return (<option value={x.id_products+'|'+decode_utf8(x.name)+'/'+x.quantity} key={x.id_products}>{decode_utf8(x.name)}</option>);
                                                        })}
                                                    </Form.Control>
                                                    
                                                </Form.Group>
                                                <button type="button" className="btn btn-primary btn-sm" onClick={() => addProducts(productPackEdit)}>Añadir</button>
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
                                                            {decode_utf8(x.name)}
                                                        </Col>
                                                        <Col sm="5">
                                                            <Form.Control type="number" placeholder={x.quantity} max={x.quantity} value={x.stock} onChange={e => {validateQuantity(e.target.value, x.id_products, x.quantity)}} />
                                                            {x.validated ? (<div class="alert alert-warning" role="alert">La cantidad no puede ser mayor al stock</div>) : null}
                                                        </Col>
                                                    </Form.Group></div>);
                                                })}
                                                {stockEmptyEdit ? (<div class="alert alert-warning" role="alert">Te faltan campos</div>) : null}
                                            </div>
                                        </div>
                                    </div>
                                </Form.Group>
                               
                            </Form>)}
                        </Modal.Body>
                        <Modal.Footer>
                            {formValidatedEdit ? (<div class="alert alert-danger p-1" role="alert">Necesitas completar todos los campos</div>) : null }
                            {productsToAdd.length >= 2 ? null : (<div class="alert alert-danger p-1" role="alert">Necesitas agregar mas de dos productos</div>) }
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
                            <Modal.Title>{titleModal}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="mx-auto">
                            {loadingImage ? (<Loading></Loading>) 
                            : (<div className="card text-center" style={{width: "18rem"}}>
                                <label htmlFor="upload-button">
                                {image.preview ? (
                                    <img src={image.preview} alt={titleModal} width="300" height="300" />
                                ) : (
                                    <>
                                    <img class="card-img-top" src={productImage} alt={titleModal} />
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

                    <Modal 
                        show={showAlertImgNew} 
                        onHide={handleCloseImgNew} 
                        backdrop="static" 
                        keyboard={false}>
                        <Modal.Header closeButton>
                        <Modal.Title>Para que el paquete sea visible en TienditaCafe, necesitas incluir una imagen del conjunto.</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseImgNew}>
                                Despues
                            </Button>
                            <Button variant="primary" onClick={() => {
                                setShowAlertImgNew(false);
                                handleShowEditImage(newPackItem);
                            }}>
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
                                    <Form.Label>Stock del paquete</Form.Label>
                                    <Form.Control required type="number" placeholder="10" onChange={e => {setQuantityNew(e.target.value)}} />
                                    {quantityNewValidation ? (<div class="alert alert-danger p-1" role="alert">Necesitas incluir stock mayor a 0</div>) : null}
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
                    </div>)}
                    </>
                    
                )}
                
            </div>
        </div>
    )
}

export default Packs
