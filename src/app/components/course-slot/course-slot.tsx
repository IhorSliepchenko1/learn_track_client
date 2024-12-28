import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Accordion, AccordionItem, Avatar, Button, Divider, Spinner, useDisclosure } from "@nextui-org/react";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { useCheckProgressQuery } from "../../services/progressApi";
import { useMemo } from "react";
import './course-slot.scss'
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants";
import { useDeleteCourseMutation, useLazyGetAllCourseQuery } from "../../services/courseApi";
import { ModalDelete } from "../modals/delete";

type Props = {
     title: string
     course_id: number
     image: string
     description: string
}

export const CourseSlot = ({ title, course_id, image, description }: Props) => {
     const { decoded } = useCheckValidToken()
     const { data, isLoading } = useCheckProgressQuery({ course_id })
     const [triggerCourse] = useLazyGetAllCourseQuery()
     const [deleteCourseId] = useDeleteCourseMutation()
     const navigate = useNavigate()

     const { onOpen, onOpenChange, isOpen } = useDisclosure();

     const deleteCourse = async () => {
          await deleteCourseId(course_id).unwrap()
          await triggerCourse().unwrap()
     }

     const completedLessonsPercentage = useMemo(() => {
          if (data) {
               const remainder = ((data.progress.count_lessons - data.progress.completed_lessons) / data.progress.count_lessons) * 100;
               const completed = 100 - remainder;
               return { completed, remainder };
          }
          return { completed: 0, remainder: 0 };
     }, [isLoading]);


     const testsPercentage = useMemo(() => {
          if (data) {
               const { incorrect_answers_of_tests, correct_answers_of_tests, count_tests } = data.progress

               const correct = (correct_answers_of_tests / count_tests) * 100
               const incorrect = (incorrect_answers_of_tests / count_tests) * 100
               const remainder = 100 - correct - incorrect

               return { correct, incorrect, remainder };
          }
          return { correct: 0, incorrect: 0, remainder: 0 };
     }, [isLoading]);




     return (
          <>
               <div className="py-1">
                    <Accordion >
                         <AccordionItem key="1" aria-label={title} title={
                              <div className="flex items-center gap-3" style={{ marginBottom: 10 }}>
                                   <Avatar isBordered radius="sm" src={`${BASE_URL}/${image}`} />
                                   <h3>Курс: <i>{title}</i></h3>
                              </div>
                         }
                         >
                              {description}
                         </AccordionItem>
                    </Accordion>
                    <div className="flex justify-between items-center">
                         <div className="details-block">
                              <div className="flex flex-col gap-2">
                                   <div>
                                        <div className="flex justify-between title-progress">
                                             <div className="flex items-center gap-1">
                                                  <span>осталось уроков:</span>
                                                  <span>{data ? data?.progress.count_lessons - data?.progress.completed_lessons : <Spinner size="sm" />}</span>
                                             </div>
                                             <div className="flex items-center gap-1">
                                                  <span>выполненые уроки:</span>
                                                  <span>{data ? data?.progress.completed_lessons : <Spinner size="sm" />}</span>
                                             </div>
                                        </div>

                                        <div className="progress-lessons-container">
                                             <div className="progress-lessons-container_completed" style={{ width: `${completedLessonsPercentage.completed}%` }}></div>
                                             <div className="progress-lessons-container_remainder"
                                                  style={{ width: `${completedLessonsPercentage.remainder}%`, borderRadius: data?.progress.completed_lessons === 0 ? `7px` : '' }}></div>
                                        </div>

                                   </div>

                                   <div>
                                        <div className="flex justify-between title-progress">
                                             <div className="flex items-center gap-1">
                                                  <span>осталось тестов:</span>
                                                  <span>{data ? data.progress.count_tests - data.progress.incorrect_answers_of_tests - data.progress.correct_answers_of_tests : <Spinner size="sm" />}</span>
                                             </div>
                                             <div className="flex items-center gap-1">
                                                  <span>выполненые тесты:</span>
                                                  <span>{data ? data.progress.incorrect_answers_of_tests + data.progress.correct_answers_of_tests : <Spinner size="sm" />}</span>
                                             </div>
                                        </div>

                                        <div className="progress-tests-container">
                                             <div className="progress-tests-container_incorrect" style={{ width: `${testsPercentage.incorrect}%`, background: `red` }}></div>
                                             <div className="progress-tests-container_correct" style={{ width: `${testsPercentage.correct}%`, background: `green` }}></div>
                                             <div className="progress-tests-container_remainder" style={{ width: `${testsPercentage.remainder}%`, background: `gray`, borderRadius: testsPercentage.incorrect + testsPercentage.correct === 0 ? `7px` : '' }}></div>
                                        </div>

                                   </div>
                              </div>

                              <div className="flex items-center gap-3">
                                   <Button size="sm" color="primary" variant="bordered">пройти курс</Button>
                                   {decoded.role === `ADMIN` &&
                                        <>
                                             <Button size="sm" startContent={<MdDelete />} color="danger" variant="bordered" onPress={onOpen}>delete</Button>
                                             <Button size="sm" startContent={<MdEdit />} color="warning" variant="bordered" onPress={() => navigate(`/course/${course_id}`)}>update</Button>
                                        </>}
                              </div>
                         </div>
                    </div>
               </div>
               <Divider />
               <ModalDelete
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    deleteItem={deleteCourse} />
          </>
     )
}
