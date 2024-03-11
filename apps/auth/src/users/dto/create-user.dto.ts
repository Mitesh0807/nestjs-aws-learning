import { IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: " Please enter a valid email" })
  email: string;

  @IsStrongPassword()
  password: string;
}
