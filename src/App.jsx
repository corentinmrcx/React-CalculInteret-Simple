import { useState } from "react";

/**
 *
 */
function App() {
  const [montantInitial, setMontantInitial] = useState(1000);
  const [tauxInteret, setTauxInteret] = useState(2.0);
  const [interets, setInterets] = useState(0);
  const [duree, setDuree] = useState(12);

  const [operations, setOperations] = useState([]);
  const [nouvelleOperation, setNouvelleOperation] = useState({
    montant: 0,
    date: "today",
    type: "versement",
  });

  /**
   * Fonction qui permet d'ajouter une oppération (versement ou retrait)
   */
  function ajouterOperation() {
    if (!nouvelleOperation.date || nouvelleOperation.montant === 0) {
      throw new Error("Nouvelle operation doesn't match");
    }

    setOperations([
      ...operations,
      { ...nouvelleOperation, montant: parseFloat(nouvelleOperation.montant) },
    ]);
    setNouvelleOperation({ montant: 0, date: "today", type: "versement" });
  }

  /**
   *
   */
  function calculerInterets() {
    let solde = montantInitial;
    let interetsTotal = 0;
    const nbrQuinzaine = duree * 2;

    for (let quinzaine = 0; quinzaine < nbrQuinzaine; quinzaine++) {
      interetsTotal += (solde * tauxInteret * 15) / 36000;

      operations.forEach((operation) => {
        if (operation.type === "versement") {
          solde += operation.montant;
        } else if (operation.type === "retrait") {
          solde -= operation.montant;
        }
      });
    }

    setInterets(interetsTotal);
  }

  return (
    <div>
      <h1>Calcul des Intérêts Simples</h1>

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

      <h2>Ajouter une opération</h2>
      <div>
        <label>Type :</label>
        <select
          value={nouvelleOperation.type}
          onChange={(e) =>
            setNouvelleOperation({ ...nouvelleOperation, type: e.target.value })
          }
        >
          <option value="versement">Versement</option>
          <option value="retrait">Retrait</option>
        </select>
      </div>

      <div>
        <label>Montant (€) :</label>
        <input
          type="number"
          value={nouvelleOperation.montant}
          onChange={(e) =>
            setNouvelleOperation({
              ...nouvelleOperation,
              montant: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label>Date :</label>
        <input
          type="date"
          value={nouvelleOperation.date}
          onChange={(e) =>
            setNouvelleOperation({ ...nouvelleOperation, date: e.target.value })
          }
        />
      </div>

      <button onClick={ajouterOperation}>Ajouter l&#39;opération</button>

      <h2>Opérations</h2>
      <ul>
        {operations.map((op, index) => (
          <li key={index}>
            {op.type === "versement" ? "➕" : "➖"} {op.montant} € le {op.date}
          </li>
        ))}
      </ul>

      <button onClick={calculerInterets}>Calculer les Intérêts</button>

      <h2>Résultat</h2>
      <p>💰 Montant initial : {montantInitial} €</p>
      <p>📈 Taux d&#39;intérêt : {tauxInteret} %</p>
      <p>⏳ Durée : {duree} mois</p>
      <p>🔢 Intérêts générés : {interets} €</p>
    </div>
  );
}

export default App;
