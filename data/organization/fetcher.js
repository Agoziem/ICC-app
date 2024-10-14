import axios from "axios";
import { departmentResponseSchema, departmentSchema, organizationSchema, staffResponseSchema, staffSchema, subscriptionSchema, subscriptionsResponseSchema, testimonialSchema, testimonialsResponseSchema } from "@/schemas/organizations";

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
export const updateOrganization = async (data) => {
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
export const deleteOrganization = async (organizationid) => {
  await axiosInstance.delete(`${MainAPIendpoint}/deleteblog/${organizationid}/`);
  return organizationid;
};


// ------------------------------------------------------
// Staff fetcher and mutation functions
// ------------------------------------------------------
/**
 * @async
 * @param {string} url
 */
export const fetchStaffs = async (url) => {
  const response = await axiosInstance.get(url);
  const validation = staffResponseSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {Staff} data
 * @returns {Promise<Staff>}
 */
export const createStaff = async (data) => {
  const response = await axiosInstance.post(
    `/${MainAPIendpoint}/staff/add/${Organizationid}/`,
    data
  );
  const validation = staffSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {Staff} data
 * @returns {Promise<Staff>}
 */
export const updateStaff = async (data) => {
  const response = await axiosInstance.put(
    `/${MainAPIendpoint}/staff/update/${data.id}/`,
    data
  );
  const validation = staffSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {number} staffid
 * @returns {Promise<number>}
 */
export const deleteStaff = async (staffid) => {
  await axiosInstance.delete(`${MainAPIendpoint}/staff/delete/${staffid}/`);
  return staffid;
};

// ------------------------------------------------------
// Testimonial fetcher and mutation functions
// ------------------------------------------------------
/**
 * @async
 * @param {string} url
 */
export const fetchTestimonials = async (url) => {
  const response = await axiosInstance.get(url);
  const validation = testimonialsResponseSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {Testimony} data
 * @returns {Promise<Staff>}
 */
export const createTestimonial = async (data) => {
  const response = await axiosInstance.post(
    `/${MainAPIendpoint}/testimonial/add/${Organizationid}/`,
    data
  );
  const validation = testimonialSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {Testimony} data
 * @returns {Promise<Testimony>}
 */
export const updateTestimonial = async (data) => {
  const response = await axiosInstance.put(
    `/${MainAPIendpoint}/testimonial/update/${Organizationid}/`,
    data
  );
  const validation = testimonialSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {number} testimonialid
 * @returns {Promise<number>}
 */
export const deleteTestimonial = async (testimonialid) => {
  await axiosInstance.delete(`${MainAPIendpoint}/testimonial/delete/${testimonialid}/`);
  return testimonialid;
};



// ------------------------------------------------------
// Department fetcher and mutation functions
// ------------------------------------------------------
/**
 * @async
 * @param {string} url
 */
export const fetchDepartments = async (url) => {
  const response = await axiosInstance.get(url);
  const validation = departmentResponseSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {string} url
 */
export const fetchDepartment = async (url) => {
  const response = await axiosInstance.get(url);
  const validation = departmentSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {Department} data
 * @returns {Promise<Department>}
 */
export const createDepartment = async (data) => {
  const response = await axiosInstance.post(
    `/${MainAPIendpoint}/department/add/${Organizationid}/`,
    data
  );
  const validation = departmentSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {Department} data
 * @returns {Promise<Department>}
 */
export const updateDepartment = async (data) => {
  const response = await axiosInstance.put(
    `/${MainAPIendpoint}/department/update/${data.id}/`,
    data
  );
  const validation = departmentSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {number} departmentid
 * @returns {Promise<number>}
 */
export const deleteDepartment = async (departmentid) => {
  await axiosInstance.delete(`${MainAPIendpoint}/department/delete/${departmentid}/`);
  return departmentid;
};



// ------------------------------------------------------
// Subscription fetcher and mutation functions
// ------------------------------------------------------
/**
 * @async
 * @param {string} url
 */
export const fetchSubscriptions = async (url) => {
  const response = await axiosInstance.get(url);
  const validation = subscriptionsResponseSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {Subscription} data
 * @returns {Promise<Subscription>}
 */
export const createSubscription = async (data) => {
  const response = await axiosInstance.post(
    `/${MainAPIendpoint}/subscription/add/${Organizationid}/`,
    data
  );
  const validation = subscriptionSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {Subscription} data
 * @returns {Promise<Subscription>}
 */
export const updateSubscription = async (data) => {
  const response = await axiosInstance.put(
    `/${MainAPIendpoint}/subscription/update/${data.id}/`,
    data
  );
  const validation = subscriptionSchema.safeParse(response.data);
  if (!validation.success) {
    console.log(validation.error.issues);
  }
  return validation.data;
};

/**
 * @async
 * @param {number} subscriptionid
 * @returns {Promise<number>}
 */
export const deleteSubscription = async (subscriptionid) => {
  await axiosInstance.delete(`${MainAPIendpoint}/subscription/delete/${subscriptionid}/`);
  return subscriptionid;
};


