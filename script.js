Parse.initialize(
  "7pVVtjCTwxfofutumr147TmNbYPMGP4WBFSrpg1Y",
  "lBlkDCKvKIhSHmlwDgtUpJVXn9M3ylTvImg9Iexi"
);
Parse.serverURL = "https://parseapi.back4app.com/";

const list = document.getElementById("list");

const read = async () => {
  list.innerHTML = "";

  const query = new Parse.Query("Anime");

  try {
    const count = await query.count();
    query.ascending("title");
    const results = await query.find();

    document.getElementById("count").innerHTML = count;

    for (const object of results) {
      const id = object.id;
      const title = object.get("title");

      const li = document.createElement("li");
      li.innerHTML = title;
      li.style.display = "inline-block";

      const br1 = document.createElement("br");
      const br2 = document.createElement("br");

      const btnRemove = document.createElement("button");
      btnRemove.innerHTML = "x";
      btnRemove.style.color = "Red";

      list.appendChild(btnRemove);
      list.appendChild(li);
      list.appendChild(br1);
      list.appendChild(br2);

      btnRemove.addEventListener("click", async () => {
        const anime = new Parse.Object("Anime");

        anime.set("objectId", id);

        try {
          await anime.destroy();
          read();
        } catch (error) {
          alert(`Failed to delete the object: ${error.message}`);
        }
      });
    }
  } catch (error) {
    alert(`Failed to read an object: ${error.message}`);
  }
};

const create = async () => {
  const anime = new Parse.Object("Anime");

  anime.set("title", document.getElementById("title").value);

  try {
    await anime.save();
    read();
  } catch (error) {
    alert(`Failed to create new object: ${error.message}`);
  }
};

document.getElementById("title").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btnCreate").click();
  }
});

document.getElementById("btnCreate").addEventListener(
  "click",
  async function () {
    create();
    document.getElementById("title").value = "";
  },
  false
);

read();
