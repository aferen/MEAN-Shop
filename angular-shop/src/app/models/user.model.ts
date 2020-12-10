import { Role } from "./role.model";

export class User {
    _id:string;
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    verification: string;
    verified: boolean;
    role: [Role];
    password?: string;
    orders?: object;
    confirmPassword?: string;
    photoURL?: string;

}
