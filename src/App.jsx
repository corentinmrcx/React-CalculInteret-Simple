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
    date: "",
    type: "versement",
    taux: 0,
  });

  /**
   * Fonction qui permet d'ajouter une oppération (versement ou retrait)
   */
  function ajouterOperation() {
    if (
      !nouvelleOperation.date ||
      (nouvelleOperation.montant === 0 && nouvelleOperation.type !== "taux")
    ) {
      throw new Error("Nouvelle operation doesn't match");
    }

    setOperations([
      ...operations,
      {
        ...nouvelleOperation,
        montant: parseFloat(nouvelleOperation.montant),
        taux: parseFloat(nouvelleOperation.taux),
      },
    ]);
    setNouvelleOperation({
      montant: 0,
      date: "",
      type: "versement",
      taux: tauxInteret,
    });
  }

  /**
   * Fonction qui permet de calculer les interets de chaque quinzaine
   */
  function calculerInterets() {
    const nbQuinzaines = duree * 2;
    const soldesParQuinzaine = new Array(nbQuinzaines).fill(montantInitial);
    const tauxParQuinzaines = new Array(nbQuinzaines).fill(tauxInteret);
    let interetsCumules = 0;

    const operationsTriees = [...operations].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    operationsTriees.forEach((op) => {
      const dateOp = new Date(op.date);
      const jourOp = dateOp.getDate();
      const moisOp = dateOp.getMonth();

      const indexQuinzaine = moisOp * 2 + (jourOp > 15 ? 1 : 0);

      if (op.type === "versement") {
        for (let i = indexQuinzaine + 1; i < soldesParQuinzaine.length; i++) {
          soldesParQuinzaine[i] += op.montant;
        }
      } else if (op.type === "retrait") {
        for (let i = indexQuinzaine; i < soldesParQuinzaine.length; i++) {
          soldesParQuinzaine[i] -= op.montant;
        }
      } else if (op.type === "taux") {
        for (let i = indexQuinzaine; i < soldesParQuinzaine.length; i++) {
          tauxParQuinzaines[i] = op.taux;
        }
      }
    });

    for (let i = 0; i < soldesParQuinzaine.length; i++) {
      interetsCumules +=
        (soldesParQuinzaine[i] * tauxParQuinzaines[i] * 15) / 36000;
    }

    setInterets(interetsCumules.toFixed(2));
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Calcul des Intérêts Simples</h1>
        <div className="content">
          <div className="left">
            <div className="input-group">
              <label>Montant initial (€) :</label>
              <input
                type="number"
                value={montantInitial}
                onChange={(e) => setMontantInitial(parseFloat(e.target.value))}
              />
            </div>

            <div className="input-group">
              <label>Taux d&#39;intérêt annuel (%) :</label>
              <input
                type="number"
                value={tauxInteret}
                onChange={(e) => setTauxInteret(parseFloat(e.target.value))}
              />
            </div>

            <div className="input-group">
              <label>Durée (mois) :</label>
              <input
                type="number"
                value={duree}
                onChange={(e) => setDuree(parseInt(e.target.value, 10))}
              />
            </div>

            <h2>Ajouter une opération</h2>
            <div className="input-group">
              <label>Type :</label>
              <select
                value={nouvelleOperation.type}
                onChange={(e) =>
                  setNouvelleOperation({
                    ...nouvelleOperation,
                    type: e.target.value,
                  })
                }
              >
                <option value="versement">Versement</option>
                <option value="retrait">Retrait</option>
                <option value="taux">Taux</option>
              </select>
            </div>

            {nouvelleOperation.type === "taux" ? (
              <div className="input-group">
                <label>Nouveau taux (%) :</label>
                <input
                  type="number"
                  value={nouvelleOperation.taux}
                  onChange={(e) =>
                    setNouvelleOperation({
                      ...nouvelleOperation,
                      taux: e.target.value,
                    })
                  }
                />
              </div>
            ) : (
              <div className="input-group">
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
            )}

            <div className="input-group">
              <label>Date :</label>
              <input
                type="date"
                value={nouvelleOperation.date}
                onChange={(e) =>
                  setNouvelleOperation({
                    ...nouvelleOperation,
                    date: e.target.value,
                  })
                }
              />
            </div>

            <button onClick={ajouterOperation}>Ajouter l&#39;opération</button>
          </div>

          <div className="separator"></div>

          <div className="right">
            <div>
              <h2>Opérations</h2>
              <ul>
                {operations.map((op, index) => (
                  <li key={index}>
                    {op.type === "versement"
                      ? "➕"
                      : op.type === "retrait"
                        ? "➖"
                        : "〽️"}{" "}
                    {op.type === "taux" ? `${op.taux} %` : `${op.montant} €`} le{" "}
                    {new Date(op.date).toLocaleDateString("fr-FR")}
                  </li>
                ))}
              </ul>

              <button onClick={calculerInterets}>Calculer les Intérêts</button>
            </div>
            <div>
              <h2>Résultat</h2>
              <p>
                💰 Montant initial : <span>{montantInitial} €</span>
              </p>
              <p>
                📈 Taux d&#39;intérêt : <span>{tauxInteret} %</span>
              </p>
              <p>
                ⏳ Durée : <span>{duree} mois</span>
              </p>
              <p>
                🔢 Intérêts générés : <span>{interets} €</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
