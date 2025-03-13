import { useState, useEffect } from "react";
import thtext from "./db/cards.json";
import { useGlobalContext } from "../global_context.jsx";


function CardList() {
        const { Cards, setCards} = useGlobalContext();


console.log("cards",Cards);
    return (
        <>
<h1>Test</h1>

        </>)

}

export default CardList;