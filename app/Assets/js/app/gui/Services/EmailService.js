import axios from "axios";

export default class EmailService {

    async validate(address, handler) {
        let formData = new FormData();
        formData.append('email', address);
        axios
            .post("/api/validate", formData).then(response => {
            if (response.status === 200) {
                handler(response.data);
            }
        });
    }

    async send(address, imageId, language, handler) {
        let formData = new FormData();
        formData.append('email', address);
        formData.append('imageId', imageId);
        formData.append('language', language);
        try {
            const response = await axios.post("/api/mail", formData);
            return response.status === 200;
        }catch (e) {
            return false;
        }
    }
}