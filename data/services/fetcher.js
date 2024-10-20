import { serviceSchema, servicesResponseSchema } from "@/schemas/items";
import { converttoformData } from "@/utils/formutils";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}`,
});

const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID;

export const servicesAPIendpoint = "/servicesapi";

/**
 * fetch all the Notifications
 * @async
 * @param {string} url
 */
export const fetchServices = async (url) => {
  const response = await axiosInstance.get(url);
  const validation = servicesResponseSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {string} url // example ${servicesAPIendpoint}/service_by_token/${servicetoken}/
 * @returns {Promise<Service>}
 */
export const fetchService = async (url) => {
  const response = await axiosInstance.get(url);
  const validation = serviceSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * submits Responses to database and updates the Ui optimistically
 * @async
 * @returns {Promise<Service>}
 */
export const createService = async (data) => {
  const formData = converttoformData(data, [
    "category",
    "subcategory",
    "userIDs_that_bought_this_service",
    "userIDs_whose_services_is_in_progress",
    "userIDs_whose_services_have_been_completed",
  ]);
  const response = await axiosInstance.post(
    `${servicesAPIendpoint}/add_service/${Organizationid}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const validation = serviceSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * submits Responses to database and updates the Ui optimistically
 * @async
 * @returns {Promise<Service>}
 */
export const updateService = async (data) => {
  const formData = converttoformData(data, [
    "category",
    "subcategory",
    "userIDs_that_bought_this_service",
    "userIDs_whose_services_is_in_progress",
    "userIDs_whose_services_have_been_completed",
  ]);
  const response = await axiosInstance.put(
    `${servicesAPIendpoint}/update_service/${data.id}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const validation = serviceSchema.safeParse(response.data);
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
export const deleteService = async (id) => {
  await axiosInstance.delete(`${servicesAPIendpoint}/delete_service/${id}/`);
  return id;
};

/**
 * Add a user to the users whose Service is in Progress or Completed
 * @async
 * @param {string} url
 * @returns {Promise<number>}
 */
export const addusertoProgressorCompleted = async (url) => {
  const response = await axiosInstance.post(url);
  return response.data;
};
