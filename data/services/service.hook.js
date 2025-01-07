"use client";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchServices,
  fetchService,
  createService,
  updateService,
  deleteService,
  fetchServiceUsers,
  addusertoProgressorCompleted,
} from "@/data/services/fetcher";

// Hook to fetch all services
export const useFetchServices = (url) => {
  return useQuery(
    ["services", url], // Dynamic cache key
    () => fetchServices(url),
    {
      enabled: !!url, // Ensure query only runs if URL is provided
    }
  );
};

// Hook to fetch a single service
export const useFetchService = (url) => {
  return useQuery(
    ["service", url], // Dynamic cache key for a specific service
    () => fetchService(url),
    {
      enabled: !!url, // Ensure query only runs if URL is provided
    }
  );
};

// Hook to create a new service
export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation(createService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]); // Invalidate the services list
    },
  });
};

// Hook to update a service
export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation(updateService, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["service", variables.id]); // Invalidate the specific service
      queryClient.invalidateQueries(["services"]); // Invalidate the services list
    },
  });
};

// Hook to delete a service
export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]); // Invalidate the services list
    },
  });
};

// Hook to fetch service users
export const useFetchServiceUsers = (url) => {
  return useQuery(
    ["serviceUsers", url], // Dynamic cache key for service users
    () => fetchServiceUsers(url),
    {
      enabled: !!url, // Ensure query only runs if URL is provided
    }
  );
};

// Hook to add a user to progress or completed
export const useAddUserToProgressOrCompleted = () => {
  const queryClient = useQueryClient();
  return useMutation(addusertoProgressorCompleted, {
    onSuccess: () => {
      queryClient.invalidateQueries(["serviceUsers"]); // Invalidate the service users list
    },
  });
};
