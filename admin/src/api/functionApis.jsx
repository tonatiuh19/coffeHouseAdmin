import axios from "axios";

//Production
/*export const signIn = async (email, password) => {
  try {
    const response = await axios.post("https://bolsadecafe.com/proveedores/api/login.php", {
      email: email,
      pwd: password,
    });
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
    const response = await axios.post("https://bolsadecafe.com/proveedores/api/getUserData.php", {
      email: email,
    });
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
      "https://bolsadecafe.com/proveedores/api/getUserSales.php",
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
      "https://bolsadecafe.com/proveedores/api/getProductsUser.php",
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
    const response = await axios.post("https://bolsadecafe.com/proveedores/api/getCountries.php");
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const getTypesProducts = async () => {
  try {
    const response = await axios.post(
      "https://bolsadecafe.com/proveedores/api/getTypesProducts.php"
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const updateProducs = async (
  emailUser,
  name,
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
      "https://bolsadecafe.com/proveedores/api/updateProductsUser.php",
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

export const newProduct = async (
  emailUser,
  name,
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
      "https://bolsadecafe.com/proveedores/api/insertNewProduct.php",
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

export const deactivateProduct = async (idProduct) => {
  try {
    const response = await axios.post(
      "https://bolsadecafe.com/proveedores/api/deactivateProduct.php",
      {
        id_products: idProduct,
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
      "http://localhost:8016/dashboard/user/getImage.php",
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
    "http://localhost:8016/dashboard/user/uploadImage.php",
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
};

export const getCountUserProducts = async (userEmail) => {
  try {
    const response = await axios.post(
      "https://bolsadecafe.com/proveedores/api/getCountProductUser.php",
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
      "https://bolsadecafe.com/proveedores/api/getPacksUser.php",
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
    const response = await axios.post("https://bolsadecafe.com/proveedores/api/insertPack.php", {
      email: emailUser,
      name: name,
      description: description.replace(/\n|\r/g, ""),
      long_description: descriptionLong.replace(/\n|\r/g, ""),
      quantity: quantity,
      price: price,
    });
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const newPackProductsIds = async (idProduct, idCampaign, quantity) => {
  try {
    const response = await axios.post(
      "https://bolsadecafe.com/proveedores/api/insertPackProductsId.php",
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
      "https://bolsadecafe.com/proveedores/api/getPacksUserProductsIds.php",
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
    const response = await axios.post("https://bolsadecafe.com/proveedores/api/updatePack.php", {
      email: emailUser,
      id_products: idProduct,
      name: name,
      description: description.replace(/\n|\r/g, ""),
      long_description: descriptionLong.replace(/\n|\r/g, ""),
      quantity: quantity,
      price: price,
    });
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
      "https://bolsadecafe.com/proveedores/api/updatePackProductsId.php",
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
};*/

//Testing
export const signIn = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8015/login.php", {
      email: email,
      pwd: password,
    });
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
      "http://localhost:8015/getAddressUser.php",
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
    const response = await axios.post("http://localhost:8015/getUserData.php", {
      email: email,
    });
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
      "http://localhost:8015/getUserSales.php",
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
      "http://localhost:8015/getProductsUser.php",
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
    const response = await axios.post("http://localhost:8015/getCountries.php");
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const getTypesProducts = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8015/getTypesProducts.php"
    );
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const updateProducs = async (
  emailUser,
  name,
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
      "http://localhost:8015/updateProductsUser.php",
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

export const newProduct = async (
  emailUser,
  name,
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
      "http://localhost:8015/insertNewProduct.php",
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
      "http://localhost:8015/insertNewAddress.php",
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
      "http://localhost:8015/deactivateProduct.php",
      {
        id_products: idProduct,
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
      "http://localhost:8016/dashboard/user/getImage.php",
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
    "http://localhost:8016/dashboard/user/uploadImage.php",
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
};

export const getCountUserProducts = async (userEmail) => {
  try {
    const response = await axios.post(
      "http://localhost:8015/getCountProductUser.php",
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
      "http://localhost:8015/getPacksUser.php",
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
    const response = await axios.post("http://localhost:8015/insertPack.php", {
      email: emailUser,
      name: name,
      description: description.replace(/\n|\r/g, ""),
      long_description: descriptionLong.replace(/\n|\r/g, ""),
      quantity: quantity,
      price: price,
    });
    return response.data;
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};

export const newPackProductsIds = async (idProduct, idCampaign, quantity) => {
  try {
    const response = await axios.post(
      "http://localhost:8015/insertPackProductsId.php",
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
      "http://localhost:8015/getPacksUserProductsIds.php",
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
    const response = await axios.post("http://localhost:8015/updatePack.php", {
      email: emailUser,
      id_products: idProduct,
      name: name,
      description: description.replace(/\n|\r/g, ""),
      long_description: descriptionLong.replace(/\n|\r/g, ""),
      quantity: quantity,
      price: price,
    });
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
      "http://localhost:8015/updatePackProductsId.php",
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
