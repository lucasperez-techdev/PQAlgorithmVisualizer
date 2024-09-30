import React, { useState } from 'react';
import '../SearchingAlgs/SearchingAlgs.css';

const algorithms = [
    { name: "Linear Search", description: "A simple search algorithm that checks each element of the list until the desired element is found or the list ends." },
    { name: "Binary Search", description: "An efficient algorithm for searching a sorted array by repeatedly dividing the search interval in half. If the value of the search key is less than the middle element, the search continues in the left half; otherwise, it continues in the right half." },
    { name: "Jump Search", description: "Works on sorted arrays by jumping ahead by a fixed number of steps and then performing a linear search within a block." },
    { name: "Depth First Search", description: "A graph traversal algorithm that explores as far as possible along each branch before backtracking." },
    { name: "Breadth First Search", description: "A graph traversal algorithm that explores all neighbors at the present depth before moving on to nodes at the next depth level.\n" },
];

function SearhcingAlgs(props) {
    const {
        scrollToBinarySearch,
        scrollToBreadthFirstSearch,
        scrollToDepthFirstSearch,
        scrollToJumpSearch,
        scrollToLinearSearch,
    } = props;

    const [cards, setCards] = useState(algorithms.map((algo, index) => ({
        index,
        ...algo,
        pile: 'center',
        isShuffling: false,
        animationDelay: 0,
    })));

    const moveCard = (direction) => {
        if (cards.some(card => card.pile === 'center')) {
            let newCards = [...cards];
            for (let i = newCards.length - 1; i >= 0; i--) {
                if (newCards[i].pile === 'center') {
                    // Step 1: Change the card's pile to trigger the animation
                    newCards[i] = { ...newCards[i], pile: direction };

                    // Step 2: Set a timeout to rearrange the cards after the animation completes
                    setTimeout(() => {
                        let finalCards = [...newCards];
                        const movedCard = finalCards.splice(i, 1)[0]; // Remove the card
                        finalCards.push(movedCard); // Move it to the front (or end) after animation
                        setCards(finalCards); // Update the state after the animation
                    }, 300); // Adjust the timeout to match your animation duration
                    break;
                }
            }
            setCards(newCards);
        } else {
            shuffleBackToCenter();
        }
    };



    const shuffleBackToCenter = () => {
        // Separate cards into left and right piles
        const leftCards = cards.filter(card => card.pile === 'left');
        const rightCards = cards.filter(card => card.pile === 'right');

        // Alternate cards from left and right piles
        const shuffledOrder = [];
        const maxLength = Math.max(leftCards.length, rightCards.length);
        for (let i = 0; i < maxLength; i++) {
            if (leftCards[i]) shuffledOrder.push(leftCards[i]);
            if (rightCards[i]) shuffledOrder.push(rightCards[i]);
        }

        // Update cards with shuffle properties
        const newCards = cards.map(card => {
            const index = shuffledOrder.indexOf(card);
            if (index !== -1) {
                return {
                    ...card,
                    isShuffling: true,
                    animationDelay: index * 0.1,  // Stagger animation by 0.1s intervals
                };
            }
            return card;
        });
        setCards(newCards);

        // Reset cards to center after animations complete
        const totalDuration = (shuffledOrder.length - 1) * 0.1 + 0.5; // Total animation time
        setTimeout(() => {
            const resetCards = cards.map(card => ({
                ...card,
                pile: 'center',
                isShuffling: false,
                animationDelay: 0,
            }));
            setCards(resetCards);
        }, totalDuration * 1000); // Convert to milliseconds
    };

    const handlePolaroidClick = (algorithmName) => {
        switch (algorithmName) {
            case 'Binary Search':
                scrollToBinarySearch();
                break;
            case 'Breadth First Search':
                scrollToBreadthFirstSearch();
                break;
            case 'Depth First Search':
                scrollToDepthFirstSearch();
                break;
            case 'Jump Search':
                scrollToJumpSearch();
                break;
            case 'Linear Search':
                scrollToLinearSearch();
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

            <button className="carousel-button right" onClick={() => moveCard('right')}>
            </button>
        </div>
    );
}

export default SearhcingAlgs;
