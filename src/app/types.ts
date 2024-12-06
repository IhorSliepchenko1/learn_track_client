
export type User = {
     id: number
     email: string
     password: string
     name: string
     verification_status: boolean
     avatar_url?: string
     role?: `ADMIN` | `USER`
     createdAt: Date
     updatedAt: Date
}

export type Registration = {
     name: string,
     email: string,
     password: string,
     code: string
}

// export type CheckMails = {
//      id: number
//      email: string
//      verification_code: string
//      expiration_at: Date
//      createdAt: Date
//      updatedAt: Date
// }

// export type Course = {
//      id: number
//      title: string
//      description: string
//      image_url: string
//      lessons: Lesson[]
//      progress: Progress[]
//      createdAt: Date
//      updatedAt: Date
// }

// export type Lesson = {
//      id: number
//      courses
//      course_id: number
//      title: string
//      content: string
//      createdAt: Date
//      updatedAt: Date
// }

// export type Test = {
//      id: number
//      lesson_id: number
//      user_id: number
//      question: string
//      correct_answer: string
//      createdAt: Date
//      updatedAt: Date
// }

// export type UserResponse = {
//      id: number
//      user_id: number
//      test_id: number
//      question: string
//      correct_answer: string
//      createdAt: Date
//      updatedAt: Date
// }

// export type Progress = {
//      id: number
//      user_id: number
//      course_id: number
//      count_lessons: number
//      completed_lessons: number
//      count_tests: number
//      correct_answers_of_tests: number
//      incorrect_answers_of_tests: number
//      createdAt: Date
//      updatedAt: Date
// }




