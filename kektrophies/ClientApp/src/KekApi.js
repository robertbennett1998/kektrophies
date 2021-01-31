import Axios from "axios";
import Config from "./Config";

const KekApi = {
    GetTestimonials: async function (offset=0, count=0) {
        var requestPath = Config.apiPath + `testimonials?offset=${offset}&count=${count}`
        return await Axios.get(requestPath);
    },

    CreateTestimonial: async function (code, testimonial) {
        var requestPath = Config.apiPath + `testimonials/CreateTestimonial`
        return await Axios.post(requestPath, { "testimonialCode": code, "testimonial": testimonial});
    },

    CreateTestimonialCode: async function (firstName, lastName, description, adminPassword) {
        var requestPath = Config.apiPath + `testimonials/CreateTestimonialCode`
        return await Axios.post(requestPath, { "firstName": firstName, "lastName": lastName, "description": description, "adminPassword": adminPassword });
    }
}

export default KekApi;