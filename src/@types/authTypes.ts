export interface PayloadSignin {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PayloadLogin {
  name: string;
  password: string;
}

export interface responseAuthUser {
  id: string;
  token: string;
  message: string;
}


export interface authState {
    token: string | null,
    error: string | undefined,
    loading: boolean,
    sucess: boolean
  }