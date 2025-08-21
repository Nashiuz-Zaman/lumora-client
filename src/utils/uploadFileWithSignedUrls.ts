import { useLazyGetSignedUrlQuery } from "@/libs/redux/apiSlices/cloudinary/cloudinaryApiSlice";
import axios from "axios";

type GetSignedUrlFn = ReturnType<typeof useLazyGetSignedUrlQuery>[0];

export const uploadFileWithSignedUrl = async (
  file: File,
  getSignedUrl: GetSignedUrlFn
): Promise<string | void> => {
  const response = await getSignedUrl();

  if (!response || !response?.data) {
    throw new Error("No signed URL returned");
  }

  const signedUrl = response.data;

  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(signedUrl, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (res.status === 200) return res.data.secure_url;
  else throw new Error("File not uploaded, error");
};
