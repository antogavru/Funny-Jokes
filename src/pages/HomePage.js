import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './HomePage.css'

export const HomePage = () => {
    const [categories, setCategories] = useState(undefined)

    const fetchAndSetCategories = async () => {
        const response = await axios.get('https://api.chucknorris.io/jokes/categories')
        setCategories(response.data)
    }

    useEffect(() => {
        fetchAndSetCategories()
    }, [])

    return (
        <div style={{background: 'black', display: 'flex', alignItems: 'center',flexDirection: 'column'}}>
            <h2 style={{color: 'white', flex: 1, alignItems: 'center'}}>Choose a category to see some jokes:</h2>
            <div style={{ marginTop: '2%', flexGrow: 1}}>
                <ul>
                    {
                        categories && categories.map((category, key) => (
                            <li key={key}>
                                <Link to={`/jokes/${category}`} style={{color: 'white'}}>
                                    {category}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default HomePage