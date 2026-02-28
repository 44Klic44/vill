import { USERS_URL } from "../../../utils/contants.js";
import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getTeamLists: builder.query({
      query: () => ({
        url: `${USERS_URL}/get-team`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ['User'], 
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ['User'], 
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ['User'],
    }),

    userAction: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data?.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ['User'],
    }),

    getUserTaskStatus: builder.query({
      query: () => ({
        url: `${USERS_URL}/get-status`,
        method: "GET",
        credentials: "include",
      }),
    }),

   getNotifications: builder.query({
      query: () => ({
        url: `${USERS_URL}/notifications`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ['Notification'], 
    }),

   markNotiAsRead: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ['Notification'],
    }),

 changePassword: builder.mutation({
  query: (data) => {
    return {
      url: `${USERS_URL}/change-password`,
      method: "PUT",
      body: data,
      credentials: "include",
    };
  },
}),
  }),
});

export const {
  useUpdateUserMutation,
  useGetTeamListsQuery,
  useDeleteUserMutation,
  useUserActionMutation,
  useChangePasswordMutation,
  useGetNotificationsQuery,
  useMarkNotiAsReadMutation,
  useGetUserTaskStatusQuery,
} = userApiSlice;