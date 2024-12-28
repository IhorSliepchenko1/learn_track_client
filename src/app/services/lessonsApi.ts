import { Lessons } from "../types";
import { api } from "./api"

export const lessonsApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addLesson: builder.mutation<Lessons, { lessonData: FormData }>({
               query: ({ lessonData }) => ({
                    url: "/lesson/add",
                    method: "POST",
                    body: lessonData,
               }),
          }),

          updateLesson: builder.mutation<Lessons, { lessonData: FormData, id: number }>({
               query: ({ lessonData, id }) => ({
                    url: `/lesson/${id}`,
                    method: "PUT",
                    body: lessonData,
               }),
          }),

          deleteLesson: builder.mutation<void, number>({
               query: (id) => ({
                    url: `/lesson/${id}`,
                    method: "DELETE",
               }),
          }),

          getAllLessons: builder.query<{
               data: {
                    id: number;
                    course_id: number;
                    title: string;
                    content: string;
                    createdAt: Date;
                    updatedAt: Date;
               }[];
               total: number;
               page: number;
               totalPages: number;


          }, number>({
               query: (id) => ({
                    url: `/lesson/${id}`,
                    method: "GET",
               }),
          }),

          getByIdLessons: builder.query<Lessons, number>({
               query: (id) => ({
                    url: `/lesson/${id}`,
                    method: "GET",
               }),
          }),
     }),
})

export const {
     useGetAllLessonsQuery,
     useGetByIdLessonsQuery,
     useLazyGetAllLessonsQuery,
     useLazyGetByIdLessonsQuery,
     useAddLessonMutation,
     useDeleteLessonMutation,
     useUpdateLessonMutation
} = lessonsApi

export const { endpoints: { getAllLessons, getByIdLessons, addLesson, deleteLesson, updateLesson } } = lessonsApi
