import { USERS_URL } from "../../../utils/contants.js";
import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Запрос списка пользователей — предоставляет тег 'User'
    getTeamLists: builder.query({
      query: () => ({
        url: `${USERS_URL}/get-team`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ['User'], // ← при получении данных, они помечаются тегом
    }),

    // Обновление пользователя — инвалидирует тег 'User'
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ['User'], // ← после выполнения запросы с тегом 'User' будут перезапрошены
    }),

    // Удаление пользователя — инвалидирует тег 'User'
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ['User'],
    }),

    // Изменение статуса (активен/неактивен) — тоже инвалидирует тег
    userAction: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data?.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ['User'],
    }),

    // Остальные эндпоинты (не изменяющие список пользователей) оставляем без тегов
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
      providesTags: ['Notification'], // <- добавлено
    }),

   markNotiAsRead: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ['Notification'], // <- добавлено
    }),

 changePassword: builder.mutation({
  query: (data) => {
    console.log("RTK sending:", data);
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