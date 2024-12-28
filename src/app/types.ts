
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

export type Course = {
     id: number;
     title: string;
     description: string;
     image_url: string | null;
     createdAt: Date;
     updatedAt: Date;
}

export type Lessons = {
     id: number;
     course_id: number;
     title: string;
     content: string;
     createdAt: Date;
     updatedAt: Date;
}

// типы для добавления курса и урока

export type CourseData = {
     title: string,
     description: string,
}

export type LessonsData = {
     title: string,
     content: string,
     course_id?: string
}