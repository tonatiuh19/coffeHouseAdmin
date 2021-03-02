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

export const getTypesProducts = async () =>{
    try {
        const response = await axios.post('http://localhost:8015/getTypesProducts.php');
        return response.data;
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const updateProducs = async (emailUser, name, description, descriptionLong, idCountry, price, quantity, idProduct, idProductType, acidezType, cuerpoType, saborType) =>{
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
                id_product_type: idProductType,
                id_product_f_acidez_types: acidezType,
                id_product_f_cuerpo_types: cuerpoType,
                id_product_f_sabor_types: saborType,
            }
        );
        return response.data;
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const newProduct = async (emailUser, name, description, idProductType, idCountry, descriptionLong, quantity, price, acidezType, cuerpoType, saborType) =>{
    try {
        const response = await axios.post('http://localhost:8015/insertNewProduct.php', 
            { 
                email: emailUser,
                name: name,
                description: description.replace(/\n|\r/g, ""),
                id_product_type: idProductType,
                id_country: idCountry,
                long_description: descriptionLong.replace(/\n|\r/g, ""),
                quantity: quantity,
                price: price,
                id_product_f_acidez_types: acidezType,
                id_product_f_cuerpo_types: cuerpoType,
                id_product_f_sabor_types: saborType,
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

export const getCountUserProducts = async (userEmail) => {
    try {
        const response = await axios.post('http://localhost:8015/getCountProductUser.php', 
            { 
                email: userEmail
            }
        );
        return response.data;
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const getUserPacks = async (userEmail) => {
    try {
        const response = await axios.post('http://localhost:8015/getPacksUser.php', 
            { 
                email: userEmail
            }
        );
        return response.data;
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};