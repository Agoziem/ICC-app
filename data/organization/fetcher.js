import axios from "axios";
import { organizationSchema } from "@/schemas/organizations";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}`,
});

const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID;

export const MainAPIendpoint = "/api";


// ------------------------------------------------------
// Organization fetcher and mutation functions
// ------------------------------------------------------
/**
 * @async
 * @param {string} url
 */
export const fetchOrganization = async (url) => {
  const response = await axiosInstance.get(url);
  const validation = organizationSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {Organization} data
 * @returns {Promise<Organization>}
 */
export const createOrganization = async (data) => {
  const response = await axiosInstance.post(
    `/${MainAPIendpoint}/organization/add/`,
    data
  );
  const validation = organizationSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {Organization} data
 * @returns {Promise<Organization>}
 */
export const updateArticle = async (data) => {
  const response = await axiosInstance.put(
    `/${MainAPIendpoint}/update/${data.id}/`,
    data
  );
  const validation = organizationSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {number} organizationid
 * @returns {Promise<number>}
 */
export const deleteArticle = async (organizationid) => {
  await axiosInstance.delete(`${MainAPIendpoint}/deleteblog/${organizationid}/`);
  return organizationid;
};




