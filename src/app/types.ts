
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