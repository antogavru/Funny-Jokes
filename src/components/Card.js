import './Card.css'

export const Card = ({url, joke}) => {
    return (
        <div class="card">
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src={url} alt="JokeImage" />
            </div>
            <div class="container">
                {joke} 
            </div>
        </div>
    )
}

export default Card