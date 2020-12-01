var nome = document.querySelector("#exampleInputName");
var genero = document.querySelectorAll(
  "#form-user-create [name=gender]:checked"
);
var fem = document.querySelector("#exampleInputGenderF");
var nasc = document.querySelector("#exampleInputBirth");
var pais = document.querySelector("#exampleInputCountry");
var email = document.querySelector("#exampleInputEmail1");
var senha = document.querySelector("#exampleInputPassword");
var foto = document.querySelector("#exampleInputFile");
var validacao = document.querySelector("#exampleInputAdmin");

var fields = document.querySelectorAll("#form-user-create [name]");

var user = {};

nome.value = "Alan Carvalho";
nome.style.color = "#f00";

document.getElementById("form-user-create").addEventListener("submit", (e) => {
  event.preventDefault();
  fields.forEach((field, index) => {
    if (field.name == "gender" && field.checked) {
      // console.log("SIM... " + field.id + " está marcado!");
      user[field.name] = field.value;
    } else {
      user[field.name] = field.value;
      //  console.log("NÃO...");
    }

    // console.log(field.name, " ", field.id);
  });
  console.log(user);
});
