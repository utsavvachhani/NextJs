import { axiosInstance } from "./authApi";

export const uploadVideoAPI = async (formData: FormData) => {
  const response = await axiosInstance.post("/videos/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllVideosAPI = async () => {
  const response = await axiosInstance.get("/videos");
  return response.data;
};
