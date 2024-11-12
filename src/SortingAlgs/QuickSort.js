// QuickSort.js

import React, { useState, useEffect } from 'react';
import './QuickSort.css';

function QuickSortVisualizer() {
    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(20);
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
                isPivot: false,
                isComparing: false,
                isSwapping: false,
                isSorted: false
            });
        }
        setArray(newArray);
    };

    const quickSort = async () => {
        setSorting(true);
        await quickSortHelper(array, 0, array.length - 1);
        // After sorting, mark all elements as sorted
        const sortedArray = array.map(element => ({ ...element, isSorted: true }));
        setArray(sortedArray);
        setSorting(false);
    };

    const quickSortHelper = async (arr, low, high) => {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSortHelper(arr, low, pi - 1);
            await quickSortHelper(arr, pi + 1, high);
        }
    };

    const partition = async (arr, low, high) => {
        let pivot = arr[high];
        pivot.isPivot = true;
        setArray([...arr]);
        await sleep(sortingSpeed);

        let i = low - 1;

        for (let j = low; j < high; j++) {
            arr[j].isComparing = true;
            setArray([...arr]);
            await sleep(sortingSpeed);

            if (arr[j].value < pivot.value) {
                i++;
                // Swap arr[i] and arr[j]
                await swap(arr, i, j);
            }

            arr[j].isComparing = false;
            setArray([...arr]);
            await sleep(sortingSpeed);
        }

        // Swap arr[i + 1] and arr[high] (pivot)
        await swap(arr, i + 1, high);
        pivot.isPivot = false;
        arr[i + 1].isSorted = true;
        setArray([...arr]);
        await sleep(sortingSpeed);

        return i + 1;
    };

    const swap = async (arr, i, j) => {
        arr[i].isSwapping = true;
        arr[j].isSwapping = true;
        setArray([...arr]);
        await sleep(sortingSpeed);

        // Perform the swap
        let temp = arr[i].value;
        arr[i].value = arr[j].value;
        arr[j].value = temp;

        arr[i].isSwapping = false;
        arr[j].isSwapping = false;
        setArray([...arr]);
        await sleep(sortingSpeed);
    };

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    return (
        <div className="quickSort-screen">
            <h1>Quick Sort Visualizer</h1>
            <div className="array-container">
                {array.map((element, index) => (
                    <div
                        key={index}
                        className={`array-bar ${
                            element.isSorted
                                ? 'sorted'
                                : element.isPivot
                                    ? 'pivot'
                                    : element.isSwapping
                                        ? 'swapping'
                                        : element.isComparing
                                            ? 'comparing'
                                            : ''
                        }`}
                        style={{ height: `${element.value * 3}px` }}
                    >
                        {/* Optionally display value */}
                        {/* {element.value} */}
                    </div>
                ))}
            </div>
            <div className="controls">
                <div className="slider-container">
                    <label>Array Size: {arraySize}</label>
                    <input
                        type="range"
                        min="5"
                        max="100"
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
                <button onClick={quickSort} disabled={sorting}>
                    Start Quick Sort
                </button>
            </div>
        </div>
    );
}

export default QuickSortVisualizer;