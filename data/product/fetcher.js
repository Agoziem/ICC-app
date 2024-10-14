import { productSchema, productsResponseSchema } from "@/schemas/items";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}`,
});

const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID

export const productsAPIendpoint = "/productsapi";

/**
 * fetch all the Products
 * @async
 * @param {string} url
 */
export const fetchProducts = async (url) => {
  const response = await axiosInstance.get(url);
  const validation = productsResponseSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {number} id
 * @returns {Promise<Product>}
 */
export const fetchProductbyID = async (id) => {
  const response = await axiosInstance.get(`${productsAPIendpoint}/product/${id}/`);
  const validation = productSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};


/**
 * submits Responses to database and updates the Ui optimistically
 * @async
 * @param {Product} data
 * @returns {Promise<Product>}
 */
export const createProduct = async (data) => {
  const response = await axiosInstance.post(
    `${productsAPIendpoint}/add-product/${Organizationid}/`,
    data
  );
  const validation = productSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * submits Responses to database and updates the Ui optimistically
 * @async
 * @param {Product} data
 * @returns {Promise<Product>}
 */
export const updateProduct = async (data) => {
  const response = await axiosInstance.put(
    `${productsAPIendpoint}/update-product/${data.id}/`,
    data
  );
  const validation = productSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * submits Responses to database and updates the Ui optimistically
 * @async
 * @param {number} id
* @returns {Promise<number>}
 */
export const deleteProduct = async (id) => {
  await axiosInstance.delete(
    `${productsAPIendpoint}/delete-product/${id}/`
  );
  return id;
};
