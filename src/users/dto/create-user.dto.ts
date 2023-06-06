import { User } from "src/interface/user.interface";

export class CreateUserDto  extends User{
    name: string;
    token: string;
}