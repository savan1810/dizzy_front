import { useDispatch } from "react-redux";
import axios from "./axios";
import { postDataAPI } from "./fetchData";

export const uploadImage = async (file) => {

    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const imageResponse = await postDataAPI('aws/imageUpload', formData);
            const imageUrl = imageResponse?.data?.data?.imageUrl;
            if (imageUrl) {
                console.log("Image uploaded successfully:", imageUrl);
                return imageUrl;
            } else {
                // alert(imageResponse?.data?.message || "Image upload failed");
                console.error("Image upload failed:", imageResponse?.data?.message || "Unknown error");
                return false;
            }
            return imageUrl
        } catch (err) {
            // alert(err.response?.data?.message || err.message || "Image upload failed");

            console.error("Error uploading file:", err.response?.data?.message || err.message);
            return false; // Return false if the upload fails
        }
    }
    return true;
}