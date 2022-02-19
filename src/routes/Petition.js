import React from "react";
import "./petition.css";
import PetitionForm from "../components/petitionForm";
import petitionPicture from "../../src/petitionPicture.jpeg";
import PetitionGallery from "../components/PetitionGallery";

const Petition = () => {
  return (
    <div class="container">
      <div class="titleContainer">
        <h1 class="title">Faire une pétition</h1>
        <h3 class="subtitle">
          Aidez les jeunes enfants à vivre une vie meilleure!
        </h3>
        <h5 class="description">
          Tout le monde peut faire sa part dans la lutte pour la protection des
          droits des enfants. Informez-vous de leur situation, montrez votre
          appui pour les causes qui vous intéressent ou écrivez sur ce qui vous
          préoccupe le plus. Dites ce que vous pensez. Vos paroles sont nos
          armes précieuses dans cette lutte. Vos idées auront un impact sur le
          monde. Ensemble, nous ferons un changement pour l’avenir des enfants.
        </h5>
      </div>
      <div class="row-2">
        <img
          src={petitionPicture}
          alt="child holding a poster"
          style={{ objectFit: "contain", flex: 1 }}
          width="60%"
        />
        <PetitionForm />
      </div>
      <PetitionGallery />
    </div>
  );
};

export default Petition;
