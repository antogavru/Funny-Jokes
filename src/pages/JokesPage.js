import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { Card } from "../components/Card"
import axios from 'axios'

const JokesPage = () => {
    const { category } = useParams()
    const [ jokes, setJokes ] = useState({
        originalJokes: [],
        seenJokes: []
    })

    useEffect(() => {
        const fetckJokes = async () => {
            axios.all(Array.from(Array(5), element => axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`)))
                .then(axios.spread((...responses) => {
                    const jokes = [];
                    const seenJokes = []

                    responses.map((res, key) => {
                        if(jokes && jokes.length > 0) {
                            const findId = jokes.find(element => res.data.id === element.id)
                            if(findId) seenJokes.push(res.data)
                            else jokes.push(res.data)
                        }
                        else jokes.push(res.data)
                    })
                setJokes({ originalJokes: [...jokes], seenJokes: [...seenJokes]})
            }));
        }

        fetckJokes()
    }, [])

    return (
        <div style={{
            backgroundColor: '#b8c6db'
        }}>
            <h2 style={{marginTop: 0, padding: '15px 0 0 15px'}}>This is the joke page for the selected category.</h2>
            <div style={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    padding: '5%',
                    }}>
                {
                    jokes && jokes.originalJokes ?
                    jokes.originalJokes.map((joke, key) => (
                        <Card key={key} joke={joke.value} url={joke.icon_url} />
                    ))
                    :null
                }
            </div>
            <h2 style={{padding: '15px 0 0 15px'}}>Duplicated jokes:</h2>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1, padding: '5%'}}>
                {
                    jokes && jokes.seenJokes ?
                    jokes.seenJokes.map((joke, key) => (
                        <Card key={key} joke={joke.value} url={joke.icon_url} />
                    ))
                    :null
                }
            </div>
        </div>
    )
}

export default JokesPage