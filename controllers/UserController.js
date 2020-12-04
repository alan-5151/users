// Usando Promises

class UserController {
  constructor(formIdCreate, formIdUpdate, tableId) {
    this.formEl = document.getElementById(formIdCreate);
    this.formUpdateEl = document.getElementById(formIdUpdate);
    this.tableEl = document.getElementById(tableId);
    this.onSubmit();
    this.onEdit();
    this.selectAll();
  }

  // método onEdit
  onEdit() {
    document
      .querySelector("#box-user-update .btn-cancel")
      .addEventListener("click", (e) => {
        this.showPanelCreate();
      });
    this.formUpdateEl.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        let btn = this.formUpdateEl.querySelector("[type = submit]");
        btn.disable = true;
        let values = this.getValues(this.formUpdateEl);
        console.log(values);
        let index = this.formUpdateEl.dataset.trIndex;
        let tr = this.tableEl.rows[index];

        let userOld = JSON.parse(tr.dataset.user);
        let result = Object.assign({}, userOld, values);
        this.addEventsTr(tr);
        this.getPhoto(this.formUpdateEl).then((content) => {
          if (!values.photo) {
            result._photo = userOld._photo;
          } else {
            result._photo = content;
          }
          let user = new User();
          user.loadFromJSON(result);
          this.getTr(user, tr);
          this.updateCount();
          this.formUpdateEl.reset();
          btn.disable = false;
          this.showPanelCreate();
        });

        this.addEventsTr(tr);
      },
      (e) => {
        console.error(e);
      }
    );
  } // fechando onEdit

  // método addEventsTr
  addEventsTr(tr) {
    tr.querySelector(".btn-delete").addEventListener("click", (e) => {
      if (confirm("Deseja excluir este usuário?")) {
        tr.remove();
        this.updateCount();
      }
    });

    tr.querySelector(".btn-edit").addEventListener("click", (e) => {
      console.log(tr);

      let json = JSON.parse(tr.dataset.user);

      this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

      for (let name in json) {
        let field = this.formUpdateEl.querySelector(
          "[name=" + name.replace("_", "") + "]"
        );

        if (field) {
          switch (field.type) {
            case "file":
              continue;
              break;

            case "radio":
              field = this.formUpdateEl.querySelector(
                "[name=" + name.replace("_", "") + "][value=" + json[name] + "]"
              );
              field.checked = true;
              break;

            case "checkbox":
              field.checked = json[name];

            default:
              field.value = json[name];
              break;
          }
        }
      }
      this.formUpdateEl.querySelector(".photo").src = json._photo;
      this.showPanelUpdate();
    });
  } // fechando addEventsTr

  // método onSubmit
  onSubmit() {
    this.formEl.addEventListener("submit", (event) => {
      event.preventDefault();

      let btn = this.formEl.querySelector("[type = submit]");
      btn.disable = true;
      let values = this.getValues(this.formEl);
      if (!values) return false;
      this.getPhoto(this.formEl).then(
        (content) => {
          values.photo = content;
          this.insert(values);
          this.addLine(values);
          this.formEl.reset();
          btn.disable = false;
        },
        (e) => {
          console.error(e);
        }
      );
    });
  } // fechando onSubmit

  // método getPhoto
  getPhoto(formEl) {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      let elements = [...formEl.elements].filter((item) => {
        if (item.name === "photo") {
          return item;
        }
      });
      let file = elements[0].files[0];
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (e) => {
        reject(e);
      };
      if (file) {
        fileReader.readAsDataURL(file);
      } else {
        resolve("dist/img/avatar.png");
      }
    });
  } // fechando getPhoto

  // método getValues
  getValues(formEl) {
    let user = {};
    let isValid = true;
    [...formEl.elements].forEach(function (field, index) {
      if (
        ["name", "email", "password"].indexOf(field.name) > -1 &&
        !field.value
      ) {
        field.parentElement.classList.add("has-error");
        isValid = false;
      }

      if (field.name == "gender") {
        if (field.checked) {
          user[field.name] = field.value;
        }
      } else if (field.name == "admin") {
        user[field.name] = field.checked;
      } else {
        user[field.name] = field.value;
      }
    });

    if (!isValid) {
      return false;
    }
    return new User(
      user.name,
      user.gender,
      user.birth,
      user.country,
      user.email,
      user.password,
      user.photo,
      user.admin
    );
  } // fechando getValues

  // método getUsersStorage
  getUsersStorage() {
    let users = [];
    if (localStorage.getItem("users")) {
      users = JSON.parse(localStorage.getItem("users"));
    }
    return users;
  } // fechando getUsersStorage

  // método selectAll
  selectAll() {
    let users = this.getUsersStorage();

    users.forEach((dataUser) => {
      let user = new User();
      user.loadFromJSON(dataUser);
      this.addLine(user);
    });
  } // fechando selectAll

  // método insert
  insert(data) {
    let users = this.getUsersStorage();
    users.push(data);
    // sessionStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("users", JSON.stringify(users));
  } //fechando insert

  // método addLine
  addLine(dataUser) {
    let tr = this.getTr(dataUser);

    this.tableEl.appendChild(tr);
    this.updateCount();
  } // fechando addLine

  showPanelCreate() {
    document.querySelector("#box-user-create").style.display = "block";
    document.querySelector("#box-user-update").style.display = "none";
  }
  showPanelUpdate() {
    document.querySelector("#box-user-create").style.display = "none";
    document.querySelector("#box-user-update").style.display = "block";
  }

  // método getTr
  getTr(dataUser, tr = null) {
    if (tr === null) tr = document.createElement("tr");
    tr.dataset.user = JSON.stringify(dataUser);
    tr.innerHTML = `
                   
                      <td>
                        <img src="${
                          dataUser.photo
                        }" alt="User Image" class="img-circle img-sm" />
                      </td>
                      <td>${dataUser.name}</td>
                      <td>${dataUser.email}</td>
                      <td>${dataUser.admin ? "Sim" : "Não"}</td>
                      <td>${Utils.dateFormat(dataUser.register)}</td>
                      <td>
                        <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">
                          Editar
                        </button>
                        <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">
                          Excluir
                        </button>
                      </td>
                   `;
    this.addEventsTr(tr);
    return tr;
  } // fechando getTr

  updateCount() {
    let numberUsers = 0;
    let numberAdmin = 0;
    [...this.tableEl.children].forEach((tr) => {
      numberUsers++;

      let user = JSON.parse(tr.dataset.user);
      if (user._admin) numberAdmin++;
    });
    document.querySelector("#number-users").innerHTML = numberUsers;
    document.querySelector("#number-users-admin").innerHTML = numberAdmin;
  }
} // fechando a classe
