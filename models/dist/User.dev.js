"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User(name, gender, birth, country, email, password, photo, admin) {
    _classCallCheck(this, User);

    this._name = name;
    this._gender = gender;
    this._birth = birth;
    this._country = country;
    this._email = email;
    this._password = password;
    this._photo = photo;
    this._admin = admin;
    this._register = new Date();
  }

  _createClass(User, [{
    key: "loadFromJSON",
    value: function loadFromJSON(json) {
      for (var name in json) {
        switch (name) {
          case "_register":
            this[name] = new Date(json[name]);
            break;

          default:
            this[name] = json[name];
            break;
        }
      }
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "gender",
    get: function get() {
      return this._gender;
    }
  }, {
    key: "birth",
    get: function get() {
      return this._birth;
    }
  }, {
    key: "country",
    get: function get() {
      return this._country;
    }
  }, {
    key: "email",
    get: function get() {
      return this._email;
    }
  }, {
    key: "password",
    get: function get() {
      return this._password;
    }
  }, {
    key: "photo",
    get: function get() {
      return this._photo;
    },
    set: function set(value) {
      this._photo = value;
    }
  }, {
    key: "admin",
    get: function get() {
      return this._admin;
    }
  }, {
    key: "register",
    get: function get() {
      return this._register;
    }
  }]);

  return User;
}(); // fim da classe