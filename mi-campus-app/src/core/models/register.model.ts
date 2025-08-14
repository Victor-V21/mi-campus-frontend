export interface RegisterModel {
    firstName:       string;
    lastName:        string;
    email:           string;
    noAccount:       string;
    avatarUrl:       string | null; // Use string | null to allow null values
    birthDay:        Date | null; // Use Date or never to avoid issues with default values
    campusId:        string;
    roles:           string[];
    password:        string;
    confirmPassword: string;
}
