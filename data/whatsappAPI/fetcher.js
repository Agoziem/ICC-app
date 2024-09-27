import { WAContactArraySchema, WAMessageArraySchema, WAMessageSchema } from "@/utils/validation";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}`,
});

export const WhatsappAPIendpoint = "/whatsappAPI";


export const fetchWAContacts = async () => {
    const response = await axiosInstance.get(
      `${WhatsappAPIendpoint}/contacts/`
    );
    const validation = WAContactArraySchema.safeParse(response.data);
    if (!validation.success) {
      console.log(validation.error.issues);
    }
    return validation.data;
  };


  
  /**
   * function to fetchWAMessages for a specific contact
   * @async
   * @param {WAContact} contact
   */
  export const fetchWAMessages = async (contact) => {
    const response = await axiosInstance.get(
      `${WhatsappAPIendpoint}/messages/${contact.id}/`
    );
    const validation = WAMessageArraySchema.safeParse(response.data);
    if (!validation.success) {
      console.log(validation.error.issues);
    }
    return validation.data;
  };


   /**
   * function to fetchWAMessages for a specific contact
   * @async
   * @param {WAMessage} wamessage
   */
  export const sendWAMessage = async (wamessage) => {
    const response = await axiosInstance.post(
      `${WhatsappAPIendpoint}/${wamessage.contact}/send_message/`,
      wamessage
    );
    const validation = WAMessageSchema.safeParse(response.data);
    if (!validation.success) {
      console.log(validation.error.issues);
    }
    return validation.data;
  }