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

    async send(address, imageId, handler) {
        let formData = new FormData();
        formData.append('email', address);
        formData.append('imageId', imageId);
        try {
            const res = await axios.post("/api/mail", formData);
            console.log(res);
            return res;
        }catch (e) {
            return false;
        }
    }
}