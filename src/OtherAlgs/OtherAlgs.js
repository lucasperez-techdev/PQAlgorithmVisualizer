import React, { useState } from 'react';
import '../OtherAlgs/OtherAlgs.css';

const algorithms = [
    { name: "Sliding Window", description: "Efficiently processes subarrays by maintaining a dynamic window and sliding it across the array." },
    { name: "Two Pointer", description: "Uses two pointers moving towards or away from each other to solve array or string problems." },
    { name: "Knapsack Algorithm", description: "Maximizes value by selecting items within a weight limit, often used in optimization problems." },
    { name: "Bellman-Ford Algorithm", description: "Finds shortest paths in a graph, handles negative weights, and detects negative cycles." },
    { name: "Djisktras Algorithm", description: "Finds the shortest paths in a graph with non-negative weights using a greedy approach." },
];

function OtherAlgs(props) {
    const {
        scrollToBellmanFordAlg,
        scrollToDjisktrasAlg,
        scrollToKnapsackAlg,
        scrollToSlidingWindow,
        scrollToTwoPointer,
    } = props;

    const [cards, setCards] = useState(algorithms.map((algo, index) => ({
        index,
        ...algo,
        pile: 'center',
        isShuffling: false,
        animationDelay: 0,
    })));

    const [history, setHistory] = useState([]);

    const moveCard = (direction) => {
        if (cards.some(card => card.pile === 'center')) {
            // Save current state into history
            setHistory(prevHistory => [...prevHistory, cards]);

            let newCards = [...cards];
            for (let i = newCards.length - 1; i >= 0; i--) {
                if (newCards[i].pile === 'center') {
                    newCards[i] = { ...newCards[i], pile: direction };

                    setTimeout(() => {
                        let finalCards = [...newCards];
                        const movedCard = finalCards.splice(i, 1)[0];
                        finalCards.push(movedCard);
                        setCards(finalCards);
                    }, 300);
                    break;
                }
            }
            setCards(newCards);
        } else {
            shuffleBackToCenter();
        }
    };

    const shuffleBackToCenter = () => {
        // Save current state into history
        setHistory(prevHistory => [...prevHistory, cards]);

        const leftCards = cards.filter(card => card.pile === 'left');
        const rightCards = cards.filter(card => card.pile === 'right');

        const shuffledOrder = [];
        const maxLength = Math.max(leftCards.length, rightCards.length);
        for (let i = 0; i < maxLength; i++) {
            if (leftCards[i]) shuffledOrder.push(leftCards[i]);
            if (rightCards[i]) shuffledOrder.push(rightCards[i]);
        }

        const newCards = cards.map(card => {
            const index = shuffledOrder.indexOf(card);
            if (index !== -1) {
                return {
                    ...card,
                    isShuffling: true,
                    animationDelay: index * 0.1,
                };
            }
            return card;
        });
        setCards(newCards);

        const totalDuration = (shuffledOrder.length - 1) * 0.1 + 0.5;
        setTimeout(() => {
            const resetCards = cards.map(card => ({
                ...card,
                pile: 'center',
                isShuffling: false,
                animationDelay: 0,
            }));
            setCards(resetCards);
        }, totalDuration * 1000);
    };

    const undoLastMove = () => {
        if (history.length > 0) {
            const lastCardsState = history[history.length - 1];
            setHistory(prevHistory => prevHistory.slice(0, -1));
            setCards(lastCardsState);
        }
    };

    const handlePolaroidClick = (algorithmName) => {
        switch (algorithmName) {
            case 'Bellman Ford Algorithm':
                scrollToBellmanFordAlg();
                break;
            case 'Djisktras Algorithm':
                scrollToDjisktrasAlg();
                break;
            case 'Knapsack Algorithm':
                scrollToKnapsackAlg();
                break;
            case 'Sliding Window':
                scrollToSlidingWindow();
                break;
            case 'Two Pointer':
                scrollToTwoPointer();
                break;
            default:
                break;
        }
    };

    return (
        <div className="sorting-screen">
            <button className="carousel-button left" onClick={() => moveCard('left')}>
            </button>

            <div className="polaroid-container">
                {cards.slice().map((card, index) => (
                    <div
                        key={card.index}
                        className={`polaroid ${card.pile} ${card.isShuffling ? 'shuffle' : ''}`}
                        style={{
                            zIndex: index,
                            animationDelay: `${card.animationDelay}s`,
                        }}
                        onClick={() => handlePolaroidClick(card.name)}
                    >
                        <div className="polaroid-content">
                            <h2>{card.name}</h2>
                            <p>{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="carousel-button right" onClick={() => moveCard('right')}></button>

            <button className="undo-button" onClick={undoLastMove} disabled={history.length === 0}></button>

        </div>
    );
}

export default OtherAlgs;