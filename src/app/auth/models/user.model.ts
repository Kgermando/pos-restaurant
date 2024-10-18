export interface UserModel {
    id: number;
    fullname: string;
    email: string;
    title: string;
    phone: string;
    password: string;
    password_confirm: string;
    role: string;
    permission: string;
    image: string;
    status: boolean;
    signature: string; 
    
    created_at: Date;
    updated_at: Date;
}