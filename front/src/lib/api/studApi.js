const CREATE_API = "http://localhost:5000/";

const studApi = {
  classRegister: (info) => {
    return fetch(CREATE_API + "stud/register", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });
  },
};
export default studApi;
