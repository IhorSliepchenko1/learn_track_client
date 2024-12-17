import { Course, User } from "../types";
import { api } from "./api"

export const courseApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addCourse: builder.mutation<
               { course: Course },
               { title: string, description: string }
          >({
               query: (data) => ({
                    url: "course/add",
                    method: "POST",
                    body: data,
               }),
          }),

          updateCourse: builder.mutation<Course, { data: { title: string, description: string }, id: number }>({
               query: ({ data, id }) => ({
                    url: `/course/${id}`,
                    method: "PUT",
                    body: data,
               }),
          }),

          deleteCourse: builder.mutation<void, number>({
               query: (id) => ({
                    url: `/course/${id}`,
                    method: "DELETE",
               }),
          }),

          getAllCourse: builder.query<{
               data: {
                    id: number;
                    title: string;
                    description: string;
                    image_url: string | null;
                    createdAt: Date;
                    updatedAt: Date;
               }[];
               total: number;
               page: number;
               totalPages: number;

          }, void>({
               query: () => ({
                    url: "course",
                    method: "GET",
               }),
          }),

          getByIdCourse: builder.query<User, number>({
               query: (id) => ({
                    url: `user/${id}`,
                    method: "GET",
               }),
          }),
     }),
})

export const {
     useAddCourseMutation,
     useGetAllCourseQuery,
     useGetByIdCourseQuery,
     useLazyGetAllCourseQuery,
     useLazyGetByIdCourseQuery,
     useDeleteCourseMutation,
} = courseApi

export const { endpoints: { addCourse, updateCourse, getAllCourse, getByIdCourse, deleteCourse } } = courseApi
