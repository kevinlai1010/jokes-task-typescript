import axios from "axios";

const instance = axios.create({
	baseURL: "https://api.chucknorris.io/jokes/",
});

instance.interceptors.request.use(function (config: any) {
	config.headers.common["Access-Control-Allow-Origin"] = "*";
	return config;
});

export default instance;
