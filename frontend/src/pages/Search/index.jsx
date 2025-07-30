import Container from "../../components/Container"
import PhotosList from "../../components/PhotosList"
import { useQuery } from "../../hooks/useQuery"
import styles from "./Search.module.css"

const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    return (
        <section>
            <Container>
                <header className={styles.search__title}>
                    <h2>Resultados da busca por {search}</h2>
                </header>

                <PhotosList />
            </Container>
        </section>
    )
}

export default Search