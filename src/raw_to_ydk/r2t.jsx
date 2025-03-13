import { useState, useEffect } from "react";
import { useGlobalContext } from "../global_context.jsx";

function R2t() {
    const [text, setText] = useState("");
    // const [Cards, setCards] = useState([]);
    const { Cards, setCards} = useGlobalContext();
    const [dowload_deck, setDownload_deck] = useState("");

    // useEffect(() => {
    //     fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log("Yu-Gi-Oh! Card Data:", data);
    //             setCards(data.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching card data:", error);
    //         });
    // }, []);

    useEffect(() => {
        if (dowload_deck) {
            downloadTxtFile();
        }
    }, [dowload_deck]); // Call download function only when `dowload_deck` is updated

    const downloadTxtFile = () => {
        const blob = new Blob([dowload_deck], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "deck.ydk";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function PreDownload() {
        let Deck = "#created by Player\n";
        const lines = text.split(/\r?\n/);

        lines.forEach((line) => {
            if (line === "Main Deck:") {
                Deck += "#main\n";
            } else if (line === "Extra Deck:") {
                Deck += "#extra\n";
            } else if (line === "Side Deck:") {
                Deck += "!side\n";
            } else {
                if (/^\d/.test(line)) {
                    let name = line.slice(3);
                    const card = Cards.find((card) => card.name === name);
                    if (card) {
                        for (let i = 0; i < parseInt(line[0]); i++) {
                            Deck += card.id + "\n";
                        }
                    }
                }
            }
        });

        setDownload_deck(Deck); // Triggers `useEffect`, which calls `downloadTxtFile`
    }

    return (
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
        </div>
    );
}

export default R2t;
