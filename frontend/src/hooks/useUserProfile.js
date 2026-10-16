import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/api/profileApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, logout as logoutAction } from "@/store/slices/authSlice";

/**
 * Fetch and sync the current user's profile
 */
export const useUserProfile = (options = {}) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const data = await profileApi.getProfile();
        const user = data?.user;
        if (user) {
          dispatch(setCredentials({ user }));
        }
        return user ?? null;
      } catch (_err) {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Update user profile details (name, avatar)
 */
export const useUpdateProfile = (options = {}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { onSuccess: customOnSuccess, ...mutationOptions } = options;

  return useMutation({
    mutationFn: (data) => profileApi.updateProfile(data),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      const user = data?.user;
      if (user) {
        dispatch(setCredentials({ user }));
      }
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      if (customOnSuccess) {
        customOnSuccess(data, variables, context);
      }
    },
  });
};

/**
 * Update user avatar file
 */
export const useUpdateAvatar = (options = {}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { onSuccess: customOnSuccess, ...mutationOptions } = options;

  return useMutation({
    mutationFn: (file) => profileApi.updateAvatar(file),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      const user = data?.user;
      if (user) {
        dispatch(setCredentials({ user }));
      }
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      if (customOnSuccess) {
        customOnSuccess(data, variables, context);
      }
    },
  });
};

/**
 * Remove user avatar
 */
export const useRemoveAvatar = (options = {}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { onSuccess: customOnSuccess, ...mutationOptions } = options;

  return useMutation({
    mutationFn: () => profileApi.removeAvatar(),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      const user = data?.user;
      if (user) {
        dispatch(setCredentials({ user }));
      }
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      if (customOnSuccess) {
        customOnSuccess(data, variables, context);
      }
    },
  });
};

/**
 * Change user password
 */
export const useChangePassword = (options = {}) => {
  return useMutation({
    mutationFn: (payload) => profileApi.changePassword(payload),
    ...options,
  });
};

/**
 * Permanently delete user account
 */
export const useDeleteAccount = (options = {}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { onSuccess: customOnSuccess, ...mutationOptions } = options;

  return useMutation({
    mutationFn: (userId) => profileApi.deleteAccount(userId),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      dispatch(logoutAction());
      queryClient.clear();

      if (customOnSuccess) {
        customOnSuccess(data, variables, context);
      }
    },
  });
};
