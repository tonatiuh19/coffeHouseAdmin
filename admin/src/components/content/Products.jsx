import React, {useEffect, useState} from 'react'
import Loading from '../../utilities/Loading';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Flag from 'react-world-flags';

const Products = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState('');
    const [error, setError] = useState(false);
    const [erroMessage, setErrorMessage] = useState('');

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

    return (
        <div>
            {loading ? 
            (<Loading></Loading>) : 
            (<div className="mt-3">
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
                                { products.map((item) => {
                                    return(
                                        <tr>
                                            <th scope="row">{item.id_products}</th>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.country}</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
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
