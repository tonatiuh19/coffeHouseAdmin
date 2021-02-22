import React, {useEffect, useState} from 'react'
import Loading from '../../utilities/Loading';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Flag from 'react-world-flags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

const Products = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState('');
    const [error, setError] = useState(false);
    const [erroMessage, setErrorMessage] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [showCancel, setShowCancel] = useState(false);

    //EditModal
    const [titleEdit, setTitleEdit] = useState('');


    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseCancel = () => setShowCancel(false);
    
    const handleShowEdit = (item) => {
        setShowEdit(true);
        setTitleEdit('#'+item.id_products+' '+'-'+' '+decode_utf8(item.name));
    };

    const handleShowCancel = (item) => {
        setShowCancel(true)
        
    };

    const getUser = () =>{
        setLoading(true);
        const loggedInUser = localStorage.getItem("08191993");
        if (!loggedInUser) {
            history.push("/");
        }
        return loggedInUser;
    };

    const getUserProducts = async (userEmail) => {
        try {
            const response = await axios.post('http://localhost:8015/getProductsUser.php', 
                { 
                    email: userEmail
                }
            );
            return response.data;
        } catch (e) {
            setLoading(false);
            setError(true);
            setErrorMessage(`😱 Request failed: ${e}`);
            console.log(`😱 Request failed: ${e}`);
        }
    };

    useEffect(() => {
        getUserProducts(getUser()).then((x) => setProducts(x)).finally(() => setLoading(false));
    }, []);

    const renderFlag = () =>{
        //return(<Flag code={ mex } />);
    };

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
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Cancelar
                    </Button>
                    <Button variant="success">Guardar cambios</Button>
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
                    <Button variant="danger">Eliminar</Button>
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
                                        <th scope="col">Lugar</th>
                                        <th scope="col">Editar</th>
                                        <th scope="col">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { products.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <th scope="row">{item.id_products}</th>
                                            <td>{decode_utf8(item.name)}</td>
                                            <td>{item.price}</td>
                                            <td>{decode_utf8(item.country)}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => handleShowEdit(item)}>
                                                    <FontAwesomeIcon icon={faPencilAlt} />
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
