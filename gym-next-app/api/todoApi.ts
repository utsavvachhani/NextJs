import { axiosInstance } from "./authApi";

export const createTodoAPI = async (data: any) => {
    const response = await axiosInstance.post("/todo", data);
    return response.data;
};

export const getTodosAPI = async (params: any) => {
    const response = await axiosInstance.get("/todo", { params });
    return response.data;
};

export const getTodoStatsAPI = async () => {
    const response = await axiosInstance.get("/todo/stats");
    return response.data;
};

export const updateTodoAPI = async (id: string, data: any) => {
    const response = await axiosInstance.put(`/todo/${id}`, data);
    return response.data;
};

export const deleteTodoAPI = async (id: string) => {
    const response = await axiosInstance.delete(`/todo/${id}`);
    return response.data;
};

export const updateStatusAPI = async (id: string, status: string) => {
    const response = await axiosInstance.patch(`/todo/${id}/status`, { status });
    return response.data;
};
