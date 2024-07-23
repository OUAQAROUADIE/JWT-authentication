import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Assurez-vous d'utiliser le bon import
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams(); // Récupérer l'ID utilisateur depuis les paramètres de l'URL
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour vérifier la validité du jeton
    const checkTokenValidity = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decoded = jwtDecode(token); // Décoder le token
          const currentTime = Date.now() / 1000; // Temps actuel en secondes
          if (decoded.exp < currentTime) {
            console.log('Token is expired');
            localStorage.removeItem('authToken');
            window.location.href = '/'; // Redirection vers la page de connexion
          } else {
            // Stocker les données décodées dans le state
            setUserData(decoded);
          }
        } catch (e) {
          console.error('Invalid token', e);
          localStorage.removeItem('authToken');
          window.location.href = '/'; // Redirection en cas de jeton invalide
        }
      }
    };

    checkTokenValidity();
  }, []);

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Loading...</div>;

  // Affichage des informations extraites du JWT
  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {userData.claims.name}</p>
      <p><strong>Email:</strong> {userData.claims.username}</p>
      <p><strong>Role:</strong> {userData.authorities}</p>
    </div>
  );
};

export default UserProfile;
