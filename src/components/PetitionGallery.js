import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import SearchIcon from "@material-ui/icons/Search";

const PetitionItem = ({ petition, setShowPopup }) => {
  return (
    <div class="petition_post">
      {petition.author ? (
        <div>
          <p style={{ fontWeight: "bold", fontSize: "10px" }}>
            {petition.author}
          </p>

          <p style={{ fontWeight: "bold", fontSize: "10px" }}>
            {petition.emails}
          </p>
        </div>
      ) : (
        <p style={{ fontWeight: "bold", fontSize: "10px" }}>Anonyme</p>
      )}
      <div>
        <p style={{ fontStyle: "italic", fontSize: "18px" }}>
          {petition.title}
        </p>
        <p style={{ textAlign: "justify", fontSize: "10px" }}>
          {petition.text}
        </p>
      </div>
      <div>
        <p>{petition.votes} votes</p>
      </div>

      <div class="btn-container">
        <button
          class="vote-button"
          onClick={() => {
            setShowPopup(petition);
          }}
        >
          Voter
        </button>
      </div>
    </div>
  );
};

const PetitionGallery = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [petitions, setPetitions] = useState([]);
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (!showPopup) {
      setErr(false);
    }
  }, [showPopup]);

  useEffect(() => {
    // Fetch petitions
    fetch("https://brebeufhx5website.pythonanywhere.com/getRandomPetitions", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ count: 10 }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPetitions(data);
      })
      .catch((err) => {
        console.log(err);
        setPetitions([]);
      });
  }, []);

  const handleSearch = (text) => {
    if (text.trim().length > 0) {
      fetch("https://brebeufhx5website.pythonanywhere.com/searchPetitions", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ searchstring: text }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPetitions(data);
        })
        .catch((err) => {
          console.log(err);
          setPetitions([]);
        });
    } else {
      fetch("https://brebeufhx5website.pythonanywhere.com/getRandomPetitions", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ count: 10 }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPetitions(data);
        })
        .catch((err) => {
          console.log(err);
          setPetitions([]);
        });
    }
  };

  const handleFormSubmit = (email) => {
    if (email.trim().length > 0) {
      fetch("https://brebeufhx5website.pythonanywhere.com/votePetition", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: email.trim(), uid: showPopup.uid }),
      })
        .then((res) => res.text())
        .then((data) => {
          console.log(data);
          if (data === "invalid email") {
            alert("Courriel invalide");
          } else if (data === "already voted") {
            alert(
              "Le courriel a déjà été utilisé pour voter pour cette pétition"
            );
          } else if (data === "true") {
            alert("Le vote a été comptabilisé!");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    } else {
      alert("Le courriel n'est pas valide");
    }
  };

  return (
    <div class="gallery-container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ fontSize: "50px", textAlign: "center" }}>
          Gallerie de pétitions
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          paddingBottom: "30px",
        }}
      >
        <input
          class="inputs"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          style={{ background: "none" }}
          type="text"
          placeholder="Rechercher une pétition"
        ></input>
        <button
          style={{ background: "none", border: "none", cursor: "pointer" }}
          onClick={() => {
            handleSearch(text);
          }}
        >
          <SearchIcon></SearchIcon>
        </button>
      </div>
      <div class="gallery">
        {petitions.map((petition) => (
          <PetitionItem
            petition={petition}
            setShowPopup={setShowPopup}
            key={petition.uid}
          />
        ))}
      </div>
      <Popup trigger={showPopup} setTrigger={setShowPopup}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>Confirmez votre identité</h1>

          <form
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            onSubmit={(event) => {
              event.preventDefault();
              handleFormSubmit(email);
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <label for="email">Courriel</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                class="inputs"
                placeholder="Entrez votre courriel"
              ></input>
            </div>
            {err && (
              <p style={{ color: "red", fontSize: "10px" }}>
                Le courriel inscrit a déjà voté pour cette pétition
              </p>
            )}

            <button type="submit" class="submit-button">
              Confimer
            </button>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default PetitionGallery;
