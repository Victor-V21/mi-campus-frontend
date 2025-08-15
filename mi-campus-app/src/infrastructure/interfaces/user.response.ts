export interface UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    noAccount: string;
    avatarUrl: string;
    birthDay: Date;
    campusId: string;
    roles: any[];
}
