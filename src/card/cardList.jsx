import { useState, useEffect, use } from "react";
import thtext from "./db/cards.json";
import { useGlobalContext } from "../global_context.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './cardList.css';

function CardList() {
        const { Cards, setCards } = useGlobalContext();


        const [selectedCard, setSelectedCard] = useState(null);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedType, setSelectedType] = useState('All');

        const handleCardSelect = (card) => {
                setSelectedCard(card);
        };

        const shuffledCards = shuffleArray([...Cards]);

        const filteredCards = shuffledCards.filter((card) => {
                const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesType = selectedType === 'All' || card.type.includes(selectedType) ;
                return matchesSearch && matchesType;
        }).slice(0, 200);

        const handleTypeChange = (e) => {
                setSelectedType(e.target.value);
        };

        function th_desc(id) {
                let desc = thtext.find(item => item.id === id);
                if (desc) {
                        return desc.th;
                } else {
                        return "No description available";
                }
        }

        function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
                }
                return array;
            }

        setTimeout(() => {
                console.log("->>",[...new Set(Cards.map(item => item.type))]);
        }, 1000);
        return (
                <>

                        <div className="app">
                                <div className="container">
                                        {/* Left Side: Selected Card */}
                                        <div className="selected-card">
                                                {selectedCard ? (
                                                        <div>
                                                                <h2>{selectedCard.name}</h2>
                                                                <img className="selected-img" src={selectedCard.card_images[0].image_url_small} alt={selectedCard.name} />
                                                                <p><strong>Type:</strong> {selectedCard.type}</p>
                                                                <p><strong>Description:</strong> {selectedCard.desc}</p>
                                                                <p><strong>TH-Description:</strong> {th_desc(selectedCard.id)}</p>
                                                        </div>
                                                ) : (
                                                        <p>Select a card to see its details.</p>
                                                )}
                                        </div>
                                        <div className="col-md-5">


                                        </div>

                                        {/* Right Side: Search and Card List */}
                                        <div className="card-list" >
                                                <input
                                                        type="text"
                                                        placeholder="Search for a card..."
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                                <div>
                                                        <label htmlFor="card-type">Filter by Type: </label>
                                                        <select id="card-type" value={selectedType} onChange={handleTypeChange}>
                                                                <option value="All">All</option>
                                                                <option value="Monster">Monster</option>
                                                                <option value="Spell">Spell</option>
                                                                <option value="Trap">Trap</option>
                                                        </select>
                                                </div>
                                                <div className="card-thumbnails">
                                                        {filteredCards.map((card) => (
                                                                <div
                                                                        key={card.id}
                                                                        onClick={() => handleCardSelect(card)}
                                                                        className="card-thumbnail"
                                                                >
                                                                        <img src={card.card_images[0].image_url_small} alt={card.name} />
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>
                                </div>
                        </div>
                </>





        );
}

export default CardList;
