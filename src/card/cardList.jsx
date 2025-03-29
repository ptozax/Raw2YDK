import { useState, useEffect } from "react";
import thtext from "./db/cards.json";
import { useGlobalContext } from "../global_context.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './cardList.css';

function CardList() {
        const { Cards, setCards } = useGlobalContext();
        const [selectedCard, setSelectedCard] = useState(null);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedType, setSelectedType] = useState('All');
        const [selectedSet, setSelectedSet] = useState(null);
        const [showModal, setShowModal] = useState(false); // New state for modal visibility



        const handleCardSelect = (card) => {
                setSelectedCard(card);
                setShowModal(true); // Show modal when card is selected


        };

        const handleSetClick = (setName) => {
                setSearchQuery(''); // Clear the search query when filtering by set
                setSelectedSet(setName);
                setShowModal(false); // Close the modal when filtering by set
        };


        const handleClearSetClick = () => {
                setSelectedSet(null);
                setShowModal(false); // Close the modal when filtering by set
        };

        const filteredCards = Cards.filter((card) => {
                const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesType = selectedType === 'All' || card.type.includes(selectedType);
                const matchesSet = !selectedSet || card.card_sets?.some(set => set.set_name === selectedSet);

                return matchesSearch && matchesType && matchesSet;
        }).slice(0, 204);

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


        return (
                <>
                        <div className="app container-fluid">
                                <div className="row">

                                        <div className="col-md-12 card-list">
                                                <div className="search-filter mb-4">
                                                        <div className="container-fluid selected-detail" >
                                                                <div className="row">
                                                                        <div className="col-md-12  ">
                                                                                <input
                                                                                        type="text"
                                                                                        className="form-control mb-3"
                                                                                        placeholder="Search for a card..."
                                                                                        value={searchQuery}
                                                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                                                />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                                <select id="card-type" className="form-select" value={selectedType} onChange={handleTypeChange}>
                                                                                        <option value="All">Select Type</option>
                                                                                        <option value="Monster">Monster</option>
                                                                                        <option value="Spell">Spell</option>
                                                                                        <option value="Trap">Trap</option>
                                                                                </select>
                                                                        </div>
                                                                        <div className="col-md-6 ">
                                                                                {selectedSet && (

                                                                                        <button  className="btn btn-outline-primary btn-sm me-2 mb-2"
                                                                                                onClick={() => handleClearSetClick()}>
                                                                                                {selectedSet} | X
                                                                                        </button>



                                                                                )}
                                                                        </div>


                                                                </div>
                                                        </div>



                                                </div>

                                                <div className="card-thumbnails row">
                                                        {filteredCards.map((card) => (
                                                                <div
                                                                        key={card.id}
                                                                        onClick={() => handleCardSelect(card)}
                                                                        className="card-thumbnail "
                                                                >
                                                                        <img src={card.card_images[0].image_url_small} alt={card.name} className="img-fluid" />
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>
                                </div>
                        </div>
                        {selectedCard && (
                                <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog"
                                        onClick={(e) => {
                                                if (e.target.classList.contains('modal')) {
                                                        setShowModal(false);
                                                }
                                        }}>
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content">
                                                        <div className="modal-header">
                                                                <h5 className="modal-title">{selectedCard.name}</h5>
                                                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                                        </div>
                                                        <div className="container-fluid selected-detail" >
                                                                <div className="row">
                                                                        <div className="col-md-6 col-sm-12">


                                                                                <img className="img-fluid mb-3" src={selectedCard.card_images?.[0]?.image_url_small} alt={selectedCard.name} />
                                                                                <p><strong>Type:</strong> {selectedCard.type}</p>




                                                                        </div>
                                                                        <div className="col-md-6 col-sm-12">
                                                                                <p><strong>Description:</strong> {selectedCard.desc}</p>
                                                                                <p><strong>TH-Description:</strong> {th_desc(selectedCard.id)}</p>
                                                                                <hr />
                                                                                <strong>Card Sets</strong>
                                                                                <div className="selected-detail" >
                                                                                        {selectedCard.card_sets?.map((set, index) => (
                                                                                                <button key={index} className="btn btn-outline-primary btn-sm me-2 mb-2"
                                                                                                        onClick={() => handleSetClick(set.set_name)}>
                                                                                                        {set.set_name}
                                                                                                </button>
                                                                                        ))}
                                                                                </div>

                                                                        </div>
                                                                </div>

                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        )}


                        {showModal && (
                                <div
                                        className="modal-backdrop fade show"
                                        style={{ zIndex: 1040 }}
                                        onClick={() => setShowModal(false)}
                                ></div>
                        )}



                </>
        );
}

export default CardList;
