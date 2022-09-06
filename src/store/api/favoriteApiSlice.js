import { apiSlice } from '../api/apiSlice'
//tag이름 자유
const apiWithTags = apiSlice.enhanceEndpoints({ addTagTypes: ['Favorite'] })

export const favoriteApiSlice = apiWithTags.injectEndpoints({
  endpoints: builder => ({
    getFavorite: builder.query({
      query: () => 'products/concern',
      transformResponse: response => response.data,
      //
      providesTags: ['Favorite']
    }),
    addFavorite: builder.mutation({
      query: id => ({
        url: 'products/concern',
        method: 'POST',
        body: { id }
      }),
      //캐시 무효화
      invalidatesTags: ['Favorite']
    }),
    deleteFavorite: builder.mutation({
      query: id => ({
        url: 'products/concern',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: ['Favorite']
    })
  })
})

export const {
  useGetFavoriteQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation
} = favoriteApiSlice
