import React, { useEffect, useRef } from 'react';
import './App.css';
import Home from './Home';
import StickyHeaders from "./StickyHeaders";
import MenuScreen from "./MenuScreen";
import SortingAlgs from "./SortingAlgs";
import SearchingAlgs from "./SearchingAlgs";
import OtherAlgs from "./OtherAlgs";
import BubbleSort from "./BubbleSort";
import InsertionSort from "./InsertionSort";
import MergeSort from "./MergeSort";
import QuickSort from "./QuickSort";
import HeapSort from "./HeapSort";

function App() {
    // Create refs for sections
    const sortingAlgsRef = useRef(null);
    const searchingAlgsRef = useRef(null);
    const otherAlgsRef = useRef(null);

    // Create refs for sorting algorithm components
    const bubbleSortRef = useRef(null);
    const insertionSortRef = useRef(null);
    const mergeSortRef = useRef(null);
    const quickSortRef = useRef(null);
    const heapSortRef = useRef(null);

    // Function to scroll to sections
    const scrollToSortingAlgs = () => {
        if (sortingAlgsRef.current) {
            sortingAlgsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToSearchingAlgs = () => {
        if (searchingAlgsRef.current) {
            searchingAlgsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToOtherAlgs = () => {
        if (otherAlgsRef.current) {
            otherAlgsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Functions to scroll to sorting algorithm components
    const scrollToBubbleSort = () => {
        if (bubbleSortRef.current) {
            bubbleSortRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToInsertionSort = () => {
        if (insertionSortRef.current) {
            insertionSortRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToMergeSort = () => {
        if (mergeSortRef.current) {
            mergeSortRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToQuickSort = () => {
        if (quickSortRef.current) {
            quickSortRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToHeapSort = () => {
        if (heapSortRef.current) {
            heapSortRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const appContainer = document.querySelector('.app-container');
            appContainer.style.backgroundPosition = `0% ${scrollPosition / 2}%`;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const dividers = Array.from({ length: 10 }, (_, index) => (
        <div key={index} className="divider" style={{ top: `${index * 100}vh` }}></div>
    ));

    return (
        <div className="app-container">
            <StickyHeaders />
            <Home />
            <MenuScreen
                scrollToSortingAlgs={scrollToSortingAlgs}
                scrollToSearchingAlgs={scrollToSearchingAlgs}
                scrollToOtherAlgs={scrollToOtherAlgs}
            />
            <div ref={sortingAlgsRef}>
                <SortingAlgs
                    scrollToBubbleSort={scrollToBubbleSort}
                    scrollToInsertionSort={scrollToInsertionSort}
                    scrollToMergeSort={scrollToMergeSort}
                    scrollToQuickSort={scrollToQuickSort}
                    scrollToHeapSort={scrollToHeapSort}
                />
            </div>
            <div ref={searchingAlgsRef}>
                <SearchingAlgs />
            </div>
            <div ref={otherAlgsRef}>
                <OtherAlgs />
            </div>
            <div ref={insertionSortRef}>
                <InsertionSort />
            </div>
            <div ref={heapSortRef}>
                <HeapSort />
            </div>
            <div ref={quickSortRef}>
                <QuickSort />
            </div>
            <div ref={mergeSortRef}>
                <MergeSort />
            </div>
            <div ref={bubbleSortRef}>
                <BubbleSort />
            </div>
            {dividers}
        </div>
    );
}

export default App;
