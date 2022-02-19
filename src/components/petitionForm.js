import React, { useState } from "react";

// Name, email, title of petition, description of petition

const PetitionForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, email, firstName);
    if (!anonymous) {
      fetch("https://brebeufhx5website.pythonanywhere.com/uploadPetition", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          title: title,
          text: description,
          author: firstName + " " + lastName,
          email: email,
        }),
      })
        .then((res) => res.text())
        .then((data) => {
          if (data === "acepted") {
            alert("Succès!");
          } else {
            alert(
              "La pétition sera vérifiée par notre équipe, puis sera publiée."
            );
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Il y a eu un problème. SVP recommencer.");
        });
    } else {
      fetch("https://brebeufhx5website.pythonanywhere.com/uploadPetition", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          title: title,
          text: description,
        }),
      })
        .then((res) => res.text())
        .then((data) => {
          if (data === "acepted") {
            alert("Succès!");
          } else {
            alert(
              "La pétition sera vérifiée par notre équipe, puis sera publiée."
            );
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Il y a eu un problème. SVP recommencer.");
        });
    }
  };

  return (
    <div style={{ flex: 1, padding: "10px", minWidth: "400px" }}>
      <h1 style={{ textAlign: "center" }}>Commencez dès maintenant!</h1>
      <form onSubmit={handleSubmit} class="form">
        {!anonymous && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <input
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
                placeholder="Prénom"
                class="inputs"
                style={{ width: "50%" }}
              ></input>
              <input
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
                placeholder="Nom"
                class="inputs"
                style={{ width: "50%" }}
              ></input>
            </div>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              placeholder="Courriel"
              type="email"
              class="inputs"
            ></input>
          </>
        )}

        <input
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Titre de la pétition"
          class="inputs"
        ></input>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
          style={{ minHeight: "100px" }}
          placeholder="Décrivez en quelques lignes le motif de votre pétition"
          class="inputs"
        ></textarea>
        <div style={{ display: "inline", alignSelf: "center" }}>
          <input
            type="checkbox"
            id="isAnonymous"
            onClick={(e) => {
              setAnonymous(e.target.checked);
            }}
          ></input>
          <label for="isAnonymous" style={{ fontSize: 10 }}>
            Je veux rester anonyme
          </label>
        </div>

        <button type="submit" class="submit-button">
          Soumettre la pétititon
        </button>
      </form>
    </div>
  );
};

export default PetitionForm;
