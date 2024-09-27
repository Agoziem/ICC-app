import axios from "axios";
import {
  emailArraySchema,
  emailResponseArraySchema,
  emailResponseSchema,
} from "@/utils/validation";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}`,
});

export const emailAPIendpoint = "/emailsapi";

export const fetchEmails = async () => {
  const response = await axiosInstance.get(
    `${emailAPIendpoint}/emails/${process.env.NEXT_PUBLIC_ORGANIZATION_ID}/`
  );
  const validation = emailArraySchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * fetches all Responses to a Message from the database
 * @async
 * @param {Email} data
 * @returns {Promise<EmailResponseArray>}
 */
export const getResponses = async (data) => {
  const response = await axiosInstance.get(
    `${emailAPIendpoint}/emails/${data.id}/responses/`
  );
  const validation = emailResponseArraySchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * submits Responses to database and updates the Ui optimistically
 * @async
 * @param {EmailResponse} data
 * @returns {Promise<EmailResponse>}
 */
export const submitResponse = async (data) => {
  const response = await axiosInstance.post(
    `${emailAPIendpoint}/emails/createresponse/`,
    data
  );
  const validation = emailResponseSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};



