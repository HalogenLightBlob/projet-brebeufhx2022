import React from "react";
import homePic1 from "../../src/homePic1.jpeg";
import homePic2 from "../../src/homePic2.jpeg";
import "./home.css";

const Home = () => {
  return (
    <div class="container">
      <h1 class="title">Se Battre pour l'avenir de nos enfants</h1>
      <div class="textContainer">
        <h3 class="subtitle-home">Notre Mission</h3>
        <h5 class="description">
          Les enfants à travers le monde subissent toute forme d’exploitation,
          de violence et d’abus. L’exploitation des enfants est sans frontière.
          Ils sont menacés dans tous les pays. Ils sont menacés là où ils se
          sentent en sécurité : à la maison, à l’école et de plus en plus sur
          des espaces virtuels. Les crises humanitaires viennent souvent
          aggraver la situation. Les enfants se retrouvent sans défense face à
          de la violence inhumaine. Devant de telle catastrophe, nous sommes
          obligés d’intervenir.
        </h5>
      </div>
      <div class="textContainer">
        <div class="row-2">
          <img
            src={homePic2}
            alt="child holding a poster"
            style={{ objectFit: "contain", flex: 1 }}
            width="50%"
          />
          <div>
            <h3 class="subtitle-home">Motivation</h3>
            <h5 class="description">
              Les droits des humains sont absolus et universels. Les enfants ne
              font pas exception. Peu importe leur origine, leur culture ou leur
              ethnicité, tous les enfants ont le droit d’être en sécurité,
              d’aller à l’école, de recevoir une éducation convenable et de
              vivre heureusement. Malheureusement, des millions d’enfants chaque
              année sont victimes de violence et d’exploitation. Ces différentes
              formes de violence entravent au développement économique des
              communautés et des nations. En effet, ces pertes sont estimées
              mondialement à 7 trillions de dollars par année, soit 8 % du PIB
              mondial. Sur le plan individuel, le traumatisme psychologique
              impacte négativement leurs performances académiques et donc leurs
              avenirs. Les effets se font ressentir après plusieurs générations.
              Le monde est plein d’imperfection. Visons-nous peut-être trop
              haut ? Le monde égalitaire et juste dont nous rêvons n’est-il
              qu’un idéal ? Non. Il est certainement possible de faire mieux
            </h5>
          </div>
        </div>
      </div>
      <div class="textContainer">
        <h3 class="subtitle-home">Objectifs</h3>
        <h5 class="description">
          L’exploitation des enfants fait ravage aux quatre coins du globe,
          causant des dégâts irrémédiables pour l’avenir de la société. Fermer
          les yeux sur la situation serait ignorer le futur de l’humanité. À
          travers notre plateforme, nous souhaitons offrir un outil fiable et
          sécuritaire à travers lequel les voix de chacun propagent aux quatre
          coins du globe. Nous croyons fermement aux pouvoirs de chacun. Cette
          responsabilité pèse sur chacun d’entre nous. Pour pouvoir emporter le
          long combat, nous devons rester vigilants à ce qui se passe dans le
          monde. Ensemble, nous pouvons faire une différence dans le futur de
          ces jeunes. Ensemble, réalisons l’avenir dont nous rêvons.
        </h5>
      </div>
      <div class="textContainer">
        <h3 class="subtitle-home">Saviez-vous que...</h3>
        <h5 class="description">
          <ul>
            <li>
              Environ 10 % des enfants dans le monde ne sont pas légalement
              protégés contre les punitions corporelles.
            </li>
            <li>
              Approximativement 15 millions de jeunes filles entre 15 à 19 ans
              ont été victimes d’agression sexuelle au cours de leur vie.
            </li>
            <li>
              Le tiers des étudiants dans le monde entre l’âge de 13 à 15 ans
              sont victimes d’intimidation.
            </li>
            <li>
              Les trois quarts des enfants entre l’âge de 2 à 4 ans sont
              victimes de traitement violent de la part de leur soigneur.
            </li>
          </ul>
        </h5>
      </div>
    </div>
  );
};

export default Home;
