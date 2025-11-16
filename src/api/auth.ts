import axios from "axios"

export const API = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  headers: {
    "Content-Type": "application/json"
  }
});

API.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ` + token
    }
    return config;
  },
  error => Promise.reject(error)
);

export interface AuthResponse {
    token: string;
    email: string;
    sureName: string;
    firstName: string;
    achieve: string;
    birthDate: Date;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    
    try {
        const response = await API.post<AuthResponse>("auth/login", { email, password })
        return response.data;
    }
    catch (error: any) {
        throw error.message || "Login failed";
    }
};

export const register = async (
    email: string,
    password: string,
    sureName: string,
    firstName: string,
    birthDate: Date,
    achieve: string
 ): Promise<void> => {
    try {
        const response = await API.post("auth/register", {
            email, password, sureName, firstName,
            birthDate, achieve
        });

        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Login failed";
    }
}

export const isLoggedIn = async () => {
    try {
        await API.get("auth/me");
    }
    catch(err) {
        return false;
    }

    return true;
}

export interface UserInfo {
  email: string;
  sureName: string;
  firstName: string;
  achieve: string;
  birthDate: Date;
}

export const getUser = async (): Promise<UserInfo | null> => {
    
    return {
        email: "",
        sureName: "Иван",
        firstName: "Иванов",
        achieve: "design",
        birthDate: new Date()
    }
    /*try {
        var data = (await API.get("auth/me")).data;
        return { email: data.email, sureName: data.sureName, firstName: data.firstName, achieve: data.achieve, birthDate: data.birthDate };
    }
    catch(err) {
        return null;
    }*/
}