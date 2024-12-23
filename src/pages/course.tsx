import { Button } from "@nextui-org/react"
import { CourseSlot } from "../app/components/course-slot/course-slot"
import { useGetAllCourseQuery } from "../app/services/courseApi"
import Spinner from "../app/components/spinner"

export const Course = () => {
     const { data, isLoading } = useGetAllCourseQuery()

     return (
          <div className="flex flex-col gap-2">
               <div className="flex justify-end">
                    <Button color="primary" variant="flat">
                         Добавить курс
                    </Button>
               </div>
               {isLoading ? <Spinner /> : data?.data.map((item) => (<CourseSlot title={item.title} key={item.id} course_id={item.id} image={item?.image_url ?? ''} description={item.description} />))}

          </div>
     )
}
