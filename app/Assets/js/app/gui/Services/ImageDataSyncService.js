import axios from "axios";

export default class ImageDataSyncService {

    async sync(imageData) {

        const blob = await fetch(imageData.base64data).then(res => res.blob());

        const formData = new FormData();
        formData.append('image', blob);

        axios
            .post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {
            if (response.status === 200 && typeof response.data.id !== 'undefined') {
                imageData.hash = response.data.id;
            }
        });
    }
}