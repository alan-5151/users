tr.querySelector(".btn-edit").addEventListener("click", (e) => {
  console.log(tr);

  let json = JSON.parse(tr.dataset.user);
  let form = document.querySelector("#form-user-update");
  form.dataset.trIndex = tr.sectionRowIndex;
  for (let name in json) {
    let field = form.querySelector("[name=" + name.replace("_", "") + "]");

    if (field) {
      switch (field.type) {
        case "file":
          continue;
          break;

        case "radio":
          field = form.querySelector(
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

  this.showPanelUpdate();
});
