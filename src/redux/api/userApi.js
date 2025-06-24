import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (arg) => ({
        url: "/users",
        method: "GET",
        params: { 
          ...arg,
        }, 
        providesTags: [tagTypes.users],
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: [tagTypes.user],
    }),

    blockUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: { status: "blocked" },
      }),
      invalidatesTags: [tagTypes.users],
    }),

    unblockUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: { status: "active" },
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = userApi;
