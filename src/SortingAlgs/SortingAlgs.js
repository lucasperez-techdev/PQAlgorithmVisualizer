import React, { useState } from 'react';
import './SortingAlgs.css';

const algorithms = [
    { name: "Bubble Sort", description: "Repeatedly compares and swaps adjacent elements until the list is sorted." },
    { name: "Merge Sort", description: "Recursively splits the list, sorts each part, and merges them back together." },
    { name: "Quick Sort", description: "Selects a pivot, partitions the list, and sorts the partitions recursively." },
    { name: "Heap Sort", description: "Builds a heap, repeatedly extracts the max/min, and rebuilds until sorted." },
    { name: "Insertion Sort", description: "Inserts each element into its correct position in the sorted portion of the list." },
];

function SortingAlgs(props) {
    const {
        scrollToBubbleSort,
        scrollToInsertionSort,
        scrollToMergeSort,
        scrollToQuickSort,
        scrollToHeapSort,
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
            case 'Bubble Sort':
                scrollToBubbleSort();
                break;
            case 'Insertion Sort':
                scrollToInsertionSort();
                break;
            case 'Merge Sort':
                scrollToMergeSort();
                break;
            case 'Quick Sort':
                scrollToQuickSort();
                break;
            case 'Heap Sort':
                scrollToHeapSort();
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

export default SortingAlgs;
