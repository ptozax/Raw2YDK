import { useState } from 'react'

function R2t() {
    const [text, setText] = useState("");
    const downloadTxtFile = () => {
        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "output.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                <button onClick={downloadTxtFile} disabled={!text} className="p-2 bg-blue-500 text-white rounded">
                    Download as .txt
                </button>
            </div>
        </>

    )
}

export default R2t
