"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Usando Promises
var UserController =
/*#__PURE__*/
function () {
  function UserController(formIdCreate, formIdUpdate, tableId) {
    _classCallCheck(this, UserController);

    this.formEl = document.getElementById(formIdCreate);
    this.formUpdateEl = document.getElementById(formIdUpdate);
    this.tableEl = document.getElementById(tableId);
    this.onSubmit();
    this.onEdit();
  } // método onEdit


  _createClass(UserController, [{
    key: "onEdit",
    value: function onEdit() {
      var _this = this;

      document.querySelector("#box-user-update .btn-cancel").addEventListener("click", function (e) {
        _this.showPanelCreate();
      });
      this.formUpdateEl.addEventListener("submit", function (event) {
        event.preventDefault();

        var btn = _this.formUpdateEl.querySelector("[type = submit]");

        btn.disable = true;

        var values = _this.getValues(_this.formUpdateEl);

        var index = _this.form.dataset.trIndex;
        var tr = _this.tableEl.rows[index];
        tr.dataset.user = JSON.stringify(values);
        tr.innerHTML = "                  \n                      <td>\n                        <img src=\"".concat(values.photo, "\" alt=\"User Image\" class=\"img-circle img-sm\" />\n                      </td>\n                      <td>").concat(values.name, "</td>\n                      <td>").concat(values.email, "</td>\n                      <td>").concat(values.admin ? "Sim" : "Não", "</td>\n                      <td>").concat(Utils.dateFormat(values.register), "</td>\n                      <td>\n                        <button type=\"button\" class=\"btn btn-primary btn-edit btn-xs btn-flat\">\n                          Editar\n                        </button>\n                        <button type=\"button\" class=\"btn btn-danger btn-xs btn-flat\">\n                          Excluir\n                        </button>\n                      </td>\n                   ");
      });
      this.addEventsTr(tr);
      this.updateCount();
    } // fechando onEdit
    // método onSubmit

  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var _this2 = this;

      this.formEl.addEventListener("submit", function (event) {
        event.preventDefault();

        var btn = _this2.formEl.querySelector("[type = submit]");

        btn.disable = true;

        var values = _this2.getValues(_this2.formEl);

        if (!values) return false;

        _this2.getPhoto().then(function (content) {
          values.photo = content;

          _this2.addLine(values);

          _this2.formEl.reset();

          btn.disable = false;
        }, function (e) {
          console.error(e);
        });
      });
    } // fechando onSubmit
    // método getPhoto

  }, {
    key: "getPhoto",
    value: function getPhoto() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var fileReader = new FileReader();

        var elements = _toConsumableArray(_this3.formEl.elements).filter(function (item) {
          if (item.name === "photo") {
            return item;
          }
        });

        var file = elements[0].files[0];

        fileReader.onload = function () {
          resolve(fileReader.result);
        };

        fileReader.onerror = function (e) {
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

  }, {
    key: "getValues",
    value: function getValues(formEl) {
      var user = {};
      var isValid = true;

      _toConsumableArray(formEl.elements).forEach(function (field, index) {
        if (["name", "email", "password"].indexOf(field.name) > -1 && !field.value) {
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

      return new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin);
    } // fechando getValues
    // método addLine

  }, {
    key: "addLine",
    value: function addLine(dataUser) {
      console.log(dataUser);
      var tr = document.createElement("tr");
      tr.dataset.user = JSON.stringify(dataUser);
      console.log("dataset: " + tr.dataset.user);
      tr.innerHTML = "\n                   \n                      <td>\n                        <img src=\"".concat(dataUser.photo, "\" alt=\"User Image\" class=\"img-circle img-sm\" />\n                      </td>\n                      <td>").concat(dataUser.name, "</td>\n                      <td>").concat(dataUser.email, "</td>\n                      <td>").concat(dataUser.admin ? "Sim" : "Não", "</td>\n                      <td>").concat(Utils.dateFormat(dataUser.register), "</td>\n                      <td>\n                        <button type=\"button\" class=\"btn btn-primary btn-edit btn-xs btn-flat\">\n                          Editar\n                        </button>\n                        <button type=\"button\" class=\"btn btn-danger btn-xs btn-flat\">\n                          Excluir\n                        </button>\n                      </td>\n                   ");
      this.addEventsTr(tr);
      this.tableEl.appendChild(tr);
      this.updateCount();
    } // fechando addLine
    // método addEventsTr

  }, {
    key: "addEventsTr",
    value: function addEventsTr(tr) {
      var _this4 = this;

      tr.querySelector(".btn-edit").addEventListener("click", function (e) {
        console.log(tr);
        var json = JSON.parse(tr.dataset.user);
        var form = document.querySelector("#form-user-update");
        form.dataset.trIndex = tr.sectionRowIndex;
        alert("Section row index is: " + form.dataset.trIndex);

        for (var name in json) {
          var field = form.querySelector("[name=" + name.replace("_", "") + "]");

          if (field) {
            switch (field.type) {
              case "file":
                continue;
                break;

              case "radio":
                field = form.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
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

        _this4.showPanelUpdate();
      });
    } // fechando addEventsTr

  }, {
    key: "showPanelCreate",
    value: function showPanelCreate() {
      document.querySelector("#box-user-create").style.display = "block";
      document.querySelector("#box-user-update").style.display = "none";
    }
  }, {
    key: "showPanelUpdate",
    value: function showPanelUpdate() {
      document.querySelector("#box-user-create").style.display = "none";
      document.querySelector("#box-user-update").style.display = "block";
    }
  }, {
    key: "updateCount",
    value: function updateCount() {
      var numberUsers = 0;
      var numberAdmin = 0;

      _toConsumableArray(this.tableEl.children).forEach(function (tr) {
        numberUsers++;
        var user = JSON.parse(tr.dataset.user);
        if (user._admin) numberAdmin++;
      });

      document.querySelector("#number-users").innerHTML = numberUsers;
      document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }
  }]);

  return UserController;
}(); // fechando a classe