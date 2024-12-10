import { User } from "../types";
import { api } from "./api"

export const userApi = api.injectEndpoints({
     endpoints: (builder) => ({
          sendCode: builder.mutation<
               { expiration_at: Date },
               { email: string }
          >({
               query: (email) => ({
                    url: "user/send-verification-code",
                    method: "POST",
                    body: email,
               }),
          }),

          login: builder.mutation<
               { token: string },
               { email: string; password: string }
          >({
               query: (userData) => ({
                    url: "user/login",
                    method: "POST",
                    body: userData,
               }),
          }),

          register: builder.mutation<
               User,
               {
                    name: string,
                    email: string,
                    password: string,
                    code: string
               }
          >({
               query: (data) => ({
                    url: "user/registration",
                    method: "POST",
                    body: data,
               }),
          }),

          check: builder.query<{
               token: string
          }, void>({
               query: () => ({
                    url: "user/check",
                    method: "GET",
               }),
          }),

          updateUser: builder.mutation<User, { userData: FormData; id: string }>({
               query: ({ userData, id }) => ({
                    url: `/users/${id}`,
                    method: "PUT",
                    body: userData,
               }),
          }),

          deleteUser: builder.mutation<void, number>({
               query: (id) => ({
                    url: `/user/${id}`,
                    method: "DELETE",
               }),
          }),

          getAllUsers: builder.query<User[], void>({
               query: () => ({
                    url: "user/",
                    method: "GET",
               }),
          }),

          getById: builder.query<User, number>({
               query: (id) => ({
                    url: `user/${id}`,
                    method: "GET",
               }),
          }),
     }),
})

export const {
     useCheckQuery,
     useDeleteUserMutation,
     useGetAllUsersQuery,
     useLazyCheckQuery,
     useLazyGetAllUsersQuery,
     useLoginMutation,
     useRegisterMutation,
     useSendCodeMutation,
     useUpdateUserMutation

} = userApi

export const { endpoints: { sendCode, login, register, check, updateUser, deleteUser, getAllUsers } } = userApi
