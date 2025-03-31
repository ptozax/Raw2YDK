import { useState, useEffect } from "react";
import { useGlobalContext } from "../global_context.jsx"; // Assuming this path is correct
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'; // Optional: for user feedback
import Spinner from 'react-bootstrap/Spinner'; // Optional: for loading indicator
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function R2t() {


    const [text, setText] = useState("");
    const { Cards } = useGlobalContext(); // Only need Cards here if setCards isn't used
    const [dowload_deck, setDownload_deck] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(''); // For displaying errors to the user
    const [cardsNotFound, setCardsNotFound] = useState([]); // Track not found cards

    // Effect to trigger download when download_deck state is set
    useEffect(() => {
        if (dowload_deck) {
            downloadTxtFile();
            // Reset state after triggering download
            setDownload_deck("");
            setIsProcessing(false);
             // Optionally clear the text area after successful download
            // setText("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dowload_deck]); // Dependency array includes dowload_deck

    const downloadTxtFile = () => {
        try {
            const blob = new Blob([dowload_deck], { type: "text/plain;charset=utf-8" }); // Ensure encoding
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = "deck.ydk";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url); // Clean up the object URL
        } catch (err) {
            console.error("Error creating download link:", err);
            setError("Failed to initiate download. Please try again.");
            setIsProcessing(false); // Ensure processing state is reset on error
        }
    };

    // Function to prepare the deck string for download
    function PreDownload() {
        setError(''); // Clear previous errors
        setCardsNotFound([]); // Clear previous not found cards
        if (!text.trim()) {
            setError("Please paste a decklist first.");
            return;
        }
        if (!Cards || Cards.length === 0) {
             setError("Card data is not loaded yet. Please wait or refresh.");
             console.error("Card data (Cards from context) is missing or empty.");
             return;
        }

        setIsProcessing(true);

        // Use setTimeout to allow UI update before heavy processing blocks the thread
        setTimeout(() => {
            try {
                let Deck = "#created by YDK Generator\n"; // Add a creator comment
                const lines = text.split(/\r?\n/);
                let currentSection = "#main"; // Default to main deck
                let sectionAdded = { main: false, extra: false, side: false };
                let localNotFound = [];

                lines.forEach((line) => {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) return; // Skip empty lines

                    // Section Handling - ensures section headers are added only once if needed
                    if (/^main deck[:]?/i.test(trimmedLine)) {
                        if (!sectionAdded.main) Deck += "#main\n";
                        currentSection = "#main";
                        sectionAdded.main = true;
                        return; // Move to next line after processing header
                    } else if (/^extra deck[:]?/i.test(trimmedLine)) {
                        if (!sectionAdded.extra) Deck += "#extra\n";
                        currentSection = "#extra";
                        sectionAdded.extra = true;
                        return;
                    } else if (/^side deck[:]?/i.test(trimmedLine)) {
                        if (!sectionAdded.side) Deck += "!side\n";
                        currentSection = "!side";
                        sectionAdded.side = true;
                        return;
                    }

                     // Ensure the initial section is added if the first card appears before a header
                     if (currentSection === "#main" && !sectionAdded.main) { Deck += "#main\n"; sectionAdded.main = true; }
                     else if (currentSection === "#extra" && !sectionAdded.extra) { Deck += "#extra\n"; sectionAdded.extra = true; }
                     else if (currentSection === "!side" && !sectionAdded.side) { Deck += "!side\n"; sectionAdded.side = true; }

                    // Card Line Processing (handles "3x Card Name", "3 Card Name", "Card Name")
                    let count = 1;
                    let name = trimmedLine;

                    // Match "3x Card Name" or "3 Card Name"
                    const match = trimmedLine.match(/^(\d+)\s*(?:x\s)?(.+)/i);
                    if (match) {
                        count = parseInt(match[1], 10);
                        name = match[2].trim();
                    } else {
                        // If no number prefix, assume count is 1 and the whole line is the name
                        name = trimmedLine;
                    }

                    if (isNaN(count) || count <= 0) {
                        console.warn(`Skipping line with invalid count: ${trimmedLine}`);
                        return; // Skip lines with invalid counts
                    }

                    // Find card by name (case-insensitive)
                    const card = Cards.find(c => c.name.toLowerCase() === name.toLowerCase());

                    if (card && card.id) {
                        for (let i = 0; i < count; i++) {
                            Deck += card.id + "\n";
                        }
                    } else {
                         console.warn(`Card not found: ${name}`);
                         if (!localNotFound.includes(name)) {
                            localNotFound.push(name);
                         }
                         // Optional: Decide if you want to add a placeholder or skip
                         // Deck += `# Card not found: ${name}\n`; // Example placeholder
                    }
                });

                setCardsNotFound(localNotFound); // Update state with cards not found during this process
                setDownload_deck(Deck); // This will trigger the useEffect for download

            } catch (err) {
                console.error("Error processing deck list:", err);
                setError("An error occurred while processing the deck list. Check format and console.");
                setIsProcessing(false); // Reset processing state on error
            }
        }, 50); // Small delay (50ms)
    }

    // Handler for form submission to prevent default page reload
    const handleSubmit = (event) => {
        event.preventDefault();
        PreDownload();
    };

    return (
        <Container className="my-4">
            <Row className="justify-content-md-center">
                <Col md={10} lg={8}> {/* Adjust column width as needed */}
                    <h1 className="text-center mb-4">Yu-Gi-Oh! Decklist to YDK Converter</h1>

                    {/* Display Error Messages */}
                    {error && <Alert variant="danger">{error}</Alert>}

                     {/* Display Cards Not Found Warnings */}
                     {cardsNotFound.length > 0 && (
                        <Alert variant="warning">
                            <Alert.Heading>Cards Not Found</Alert.Heading>
                            <p>The following card names could not be found in the database and were skipped:</p>
                            <ul>
                                {cardsNotFound.map((cardName, index) => (
                                    <li key={index}>{cardName}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="decklistTextarea">
                            <Form.Label>Paste Decklist Here</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={12} // Adjust rows for desired height
                                placeholder={`Paste your decklist, for example:\n\nMain Deck:\n3x Blue-Eyes White Dragon\n1x Pot of Greed\n\nExtra Deck:\n1x Linkuriboh\n\nSide Deck:\n...`}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                disabled={isProcessing} // Disable textarea while processing
                                required // Basic HTML5 validation
                            />
                            <Form.Text className="text-muted">
                                Supports formats like "3x Card Name", "3 Card Name", or just "Card Name" (quantity 1). Include section headers like "Main Deck:", "Extra Deck:", "Side Deck:".
                            </Form.Text>
                        </Form.Group>

                        <div className="d-grid gap-2"> {/* Use d-grid for full-width button */}
                            <Button
                                variant="primary"
                                type="submit" // Use submit type with Form onSubmit
                                disabled={!text.trim() || isProcessing || !Cards || Cards.length === 0} // More robust disable condition
                            >
                                {isProcessing ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="ms-2">Processing...</span>
                                    </>
                                ) : (
                                    'Download as .ydk'
                                )}
                            </Button>
                        </div>
                         {(!Cards || Cards.length === 0) && !isProcessing && (
                                <Alert variant="info" className="mt-3 text-center">
                                    Waiting for card data to load... If this persists, please refresh.
                                </Alert>
                         )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default R2t;
