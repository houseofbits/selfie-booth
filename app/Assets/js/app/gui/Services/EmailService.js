import axios from "axios";

export default class EmailService {

    async validate(address, handler) {
        let formData = new FormData();
        formData.append('email', address);
        axios
            .post("/api/validate", formData).then(response => {
            console.log(response);
            if (response.status === 200) {
                handler(response.data);
            }
        });
    }
}