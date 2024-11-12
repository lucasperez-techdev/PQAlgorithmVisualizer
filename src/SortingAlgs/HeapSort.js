// HeapSort.js

import React, { useState, useEffect } from 'react';
import './HeapSort.css';

function HeapSort() {
    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(7);  // Slider to control array size (limit for visualization)
    const [sortingSpeed, setSortingSpeed] = useState(500);  // Slider to control sorting speed
    const [sorting, setSorting] = useState(false);
    const [sortedIndex, setSortedIndex] = useState(-1);
    const [currentIndices, setCurrentIndices] = useState([]);

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
        setCurrentIndices([]);
    };

    const heapSort = async () => {
        let arr = [...array];
        setSorting(true);
        setCurrentIndices([]);

        // Build the heap
        for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
            await heapify(arr, arr.length, i);
        }

        // Extract elements from heap one by one
        for (let i = arr.length - 1; i > 0; i--) {
            // Highlight the root and the last element
            setCurrentIndices([0, i]);
            await sleep(sortingSpeed);

            // Move current root to end
            [arr[0], arr[i]] = [arr[i], arr[0]];
            setArray([...arr]);
            setSortedIndex(i);
            await sleep(sortingSpeed);

            // Clear current indices
            setCurrentIndices([]);

            // Heapify the reduced heap
            await heapify(arr, i, 0);
        }

        setSortedIndex(0);
        setSorting(false);
    };

    const heapify = async (arr, n, i) => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        // Highlight nodes being compared
        setCurrentIndices([largest, left, right].filter(index => index < n));
        await sleep(sortingSpeed);

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            // Highlight the nodes to be swapped
            setCurrentIndices([i, largest]);
            await sleep(sortingSpeed);

            [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
            setArray([...arr]);
            await sleep(sortingSpeed);
            await heapify(arr, n, largest);
        }

        // Clear current indices after heapify
        setCurrentIndices([]);
    };

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    // Function to calculate the position of each node
    const calculatePositions = () => {
        const positions = [];
        const totalLevels = Math.ceil(Math.log2(arraySize + 1));
        const containerWidth = 800; // Width of the heap-container
        const containerHeight = 600; // Height of the heap-container
        const nodeRadius = 20; // Radius of each node
        const levelHeight = containerHeight / (totalLevels + 1);

        for (let i = 0; i < array.length; i++) {
            const level = Math.floor(Math.log2(i + 1));
            const levelIndex = i - Math.pow(2, level) + 1;
            const nodesInLevel = Math.pow(2, level);
            const horizontalGap = containerWidth / (nodesInLevel + 1);
            const x = horizontalGap * (levelIndex + 1);
            const y = levelHeight * (level + 1);
            positions.push({ x, y });
        }

        return positions;
    };

    const positions = calculatePositions();

    return (
        <div className="heapSort-screen">
            <h1>Heap Sort Visualizer</h1>
            <div className="heap-container">
                <svg className="heap-svg" width="800" height="600">
                    {/* Draw connecting lines */}
                    {array.map((value, index) => {
                        const left = 2 * index + 1;
                        const right = 2 * index + 2;
                        const parentPos = positions[index];
                        let lines = [];

                        if (left < array.length) {
                            const childPos = positions[left];
                            lines.push(
                                <line
                                    key={`line-${index}-${left}`}
                                    x1={parentPos.x}
                                    y1={parentPos.y}
                                    x2={childPos.x}
                                    y2={childPos.y}
                                    stroke="#333"
                                />
                            );
                        }

                        if (right < array.length) {
                            const childPos = positions[right];
                            lines.push(
                                <line
                                    key={`line-${index}-${right}`}
                                    x1={parentPos.x}
                                    y1={parentPos.y}
                                    x2={childPos.x}
                                    y2={childPos.y}
                                    stroke="#333"
                                />
                            );
                        }

                        return lines;
                    })}
                </svg>
                {/* Render nodes */}
                {array.map((value, index) => {
                    const pos = positions[index];
                    const isSorted = index >= sortedIndex;
                    const isActive = currentIndices.includes(index);

                    return (
                        <div
                            key={index}
                            className={`heap-node ${isSorted ? 'sorted' : ''} ${isActive ? 'active' : ''}`}
                            style={{
                                left: `${pos.x - 20}px`, // Adjust for node radius
                                top: `${pos.y - 20}px`,  // Adjust for node radius
                                width: '40px',
                                height: '40px',
                                lineHeight: '40px',
                            }}
                        >
                            {value}
                        </div>
                    );
                })}
            </div>
            <div className="controls">
                <div className="slider-container">
                    <label>Array Size: {arraySize}</label>
                    <input
                        type="range"
                        min="3"
                        max="15"
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