// HeapSort.js

import React, { useState, useEffect } from 'react';
import './HeapSort.css';

function HeapSort() {
    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(10);  // Slider to control array size
    const [sortingSpeed, setSortingSpeed] = useState(300);  // Slider to control sorting speed
    const [sorting, setSorting] = useState(false);
    const [sortedIndex, setSortedIndex] = useState(-1);

    useEffect(() => {
        resetArray();
    }, [arraySize]);

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(Math.floor(Math.random() * 100) + 1);
        }
        setArray(newArray);
        setSortedIndex(-1);
    };

    const heapSort = async () => {
        let arr = [...array];
        setSorting(true);

        // Build the heap
        for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
            await heapify(arr, arr.length, i);
        }

        // Extract elements from heap one by one
        for (let i = arr.length - 1; i > 0; i--) {
            // Move current root to end
            [arr[0], arr[i]] = [arr[i], arr[0]];
            setArray([...arr]);
            setSortedIndex(i);
            await sleep(sortingSpeed);

            // Heapify the reduced heap
            await heapify(arr, i, 0);
        }

        setArray([...arr]);
        setSorting(false);
    };

    const heapify = async (arr, n, i) => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
            setArray([...arr]);
            await sleep(sortingSpeed);
            await heapify(arr, n, largest);
        }
    };

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    return (
        <div className="heapSort-screen">
            <h1>Heap Sort Visualizer</h1>
            <div className="array-container">
                {array.map((value, index) => (
                    <div
                        key={index}
                        className={`array-bar ${index <= sortedIndex ? 'sorted' : ''}`}
                        style={{ height: `${value * 3}px` }}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <div className="controls">
                <div className="slider-container">
                    <label>Array Size: {arraySize}</label>
                    <input
                        type="range"
                        min="5"
                        max="50"
                        value={arraySize}
                        onChange={(e) => setArraySize(Number(e.target.value))}
                        disabled={sorting}
                    />
                </div>
                <div className="slider-container">
                    <label>Speed: {sortingSpeed} ms</label>
                    <input
                        type="range"
                        min="50"
                        max="1000"
                        value={sortingSpeed}
                        onChange={(e) => setSortingSpeed(Number(e.target.value))}
                        disabled={sorting}
                    />
                </div>
            </div>
            <div className="buttons">
                <button onClick={resetArray} disabled={sorting}>Reset Array</button>
                <button onClick={heapSort} disabled={sorting}>Start Sorting</button>
            </div>
        </div>
    );
}

export default HeapSort;