import { useState } from "react";

/**
 *
 */
function App() {
  const [montantInitial, setMontantInitial] = useState(1000);
  const [tauxInteret, setTauxInteret] = useState(2.0);
  const [interets, setInterets] = useState(0);
  const [duree, setDuree] = useState(12);

  /**
   *
   */
  function calculerInterets() {
    const tauxMensuel = tauxInteret / 100 / 12;
    const nombreQuinzaines = Math.floor(duree * 2);

    const interetsCalcules =
      montantInitial * tauxMensuel * (nombreQuinzaines / 2);
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
      <div>
        <label>Durée (mois) :</label>
        <input
          type="number"
          value={duree}
          onChange={(e) => setDuree(parseInt(e.target.value, 10))}
        />
      </div>
      <button onClick={calculerInterets}>Calculer les intérets</button>

      <p>💰 Montant saisi : {montantInitial} €</p>
      <p>📈 Taux d&#39;intérêt : {tauxInteret} %</p>
      <p>⏳ Durée : {duree} mois</p>
      <p>🔢 Intérêts générés : {interets} €</p>
    </div>
  );
}

export default App;
