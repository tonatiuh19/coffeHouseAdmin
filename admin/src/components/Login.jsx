import React, {useState, useEffect} from 'react';
import '../css/Login/login.css';
import Logo from '../resources/images/logo.png';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erroMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const history = useHistory();

    const signInValidation = () => {
        if(email === '' || password === ''){
            setError(true);
            setErrorMessage('Necesitas incluir tu correo y contraseña');
        }else{
            if(validateEmail(email)){
                setError(false);
                setLoading(true);
                signIn().then((x) => {
                    if(x !== undefined){
                        //console.log(x[0]);
                        localStorage.setItem("08191993", x[0].email)
                        history.push("/bienvenido");
                    }
                }).finally(() => setLoading(false));
            }else{
                setError(true);
                setErrorMessage('El correo es incorrecto');
            }
            
        }
    };

    const signIn = async () =>{
        try {
            const response = await axios.post('https://tienditacafe.com/proveedores/api/login.php', 
                { 
                    email: email,
                    pwd: password 
                }
            );
            if(response.data === 0){
                setError(true);
                setErrorMessage('Email o contraseña incorrectos');
            }else{
                setError(false);
                return response.data;
            }
        } catch (e) {
            setError(true);
            setErrorMessage(`😱 Request failed: ${e}`);
            console.log(`😱 Request failed: ${e}`);
        }
    };

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const session = () => {
        const loggedInUser = localStorage.getItem("08191993");
        if (loggedInUser) {
            history.push("/bienvenido");
        }
    };

    useEffect(() => {
        // creamos una función para actualizar el estado con el clientWidth
        session();
    }, []);

    return (
        <div className="App">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div>
                        <img src={Logo} className="img-fluid" alt="Responsive image"></img>
                        <h3></h3>

                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Correo electronico" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>

                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                        {error ? (<div className="alert alert-danger" role="alert">{erroMessage}</div>) : null}
                        <button type="submit" className="btn btn-primary btn-block" onClick={() => signInValidation()}>Entrar</button>
                        <p className="forgot-password text-right">
                            <a href="#">Olvide mi contraseña</a>
                        </p>
                        {loading ?
                        (<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <FontAwesomeIcon icon={faCoffee} pulse />
                        </div>)
                        : null}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
