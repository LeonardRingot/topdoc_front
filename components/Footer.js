import Link  from "next/link";
import styles from"../styles/Footer.module.css"
export default function Footer()
{
return(
    <>
    <div className={styles.footer}>
        <h2>DocFlop, 9 Rue du Régiment de la Chaudière, 62200 Boulogne-sur-Mer
Conditions générales d'utilisation
• Conditions d'utilisation du site DocFlop
• Politique relative à la protection des données personnelles
• Politique en matière de cookies
• Gestion des cookies et consentement
• Règles de référencement
• Mentions légales
Annuaire des médecins du CNOM
• Annuaire des chirurgiens-dentistes de l'ONCD
• Ordre National des Médecins
• Ordre National des Chirurgiens-Dentistes</h2>
    </div>
    </>
)
}