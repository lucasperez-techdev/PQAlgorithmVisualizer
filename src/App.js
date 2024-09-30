import React, { useEffect, useRef } from 'react';
import './App.css';
import Home from './Home';
import StickyHeaders from "./StickyHeaders";
import MenuScreen from "./MenuScreen";
import SortingAlgs from "./SortingAlgs/SortingAlgs";
import SearchingAlgs from "./SearchingAlgs/SearchingAlgs";
import OtherAlgs from "./OtherAlgs/OtherAlgs";

//Sorting Algorithms

import BubbleSort from "./SortingAlgs/BubbleSort";
import InsertionSort from "./SortingAlgs/InsertionSort";
import MergeSort from "./SortingAlgs/MergeSort";
import QuickSort from "./SortingAlgs/QuickSort";
import HeapSort from "./SortingAlgs/HeapSort";

//Searching Algorithms

import BinarySearch from "./SearchingAlgs/BinarySearch";
import BreadthFirstSearch from "./SearchingAlgs/BreadthFirstSearch";
import DepthFirstSearch from "./SearchingAlgs/DepthFirstSearch";
import JumpSearch from "./SearchingAlgs/JumpSearch";
import LinearSearch from "./SearchingAlgs/LinearSearch";

//Other Algorithms

import BellmanFordAlg from "./OtherAlgs/BellmanFordAlg";
import DjisktrasAlg from "./OtherAlgs/DjisktrasAlg";
import KnapsackAlg from "./OtherAlgs/KnapsackAlg";
import SlidingWindow from "./OtherAlgs/SlidingWindow";
import TwoPointer from "./OtherAlgs/TwoPointer";



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

    // Create refs for searching algorithm components

    const binarySearchRef = useRef(null);
    const breadthFirstSearchRef = useRef(null);
    const depthFirstSearchRef = useRef(null);
    const jumpSearchRef = useRef(null);
    const linearSearchRef = useRef(null);


    // Functions to scroll to searching algorithm components
    const scrollToBinarySearch = () => {
        if (binarySearchRef.current) {
            binarySearchRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToBreadthFirstSearch = () => {
        if (breadthFirstSearchRef.current) {
            breadthFirstSearchRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToDepthFirstSearch = () => {
        if (depthFirstSearchRef.current) {
            depthFirstSearchRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToJumpSearch = () => {
        if (jumpSearchRef.current) {
            jumpSearchRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToLinearSearch = () => {
        if (linearSearchRef.current) {
            linearSearchRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Create refs for other algorithm components

    const bellmanFordAlgRef = useRef(null);
    const djisktrasAlgRef = useRef(null);
    const knapsackAlgRef = useRef(null);
    const slidingWindowRef = useRef(null);
    const twoPointerRef = useRef(null);


    // Functions to scroll to searching algorithm components
    const scrollToBellmanFordAlg = () => {
        if (bellmanFordAlgRef.current) {
            bellmanFordAlgRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToDjisktrasAlg = () => {
        if (djisktrasAlgRef.current) {
            djisktrasAlgRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToKnapsackAlg = () => {
        if (knapsackAlgRef.current) {
            knapsackAlgRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToSlidingWindow = () => {
        if (slidingWindowRef.current) {
            slidingWindowRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToTwoPointer = () => {
        if (twoPointerRef.current) {
            twoPointerRef.current.scrollIntoView({ behavior: 'smooth' });
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

    const dividers = Array.from({ length: 20 }, (_, index) => (
        <div key={index} className="divider" style={{ top: `${index * 100}vh` }}></div>
    ));

    return (
        <div className="app-container">
            <StickyHeaders/>
            <Home/>
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
                <SearchingAlgs
                    scrollToBinarySearch={scrollToBinarySearch}
                    scrollToBreadthFirstSearch={scrollToBreadthFirstSearch}
                    scrollToDepthFirstSearch={scrollToDepthFirstSearch}
                    scrollToJumpSearch={scrollToJumpSearch}
                    scrollToLinearSearch={scrollToLinearSearch}
                />
            </div>
            <div ref={otherAlgsRef}>
                <OtherAlgs
                    scrollToBellmanFordAlg={scrollToBellmanFordAlg}
                    scrollToDjisktrasAlg={scrollToDjisktrasAlg}
                    scrollToKnapsackAlg={scrollToKnapsackAlg}
                    scrollToSlidingWindow={scrollToSlidingWindow}
                    scrollToTwoPointer={scrollToTwoPointer}
                />
            </div>
            <div ref={insertionSortRef}>
                <InsertionSort/>
            </div>
            <div ref={heapSortRef}>
                <HeapSort/>
            </div>
            <div ref={quickSortRef}>
                <QuickSort/>
            </div>
            <div ref={mergeSortRef}>
                <MergeSort/>
            </div>
            <div ref={bubbleSortRef}>
                <BubbleSort/>
            </div>
            <div ref={binarySearchRef}>
                <BinarySearch/>
            </div>
            <div ref={breadthFirstSearchRef}>
                <BreadthFirstSearch/>
            </div>
            <div ref={depthFirstSearchRef}>
                <DepthFirstSearch/>
            </div>
            <div ref={jumpSearchRef}>
                <JumpSearch/>
            </div>
            <div ref={linearSearchRef}>
                <LinearSearch/>
            </div>
            <div ref={bellmanFordAlgRef}>
                <BellmanFordAlg/>
            </div>
            <div ref={djisktrasAlgRef}>
                <DjisktrasAlg/>
            </div>
            <div ref={knapsackAlgRef}>
                <KnapsackAlg/>
            </div>
            <div ref={slidingWindowRef}>
                <SlidingWindow/>
            </div>
            <div ref={twoPointerRef}>
                <TwoPointer/>
            </div>
            {dividers}
        </div>
    );
}

export default App;
