import { videoSchema, videosResponseSchema } from "@/schemas/items";
import axios from "axios";
import { servicesAPIendpoint } from "../services/fetcher";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}`,
});

const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID

export const vidoesapiAPIendpoint = "/vidoesapi";

/**
 * fetch all the Videos
 * @async
 * @param {string} url
 */
export const fetchVideos = async (url) => {
  const response = await axiosInstance.get(
    url
  );
  const validation = videosResponseSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};



/**
 * @async
 * @param {number} id
 * @returns {Promise<Video>}
 */
export const fetchVideobyID = async (id) => {
  const response = await axiosInstance.get(`${vidoesapiAPIendpoint}/video/${id}/`);
  const validation = videoSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};


/**
 * @async
 * @param {string} token
 * @returns {Promise<Video>}
 */
export const fetchVideobyToken = async (token) => {
  const response = await axiosInstance.get(`${vidoesapiAPIendpoint}/video_by_token/${token}/`);
  const validation = videoSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};


/**
 * submits Responses to database and updates the Ui optimistically
 * @async
 * @param {Video} data
 * @returns {Promise<Video>}
 */
export const createVideo = async (data) => {
  const response = await axiosInstance.post(
    `${vidoesapiAPIendpoint}/add_video/${Organizationid}/`,
    data
  );
  const validation = videoSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * submits Responses to database and updates the Ui optimistically
 * @async
 * @param {Video} data
 * @returns {Promise<Video>}
 */
export const updateVideo = async (data) => {
  const response = await axiosInstance.put(
    `${vidoesapiAPIendpoint}/update_video/${data.id}/`,
    data
  );
  const validation = videoSchema.safeParse(response.data);
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
export const deleteVideo = async (id) => {
  await axiosInstance.delete(
    `${vidoesapiAPIendpoint}/delete_video/${id}/`
  );
  return id;
};


