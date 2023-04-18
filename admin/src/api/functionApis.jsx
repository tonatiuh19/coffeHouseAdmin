import axios from "axios";

//Production
const domain = 'https://bolsadecafe.com/proveedores/api';
const domainImage = 'https://bolsadecafe.com/dashboard/user';

//Testing php -S localhost:8015
/*const domain = "http://localhost:8015";
const domainImage = 'http://localhost:8015/dashboard/user';*/

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(
      `${domain}/login.php`,
      {
        email: email,
        pwd: password,
      }
    );
    if (response.data === 0) {
      return false;
    } else {
      return response.data;
    }
  } catch (e) {
    throw new Error(`😱 Request failed: ${e}`);
  }
};

export const getAddressUser = async (email) => {
  try {
    const response = await axios.post(
      `${domain}/getAddressUser.php`,
      {
        email: email,
      }
    );
    if (response.data === 0) {
      return false;
    } else {
      return response.data;
    }
  } catch (e) {
    throw new Error(`😱 Request failed: ${e}`);
  }
};

export const getUserData = async (email) => {
  try {
    const response = await axios.post(
      `${domain}/getUserData.php`,
      {
        email: email,
      }
    );
    if (response.data === 0) {
      return false;
    } else {
      return response.data;
    }
  } catch (e) {
    throw new Error(`😱 Request failed: ${e}`);
  }
};

export const getUserSales = async (email) => {
  try {
    const response = await axios.post(
      `${domain}/getUserSales.php`,
      {
        email: email,
      }
    );
    if (response.data === 0) {
      return false;
    } else {
      return response.data;
    }
  } catch (e) {
    throw new Error(`😱 Request failed: ${e}`);
  }
};

export const getUserProducts = async (userEmail) => {
  try {
    const response = await axios.post(
      `${domain}/getProductsUser.php`,
      {
        email: userEmail,
      }
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const getCountries = async () => {
  try {
    const response = await axios.post(
      `${domain}/getCountries.php`
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const getTypesProducts = async () => {
  try {
    const response = await axios.post(
      `${domain}/getTypesProducts.php`
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const updateProducs = async (
  emailUser,
  name,
  peso,
  description,
  descriptionLong,
  idCountry,
  price,
  quantity,
  idProduct,
  idProductType,
  acidezType,
  cuerpoType,
  saborType
) => {
  try {
    const response = await axios.post(
      `${domain}/updateProductsUser.php`,
      {
        email: emailUser,
        name: name,
        peso: peso,
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

export const newProduct = async (
  emailUser,
  name,
  peso,
  description,
  idProductType,
  idCountry,
  descriptionLong,
  quantity,
  price,
  acidezType,
  cuerpoType,
  saborType
) => {
  try {
    const response = await axios.post(
      `${domain}/insertNewProduct.php`,
      {
        email: emailUser,
        name: name,
        peso: peso,
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

export const newAddress = async (
  emailUser,
  street,
  no,
  noInt,
  city,
  state,
  cp,
  colony,
  description
) => {
  try {
    const response = await axios.post(
      `${domain}/insertNewAddress.php`,
      {
        email: emailUser,
        street: street,
        no: no,
        noInt: noInt,
        city: city,
        state: state,
        description: description.replace(/\n|\r/g, ""),
        cp: cp,
        colony: colony,
      }
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const deactivateProduct = async (idProduct) => {
  try {
    const response = await axios.post(
      `${domain}/deactivateProduct.php`,
      {
        id_products: idProduct,
      }
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const getCountUserProducts = async (userEmail) => {
  try {
    const response = await axios.post(
      `${domain}/getCountProductUser.php`,
      {
        email: userEmail,
      }
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const getUserPacks = async (userEmail) => {
  try {
    const response = await axios.post(
      `${domain}/getPacksUser.php`,
      {
        email: userEmail,
      }
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const newPack = async (
  emailUser,
  name,
  description,
  descriptionLong,
  quantity,
  price
) => {
  try {
    const response = await axios.post(
      `${domain}/insertPack.php`,
      {
        email: emailUser,
        name: name,
        description: description.replace(/\n|\r/g, ""),
        long_description: descriptionLong.replace(/\n|\r/g, ""),
        quantity: quantity,
        price: price,
      }
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const newPackProductsIds = async (idProduct, idCampaign, quantity) => {
  try {
    const response = await axios.post(
      `${domain}/insertPackProductsId.php`,
      {
        id_products: idProduct,
        id_campaign: idCampaign,
        quantity: quantity,
      }
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const getPacksUserProductsIds = async (idProduct) => {
  try {
    const response = await axios.post(
      `${domain}/getPacksUserProductsIds.php`,
      {
        id_products: idProduct,
      }
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const updatePack = async (
  emailUser,
  idProduct,
  name,
  description,
  descriptionLong,
  quantity,
  price
) => {
  try {
    const response = await axios.post(
      `${domain}/updatePack.php`,
      {
        email: emailUser,
        id_products: idProduct,
        name: name,
        description: description.replace(/\n|\r/g, ""),
        long_description: descriptionLong.replace(/\n|\r/g, ""),
        quantity: quantity,
        price: price,
      }
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const updatePackProductsIds = async (
  idProduct,
  idCampaign,
  quantity
) => {
  try {
    const response = await axios.post(
      `${domain}/updatePackProductsId.php`,
      {
        id_products: idProduct,
        id_campaign: idCampaign,
        quantity: quantity,
      }
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const getProductImage = async (idProduct) => {
  try {
    const response = await axios.post(
      `${domainImage}/getImage.php`,
      {
        id_products: idProduct,
      }
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const uploadFile = async (file) => {
  const formData = {
    id_products: file,
  };

  formData.append("avatar", file);

  return await axios.post(
    `${domainImage}/uploadImage.php`,
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
};