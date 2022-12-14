import { getCookie } from '../../utils/cookie'
import { apiSlice } from './apiSlice'

const apiWithTags = apiSlice.enhanceEndpoints({ addTagTypes: ['User'] })

export const userApiSlice = apiWithTags.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: 'login',
        method: 'POST',
        body: { email, password }
      }),
      transformResponse: response => {
        return response.data
      },
      invalidatesTags: ['User']
    }),
    signUp: builder.mutation({
      query: data => ({
        url: 'join',
        method: 'POST',
        body: { ...data }
      })
    }),
    refreshData: builder.mutation({
      query: () => ({
        url: 'reissue',
        method: 'POST',
        body: {
          accessToken: getCookie('accessToken'),
          refreshToken: getCookie('refreshToken')
        }
      }),
      transformResponse: response => {
        return response.data
      }
    }),
    userDetail: builder.mutation({
      query: data => ({
        url: 'join/detail',
        method: 'POST',
        body: { ...data }
      })
    }),
    detailPass: builder.mutation({
      query: () => ({
        url: 'join/detail-skip',
        method: 'GET'
      })
    }),
    inquireUserData: builder.query({
      query: () => ({ url: 'members' }),
      transformResponse: response => {
        return response.data
      },
      invalidatesTags: ['User']
    }),
    editUserData: builder.mutation({
      query: data => ({
        url: 'members',
        method: 'PATCH',
        body: { ...data }
      }),
      providesTags: ['User']
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
        body: {
          accessToken: getCookie('accessToken'),
          refreshToken: getCookie('refreshToken')
        }
      })
    })
  })
})

export const {
  useLoginMutation,
  useSignUpMutation,
  useRefreshDataMutation,
  useUserDetailMutation,
  useDetailPassMutation,
  useInquireUserDataQuery,
  useEditUserDataMutation,
  useLogoutMutation
} = userApiSlice
