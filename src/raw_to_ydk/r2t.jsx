import { useState, useEffect } from 'react'

function R2t() {
    const [text, setText] = useState("");

    //let dowload_deck = "";
    const [clicked, setClicked] = useState(false);
    const [Cards, setCards] = useState([]);
    const [dowload_deck, setDownload_deck] = useState("");



    const downloadTxtFile = () => {
        const blob = new Blob([dowload_deck], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "deck.ydk";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setClicked(false);
    };



    useEffect(() => {
        fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
            .then((response) => response.json())
            .then((data) => {
                console.log("Yu-Gi-Oh! Card Data:", data);
                setCards(data.data);
            })
            .catch((error) => {
                console.error("Error fetching card data:", error);
            });
    }, []);



    console.log(Cards);
    function PreDownload() {

        setClicked(true);

        let Deck = "#created by Player\n";
        const lines = text.split(/\r?\n/);

        lines.forEach((line) => {
            if (line == "Main Deck:") {
                Deck = Deck + "#main\n";
            }
            else if (line == "Extra Deck:") {
                Deck = Deck + "#extra\n";
            }
            else if (line == "Side Deck:") {
                Deck = Deck + "!side\n";
            }
            else {
                if (/^\d/.test(line)) {
                    let name = line.slice(3);
                    const card = Cards.find((card) => card.name === name);
                    console.log(card);
                    if (card) {
                        for (let i = 0; i < parseInt(line[0]); i++) {
                            Deck = Deck + card.id + "\n";
                        }

                    }
                }
            }
        });
        // dowload_deck = Deck;
        setDownload_deck(Deck);
        if (Cards.length > 0) {
            downloadTxtFile();

        }

    }

    return (
        <>
            <div className="flex flex-col items-center p-4 space-y-4">
                <h1 className="text-2xl font-bold">Text to File Converter</h1>

                <textarea
                    className="w-80 h-40 p-2 border rounded"
                    placeholder="Enter text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={PreDownload} disabled={!text} className="p-2 bg-blue-500 text-white rounded">
                    Download as .ydk
                </button>
                {clicked && Cards.length > 0 ? downloadTxtFile() : ""}
                {clicked ? <> <h2>Loading...</h2></> : <></>}

            </div>
        </>
    )
}
export default R2t
