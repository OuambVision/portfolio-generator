'use client'
import styles from './Test.module.css'
import { useState } from "react";

export default function Test() {
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await fetch(`/api/new-branch`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        //Récupération des données venant du serveur
        let res = await result.json();

        if (res.status === 200) {
            const newBranchName = `branche-${name}`; // Nom de la nouvelle branche
            const filePath = 'components/Template1/HomeSection/homeSection.json'; // Chemin vers votre fichier JSON dans le dépôt

            const result = await fetch('/api/update-json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newBranchName,
                    filePath,
                    name
                })
            });

            let res = await result.json();
            if (res.status === 200) {
                console.log('OK');
            } else if (res.status === 500) {
                console.log('NOT OK');
            }

        } else if (res.status === 500) {
            console.log('NOT OK');
        }
    }

    return <div>
        Portfolio Generator
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="votre nom"
            />
            <input type="submit" value='Generer' />
        </form>
    </div>
}