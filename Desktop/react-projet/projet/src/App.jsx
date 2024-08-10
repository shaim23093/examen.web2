


import React, { useState, useEffect } from 'react'; 
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Possesion from '../../patrimoine-economique/models/possessions/Possession.js'
import Patimoine from '../../patrimoine-economique/models/Patrimoine.js'
import Personne from '../../patrimoine-economique/models/Personne.js'
import Flux from '../../patrimoine-economique/models/possessions/Flux.js'
import Patrimoine from '../../patrimoine-economique/models/Patrimoine.js';
import {Button} from 'react-bootstrap';

const rakot =new Personne ("rakot");
let tableau =[ ];

function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('./data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur des données');
        }
        return response.json();
      })
      .then((jsonData) => {
        const possessions = jsonData.find(item => item.model === "Patrimoine").data.possessions;
        setData(possessions);
      })
      .catch((error) => {
        console.error('Erreur:', error);
      });data
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Libellé</th>
              <th>Valeur</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Taux d'Amortissement</th>
              <th>Jour</th>
              <th>Valeur Actuel</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              let possesion ;
               if (item.valeurConstante) {
                  possesion =new Flux (rakot,item.libelle,item.valeurConstante,new Date(item.dateDebut),new Date(item.dateFin),item.tauxAmortissement,item.jour)
                
               }
               else {
                  possesion =new Possesion (rakot, item.libelle,item.valeur, new Date(item.dateDebut), new Date(item.dateFin), item.tauxAmortissement,item.jour,)
               }
               tableau.push(possesion);
             
              return (
              <tr key={index}>
                <td>{possesion.libelle}</td>
                <td>{possesion.valeur || possesion.valeurConstante}</td>
                <td>{possesion.dateDebut.toDateString()}</td>
                <td>{possesion.dateFin.toDateString() || '0'}</td>
                <td>{possesion.tauxAmortissement || '0'}</td>
                <td>{possesion.jour || '0'}</td>
                <td>{possesion.getValeur(new Date()) || '0'}</td>
              </tr>
            )})}
          </tbody>
        </Table>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}
  
function Patrimoinevalue(){
  //maka possesion apidirina anaty objet patrimoine
  //calculer par rapport @date inpute ny date ilay possisseion
  const patrimoine =new Patrimoine (rakot,tableau);
  const [dateVAlue, setDateValue] = useState();


  return (
  <>

    <input type="date" name="date" id="date" value={dateVAlue} onChange={(event)=>{
      setDateValue (event.target.value);
    }}/>

    <input type="button" value="boutton" onClick={()=>{
      
      patrimoine.getValeur(new Date(dateVAlue))
    }} />

  </>
)
}
 
 
 export default function App() {
  return (
    <div>
      <h1>Tableau des Possessions</h1>
      <DataTable />
      <Patrimoinevalue />
    </div>

  );
}

 














