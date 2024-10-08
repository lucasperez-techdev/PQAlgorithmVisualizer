import React, { useState, useEffect } from 'react';
import './HeapSort.css';

function HeapSort() {
    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(10);
    const [sortingSpeed, setSortingSpeed] = useState(300);
    const [sorting, setSorting] = useState(false);

    useEffect(() => {
        resetArray();
    }, [arraySize]);

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            const value = Math.floor(Math.random() * 100) + 1;
            newArray.push({
                value: value,
                isKey: false,
                isShifted: false,
                isSorted: false
            });
        }
        setArray(newArray);
    };

    const heapSort = async () => {
        let arr = [...array];
        setSorting(true);

        const finalSortedValues = arr.map((e) => e.value).slice().sort((a, b) => a - b);

        // Build the heap
        for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
            await heapify(arr, arr.length, i);
        }

        // Extract elements from heap one by one
        for (let i = arr.length - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            arr[i].isSorted = true; // Mark as sorted
            setArray([...arr]);
            await sleep(sortingSpeed);

            // Heapify the reduced heap
            await heapify(arr, i, 0);
        }
        arr[0].isSorted = true; // Mark the last element as sorted
        setArray([...arr]);
        setSorting(false);
    };

    const heapify = async (arr, n, i) => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        // Mark the current element as the key (being compared)
        arr[i].isKey = true;
        setArray([...arr]);
        await sleep(sortingSpeed);

        if (left < n && arr[left].value > arr[largest].value) {
            largest = left;
        }

        if (right < n && arr[right].value > arr[largest].value) {
            largest = right;
        }

        if (largest !== i) {
            // Swap and mark as shifted
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            arr[i].isShifted = true;
            arr[largest].isShifted = true;
            setArray([...arr]);
            await sleep(sortingSpeed);

            // Recursively heapify the affected subtree
            await heapify(arr, n, largest);
        }

        // Reset key flag
        arr[i].isKey = false;
        setArray([...arr]);
    };

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    return (
        <div className="heapSort-screen">
            <h1>Heap Sort Visualizer</h1>
            <div className="array-container">
                {array.map((element, index) => (
                    <div
                        key={index}
                        className={`array-bar ${element.isSorted
                                ? 'sorted'
                                : element.isKey
                                    ? 'key'
                                    : element.isShifted
                                        ? 'shifted'
                                        : ''
                            }`}
                        style={{ height: `${element.value * 3}px` }}
                    >
                        {element.value}
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
                <button onClick={resetArray} disabled={sorting}>
                    Reset Array
                </button>
                <button onClick={heapSort} disabled={sorting}>
                    Start Sorting
                </button>
            </div>
        </div>
    );
}

export default HeapSort;