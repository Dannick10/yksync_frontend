export interface user {
  _id: string;
  name: string;
  email: string;
  admin: string;
  createdAt: string;
  updatedAt: string;
}

export interface userStates {
    user: user | null,
    error: string | null
    sucess: boolean
    loading: boolean
    message: string | null
}