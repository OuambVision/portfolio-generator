import styles from './HomeSection.module.css';
import content from './homeSection.json';

export default function HomeSection() {
    return <>
        <div>{content.nom}</div>
    </>
}