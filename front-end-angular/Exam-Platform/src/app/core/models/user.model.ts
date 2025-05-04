export interface UserRegister {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  birthDate?: string;
  stageLevel: string;
}
export interface UserLogin {
  email: string;
  password: string;
}
