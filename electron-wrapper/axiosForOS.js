const API_BASE_URL = process.env.NODE_ENV === "dev" ? "http://localhost:8000" : "https://os-server.azurewebsites.net"

module.exports = axios.create({
    baseURL: API_BASE_URL,
})
  