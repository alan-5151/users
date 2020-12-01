"use strict";

var _this = void 0;

tr.querySelector(".btn-edit").addEventListener("click", function (e) {
  console.log(tr);
  var json = JSON.parse(tr.dataset.user);
  var form = document.querySelector("#form-user-update");
  form.dataset.trIndex = tr.sectionRowIndex;

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

  _this.showPanelUpdate();
});