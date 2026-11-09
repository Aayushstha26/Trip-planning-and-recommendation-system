import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUserApi } from "@/api/adminUserApi";

export const ADMIN_USER_KEYS = {
  all: ["admin-users"],
  list: (params) => [...ADMIN_USER_KEYS.all, "list", params],
};

export const useAdminUsers = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ADMIN_USER_KEYS.list(params),
    queryFn: () => adminUserApi.getAllUsers(params),
    staleTime: 1000 * 60,
    ...options,
  });
};

export const useDeleteAdminUser = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...mutationOptions } = options;

  return useMutation({
    mutationFn: (id) => adminUserApi.deleteUser(id),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USER_KEYS.all });
      if (onSuccess) onSuccess(data, variables, context);
    },
  });
};

