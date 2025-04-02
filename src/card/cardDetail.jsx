import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../global_context.jsx";
import thtext from "./db/cards.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import './cardList.css';

function CardDetail() {
    const { cardId } = useParams();
    const navigate = useNavigate();
    const { Cards } = useGlobalContext();
    const [card, setCard] = useState(null);

    useEffect(() => {
        const foundCard = Cards.find(c => c.id === parseInt(cardId));
        if (foundCard) {
            setCard(foundCard);
        } else {
            navigate('/Cards');
        }
    }, [cardId, Cards, navigate]);

    function th_desc(id) {
        let desc = thtext.find(item => item.id === id);
        if (desc) {
            return desc.th;
        } else {
            return "No description available";
        }
    }

    if (!card) {
        return <div className="container mt-4">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <img 
                        src={card.card_images[0].image_url} 
                        alt={card.name} 
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h2 className="mb-4">{card.name}</h2>
                    <div className="card-info">
                        <p><strong>Type:</strong> {card.type}</p>
                        <p><strong>Description:</strong> {card.desc}</p>
                        <p><strong>TH-Description:</strong> {th_desc(card.id)}</p>
                        
                        {card.type.includes('Monster') && (
                            <>
                                <p><strong>Level:</strong> {card.level}</p>
                                <p><strong>Attribute:</strong> {card.attribute}</p>
                                <p><strong>ATK:</strong> {card.atk}</p>
                                <p><strong>DEF:</strong> {card.def}</p>
                            </>
                        )}

                        <div className="mt-4">
                            <h4>Card Sets</h4>
                            <div className="d-flex flex-wrap gap-2">
                                {card.card_sets?.map((set, index) => (
                                    <span key={index} className="badge bg-primary">
                                        {set.set_name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDetail; 