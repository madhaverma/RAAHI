import React, { useState, useEffect, useRef } from 'react';

// --- Helper Components ---

/**
 * A reusable map component that embeds an OpenStreetMap view using an iframe.
 */
const MapComponent = ({ lat, lon, zoom = 13, showTraffic, showPotholes }) => {
    const getBoundingBox = (latitude, longitude, zoomLevel) => {
        const factor = Math.pow(2, zoomLevel) / 2000;
        const latOffset = 0.5 / factor;
        const lonOffset = 0.5 / factor;
        return [longitude - lonOffset, latitude - latOffset, longitude + lonOffset, latitude + latOffset].join(',');
    };

    const bbox = getBoundingBox(lat, lon, zoom);
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

    const potholes = [ { top: '30%', left: '50%' }, { top: '60%', left: '45%' }, { top: '45%', left: '65%' }, { top: '70%', left: '30%' }];

    return (
        <div style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
            <iframe
                title="Embedded OpenStreetMap"
                width="100%" height="100%" frameBorder="0" scrolling="no"
                src={mapUrl} style={{ border: 'none' }}
            />
            {showTraffic && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 0, 0, 0.2)', pointerEvents: 'none' }}></div>
            )}
            {showPotholes && potholes.map((pothole, index) => (
                 <div key={index} title="Pothole" style={{ position: 'absolute', top: pothole.top, left: pothole.left, width: '20px', height: '20px', backgroundColor: 'rgba(139, 69, 19, 0.7)', borderRadius: '50%', border: '2px solid white', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}></div>
            ))}
        </div>
    );
};


/**
 * A chat interface component for interacting with the Gemini AI.
 */
const ChatComponent = ({ apiKey }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const chatContainerRef = useRef(null);
    
    // Auto-scroll to the latest message
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newUserMessage = { role: "user", parts: [{ text: userInput }] };
        setChatHistory(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);
        setError(null);
        
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        
        const systemInstruction = {
            role: "system",
            parts: [{ text: "You are a helpful and knowledgeable local guide for Greater Noida, Uttar Pradesh, India. Your responses should be concise, friendly, and focused on providing useful information about the area. The current date is Wednesday, September 24, 2025." }]
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [systemInstruction, ...chatHistory, newUserMessage] })
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText} (Status: ${response.status})`);
            
            const data = await response.json();
            const modelResponse = data.candidates?.[0]?.content;

            if (modelResponse) {
                setChatHistory(prev => [...prev, modelResponse]);
            } else {
                throw new Error("Invalid response structure from API.");
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
            const errorMessage = { role: "model", parts: [{ text: `Sorry, I ran into an error: ${err.message}` }]};
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #e0e0e0' }}>
            <h3 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid #e0e0e0', color: '#333' }}>Local Guide Chat</h3>
            <div ref={chatContainerRef} style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {chatHistory.length === 0 && <div style={{textAlign: 'center', color: '#888', marginTop: '2rem'}}>Ask me anything about Greater Noida!</div>}
                {chatHistory.map((message, index) => (
                    <div key={index} style={{
                        alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                        backgroundColor: message.role === 'user' ? '#007bff' : '#e9ecef',
                        color: message.role === 'user' ? 'white' : 'black',
                        padding: '10px 15px',
                        borderRadius: '18px',
                        maxWidth: '80%',
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.5'
                    }}>
                        {message.parts[0].text}
                    </div>
                ))}
                {isLoading && <div style={{alignSelf: 'flex-start', color: '#555'}}><i>Typing...</i></div>}
                {error && <div style={{alignSelf: 'flex-start', color: 'red'}}>Error: {error}</div>}
            </div>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', padding: '1rem', borderTop: '1px solid #e0e0e0' }}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask about landmarks, food, etc."
                    style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '8px 0 0 8px', fontSize: '1rem' }}
                />
                <button type="submit" disabled={isLoading} style={{ padding: '12px 18px', border: 'none', backgroundColor: '#007bff', color: 'white', borderRadius: '0 8px 8px 0', cursor: 'pointer', fontSize: '1rem' }}>
                    Send
                </button>
            </form>
        </div>
    );
};


// --- Main App with New Layout ---
export default function App() {
    const greaterNoida = { lat: 28.4744, lon: 77.5040 };
    const [apiKey] = useState('AIzaSyBCKzGGWoEuVb4LJ7arIW4joni0VESCAlk');
    const [showTraffic, setShowTraffic] = useState(false);
    const [showPotholes, setShowPotholes] = useState(false);

    const buttonStyle = (isActive) => ({
        padding: '10px 18px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        backgroundColor: isActive ? '#007bff' : '#e9ecef',
        color: isActive ? 'white' : 'black',
        transition: 'background-color 0.3s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    });

    return (
        <div style={{
            fontFamily: 'sans-serif', backgroundColor: '#f4f7f9', minHeight: '100vh',
            padding: '2rem', boxSizing: 'border-box'
        }}>
            <header style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ color: '#2c3e50' }}>Greater Noida Interactive Dashboard</h1>
            </header>
            
            <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', alignItems: 'flex-start', height: 'calc(100vh - 150px)', maxHeight: '700px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%'}}>
                    <div style={{ flex: 1 }}>
                        <MapComponent 
                            lat={greaterNoida.lat} 
                            lon={greaterNoida.lon}
                            showTraffic={showTraffic}
                            showPotholes={showPotholes}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <button style={buttonStyle(showTraffic)} onClick={() => setShowTraffic(!showTraffic)}>
                            {showTraffic ? 'Hide Traffic' : 'Show Traffic'}
                        </button>
                        <button style={buttonStyle(showPotholes)} onClick={() => setShowPotholes(!showPotholes)}>
                            {showPotholes ? 'Hide Potholes' : 'Show Potholes'}
                        </button>
                    </div>
                </div>

                <div style={{ height: '100%' }}>
                   <ChatComponent apiKey={apiKey} />
                </div>
            </main>
        </div>
    );
}
