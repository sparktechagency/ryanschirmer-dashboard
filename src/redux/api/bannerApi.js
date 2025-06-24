import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanner: builder.query({
      query: (arg) => ({
        url: "/banners",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.banner],
    }),
    createBanner: builder.mutation({
      query: (data) => ({
        url: "/banners",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),
    updateBanner: builder.mutation({
      query: ({ data, id }) => ({
        url: `/banners/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),
  }),
});

export const {
  useGetAllBannerQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
} = bannerApi;
