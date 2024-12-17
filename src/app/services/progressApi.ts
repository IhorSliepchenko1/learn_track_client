import { api } from "./api"

export const progressApi = api.injectEndpoints({
     endpoints: (builder) => ({
          checkProgress: builder.query<
               {
                    progress: {
                         completed_lessons: number,
                         count_tests: number,
                         correct_answers_of_tests: number,
                         incorrect_answers_of_tests: number,
                         count_lessons: number
                    }
               },
               { course_id: number }
          >({
               query: ({ course_id }) => ({
                    url: `progress?course_id=${course_id}`,
                    method: "GET",
               }),
          }),
     }),
});

export const { useCheckProgressQuery, useLazyCheckProgressQuery } = progressApi;
export const { endpoints: { checkProgress } } = progressApi;

