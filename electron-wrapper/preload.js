const axios = require("axios")
const API_BASE_URL = process.env.NODE_ENV === "dev" ? "http://localhost:8000" : "https://os-server.azurewebsites.net"

const axiosForOS = axios.create({
  baseURL: API_BASE_URL,
})

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form')
  // const spinnerContainer = document.querySelector('.spinner-container')
  form.addEventListener('submit', async (e) => {
    console.log("submitting file form")
    e.preventDefault()
    // console.log("files beign sent are :", form["files"].files)
    const formData = new FormData();
    for (let file of form["collection"].files) {
      console.log("file is ",file)
      formData.append("collection", file)
    };
    formData.append("key", form["key"].value)
    await axiosForOS.post(
      "/files",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      },
    )
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
  
  })
})
