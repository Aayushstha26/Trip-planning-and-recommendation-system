import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { destinationApi } from "@/api/destinationApi";

export const DESTINATION_KEYS = {
  all: ["destinations"],
  list: (params) => [...DESTINATION_KEYS.all, "list", params],
  detail: (id) => [...DESTINATION_KEYS.all, "detail", id],
};

export const useDestinations = (params = {}, options = {}) => {
  return useQuery({
    queryKey: DESTINATION_KEYS.list(params),
    queryFn: () => destinationApi.getAllDestinations(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
    ...options,
  });
};

export const useDestinationDetails = (id, options = {}) => {
  return useQuery({
    queryKey: DESTINATION_KEYS.detail(id),
    queryFn: () => destinationApi.getDestinationById(id),
    enabled: Boolean(id),
    ...options,
  });
};

export const useCreateDestination = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...mutationOptions } = options;

  return useMutation({
    mutationFn: (data) => destinationApi.createDestination(data),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: DESTINATION_KEYS.all });
      if (onSuccess) onSuccess(data, variables, context);
    },
  });
};

export const useUpdateDestination = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...mutationOptions } = options;

  return useMutation({
    mutationFn: ({ id, data }) => destinationApi.updateDestination(id, data),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: DESTINATION_KEYS.all });
      if (onSuccess) onSuccess(data, variables, context);
    },
  });
};

export const useDeleteDestination = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...mutationOptions } = options;

  return useMutation({
    mutationFn: (id) => destinationApi.deleteDestination(id),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: DESTINATION_KEYS.all });
      if (onSuccess) onSuccess(data, variables, context);
    },
  });
};

