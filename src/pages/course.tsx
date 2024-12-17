import { CourseSlot } from "../app/components/course-slot"
import { useGetAllCourseQuery } from "../app/services/courseApi"

export const Course = () => {

     const { data, isLoading } = useGetAllCourseQuery()

     return (
          <div className="flex flex-col gap-2">
               {data?.data.map((item) => (<CourseSlot title={item.title} key={item.id} course_id={item.id} />))}
          </div>
     )
}
