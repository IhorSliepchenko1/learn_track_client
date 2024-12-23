import { Course } from "../types";
import { api } from "./api"

export const courseApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addCourse: builder.mutation<Course, { courseData: FormData }>({
               query: ({ courseData }) => ({
                    url: "course/add",
                    method: "POST",
                    body: courseData,
               }),
          }),

          updateCourse: builder.mutation<Course, { courseData: FormData; id: number }>({
               query: ({ courseData, id }) => ({
                    url: `/course/${id}`,
                    method: "PUT",
                    body: courseData,
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

          getByIdCourse: builder.query<Course, number>({
               query: (id) => ({
                    url: `course/${id}`,
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
     useUpdateCourseMutation
} = courseApi

export const { endpoints: { addCourse, updateCourse, getAllCourse, getByIdCourse, deleteCourse } } = courseApi
