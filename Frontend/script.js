const $get = document.getElementById("get");
const $put = document.getElementById("put");
const $delete = document.getElementById("delete");
const $post = document.getElementById("post");
//buttons

const $id = document.getElementById("id");
const $name = document.getElementById("name");
const $alias = document.getElementById("alias");
//inputs

const $out = document.getElementById("out");
//output

async function memberCheck() {
  $out.textContent = "Checking...";
  if ($id.value.trim() === "" || $id.value === "0") {
    try {
      const res = await fetch("http://localhost:3000/registers");
      if (!res.ok) throw new Error("HTTP" + res.status);

      const result = await res.json();

      $out.textContent = JSON.stringify(result, null, 2);
    } catch (error) {
      $out.textContent = "Erro: " + error.message;
    }
  } else {
    try {
      const res = await fetch("http://localhost:3000/registers/" + $id.value);
      if (!res.ok) throw new Error("HTTP" + res.status);

      const result = await res.json();
      $out.textContent = JSON.stringify(result, null, 2);
    } catch (error) {
      $out.textContent = "Erro: " + error.message;
    }
  }
}

async function memberUpdate() {
  $out.textContent = "Updating...";
  try {
    const res = await fetch("http://localhost:3000/registers/" + $id.value, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: $name.value,
        alias: $alias.value,
      }),
    });
    if (!res.ok) throw new Error("HTTP" + res.status);

    const result = await res.json();

    $out.textContent = "Member updated:\n" + JSON.stringify(result, null, 2);
  } catch (error) {
    $out.textContent = "Erro: " + error.message;
  }
}

async function memberDelete() {
  $out.textContent = "Deleting...";
  try {
    const res = await fetch("http://localhost:3000/registers/" + $id.value, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("HTTP" + res.status);

    const result = await res.json();

    $out.textContent = "Member deleted:\n" + JSON.stringify(result, null, 2);
  } catch (error) {
    $out.textContent = "Erro: " + error.message;
  }
}

async function memberCreate() {
  $out.textContent = "Creating...";
  try {
    const res = await fetch("http://localhost:3000/registers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: $name.value,
        alias: $alias.value,
      }),
    });
    if (!res.ok) throw new Error("HTTP" + res.status);

    const result = await res.json();

    $out.textContent = "Member created:\n" + JSON.stringify(result, null, 2);
  } catch (error) {
    $out.textContent = "Erro: " + error.message;
  }
}
//methods

$get.addEventListener("click", memberCheck);
$put.addEventListener("click", memberUpdate);
$delete.addEventListener("click", memberDelete);
$post.addEventListener("click", memberCreate);
//eventsListener
