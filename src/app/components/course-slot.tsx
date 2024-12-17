import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Button, Divider } from "@nextui-org/react";
import { useCheckValidToken } from "../hooks/useCheckValidToken";
import { useCheckProgressQuery } from "../services/progressApi";
import { useMemo } from "react";

type Props = {
     title: string
     course_id: number
}

export const CourseSlot = ({ title, course_id }: Props) => {
     const { decoded } = useCheckValidToken()
     const { data, isLoading } = useCheckProgressQuery({ course_id })

     const completedLessonsPercentage = useMemo(() => {
          if (data) {
               const remainder = ((data.progress.count_lessons - data.progress.completed_lessons) / data.progress.count_lessons) * 100;
               const completed = 100 - remainder;
               return { completed, remainder };
          }
          return { completed: 0, remainder: 0 };
     }, [isLoading]);



     return (
          <>
               <div className="flex justify-between items-center">
                    <div>
                         <h3>{title}</h3>
                         <span>
                              <p style={{ fontSize: 10 }}>Уроков: {data?.progress.count_lessons}</p>
                              <p style={{ fontSize: 10 }}>Тестов: {data?.progress.count_tests}</p>
                         </span>
                    </div>
                    <div style={{ width: 200 }}>
                         <div
                              style={{
                                   display: `block`,
                                   height: "2px",
                                   width: `${completedLessonsPercentage.completed}%`,
                                   backgroundColor: "green",
                              }}
                         ></div>
                         <div
                              style={{
                                   display: `block`,
                                   height: "2px",
                                   width: `${completedLessonsPercentage.remainder}%`,
                                   backgroundColor: "red",
                              }}
                         ></div>
                    </div>


                    <div className="flex items-center gap-1">
                         <Button size="sm" color="primary" variant="bordered">пройти курс</Button>
                         {decoded.role === `ADMIN` &&

                              <>
                                   <Button size="sm" startContent={<MdDelete />} color="danger" variant="bordered">delete</Button>
                                   <Button size="sm" startContent={<MdEdit />} color="warning" variant="bordered">update</Button>
                              </>
                         }
                    </div>

               </div>
               <Divider />
          </>
     )
}
