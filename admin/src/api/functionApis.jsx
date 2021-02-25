import axios from "axios";

export const signIn = async (email, password) =>{
    try {
        const response = await axios.post('http://localhost:8015/login.php', 
            { 
                email: email,
                pwd: password 
            }
        );
        if(response.data === 0){
            return 'Email o contraseña incorrectos';
        }else{
            return response.data;
        }
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const getUserProducts = async (userEmail) => {
    try {
        const response = await axios.post('http://localhost:8015/getProductsUser.php', 
            { 
                email: userEmail
            }
        );
        return response.data;
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const getCountries = async () =>{
    try {
        const response = await axios.post('http://localhost:8015/getCountries.php');
        return response.data;
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const updateProducs = async (emailUser, name, description, descriptionLong, idCountry, price, quantity, idProduct) =>{
    try {
        const response = await axios.post('http://localhost:8015/updateProductsUser.php', 
            { 
                email: emailUser,
                name: name,
                description: description.replace(/\n|\r/g, ""),
                long_description: descriptionLong.replace(/\n|\r/g, ""),
                id_country: idCountry,
                price: price,
                quantity: quantity,
                id_products: idProduct,
            }
        );
        return response.data;
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const deactivateProduct = async (idProduct) =>{
    try {
        const response = await axios.post('http://localhost:8015/deactivateProduct.php', 
            { 
                id_products: idProduct,
            }
        );
        return response.data;
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const getProductImage = async (idProduct) =>{
    try {
        const response = await axios.post('http://localhost:8016/dashboard/user/getImage.php', 
            { 
                id_products: idProduct,
            }
        );
        return response.data;
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const uploadFile = async (file) =>{
    const formData = { 
        id_products: file,
    }

    formData.append('avatar',file)

    return  await axios.post('http://localhost:8016/dashboard/user/uploadImage.php', formData,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
};