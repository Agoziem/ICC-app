import {
  WAContactArraySchema,
  WAMessageArraySchema,
  WAMessageSchema,
  WATemplateArraySchema,
  WATemplateSchema,
} from "@/schemas/whatsapp";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}`,
});

export const WhatsappAPIendpoint = "/whatsappAPI";
export const WATemplatescachekey = "whatsapp_templates_data";

// Fetch the Contacts and cache
export const fetchWAContacts = async () => {
  const response = await axiosInstance.get(`${WhatsappAPIendpoint}/contacts/`);
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
};

// ------------------------------------------------------
// Fetch media by ID
// ------------------------------------------------------
export const getMedia = async (media_id) => {
  console.log("Fetching media", media_id);
  try {
    // Fetch the media binary from Django backend
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/whatsappAPI/media/${media_id}/`,
      { responseType: "arraybuffer" } // Ensure binary data is handled correctly
    );
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Failed to fetch media", error);
    return null;
  }
};

export const getSentTemplates = async () => {
  const response = await axiosInstance.get(`${WhatsappAPIendpoint}/templates/`);
  const validation = WATemplateArraySchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * function to fetchWAMessages for a specific contact
 * @async
 * @param {WATemplate} Template
 */
export const createTemplateMessage = async (Template) => {
  // Simulate delay (e.g., 2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await axiosInstance.post(
    `${WhatsappAPIendpoint}/templates/`,
    Template
  );
  // Validate the response with Zod schema
  const validation = WATemplateSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
    return null;
  }
  return validation.data;
};
