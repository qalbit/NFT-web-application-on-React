import axios from "axios";
// http://192.168.1.21/:8000
// http://dev.qalbit.com/gemstools
// https://gems.tools
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const instance = axios.create({
    baseURL: "http://192.168.1.7:8000"
});

export default instance