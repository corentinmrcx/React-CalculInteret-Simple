import { useState } from "react";

/**
 *
 */
function App() {
  const [montantInitial, setMontantInitial] = useState(1000);
  const [tauxInteret, setTauxInteret] = useState(2.0);
  const [interets, setInterets] = useState(0);

  /**
   *
   */
  function calculerInterets() {
    const interetsCalcules = (montantInitial * tauxInteret) / 100;
    setInterets(interetsCalcules);
  }

  return (
    <div>
      <h1>Calcul des intérêts simple</h1>

      <div>
        <label>Montant initial (€) :</label>
        <input
          type="number"
          value={montantInitial}
          onChange={(e) => setMontantInitial(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Taux d&#39;intérêt annuel (%) :</label>
        <input
          type="number"
          value={tauxInteret}
          onChange={(e) => setTauxInteret(parseFloat(e.target.value))}
        />
      </div>

      <button onClick={calculerInterets}>Calculer les intérets</button>

      <p>Montant saisi : {montantInitial} €</p>
      <p>Taux d&#39;intérêt : {tauxInteret} %</p>
      <p>Intérêts générés : {interets} €</p>
    </div>
  );
}

export default App;
