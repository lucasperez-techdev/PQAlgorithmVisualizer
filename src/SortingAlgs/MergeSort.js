// Updated MergeSort.js

import React, { useState, useEffect } from 'react';
import './MergeSort.css';

function MergeSort() {
    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(20);
    const [sortingSpeed, setSortingSpeed] = useState(300);
    const [sorting, setSorting] = useState(false);
    const [currentBranches, setCurrentBranches] = useState([]);

    useEffect(() => {
        resetArray();
    }, [arraySize]);

    // Function to generate a new random array
    const resetArray = () => {
        if (sorting) return; // Prevent resetting during sort
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            const value = Math.floor(Math.random() * 100) + 1;
            newArray.push({
                value: value,
                isComparing: false,
                isMerged: false,
                isBranch: false,
            });
        }
        setArray(newArray);
        setCurrentBranches([]);
    };

    // Merge Sort Algorithm with visualization
    const mergeSort = async () => {
        setSorting(true);
        const auxiliaryArray = array.map(item => ({ ...item }));
        await mergeSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1);
        setSorting(false);
    };

    const mergeSortHelper = async (auxArray, start, end) => {
        if (start >= end) return;

        const mid = Math.floor((start + end) / 2);

        // Highlight the current split
        await highlightSplit(start, mid, end);

        await mergeSortHelper(auxArray, start, mid);
        await mergeSortHelper(auxArray, mid + 1, end);
        await merge(auxArray, start, mid, end);
    };

    const merge = async (auxArray, start, mid, end) => {
        let i = start;
        let j = mid + 1;
        const temp = [];

        while (i <= mid && j <= end) {
            // Highlight the bars being compared
            await highlightComparing(i, j);
            if (auxArray[i].value <= auxArray[j].value) {
                temp.push(auxArray[i]);
                i++;
            } else {
                temp.push(auxArray[j]);
                j++;
            }
        }

        while (i <= mid) {
            temp.push(auxArray[i]);
            i++;
        }

        while (j <= end) {
            temp.push(auxArray[j]);
            j++;
        }

        // Animate the merge by updating the array with merged values
        for (let k = start; k <= end; k++) {
            auxArray[k] = temp[k - start];
            await overwriteBar(k, auxArray[k].value);
        }
    };

    // Function to highlight the current split
    const highlightSplit = (start, mid, end) => {
        return new Promise(resolve => {
            setCurrentBranches([{ start, mid }, { mid: mid + 1, end }]);
            setArray(prevArray => {
                const newArray = prevArray.map((item, idx) => {
                    if ((idx >= start && idx <= mid) || (idx >= mid + 1 && idx <= end)) {
                        return { ...item, isBranch: true };
                    }
                    return { ...item, isBranch: false };
                });
                return newArray;
            });
            setTimeout(() => {
                setCurrentBranches([]);
                setArray(prevArray => {
                    const newArray = prevArray.map(item => ({
                        ...item,
                        isBranch: false,
                    }));
                    return newArray;
                });
                resolve();
            }, sortingSpeed);
        });
    };

    // Function to highlight bars being compared
    const highlightComparing = (index1, index2) => {
        return new Promise(resolve => {
            setArray(prevArray => {
                const newArray = prevArray.map((item, idx) => {
                    if (idx === index1 || idx === index2) {
                        return { ...item, isComparing: true };
                    }
                    return { ...item, isComparing: false };
                });
                return newArray;
            });
            setTimeout(() => {
                setArray(prevArray => {
                    const newArray = prevArray.map(item => ({
                        ...item,
                        isComparing: false,
                    }));
                    return newArray;
                });
                resolve();
            }, sortingSpeed);
        });
    };

    // Function to overwrite a bar's value during merge
    const overwriteBar = (index, newValue) => {
        return new Promise(resolve => {
            setArray(prevArray => {
                const newArray = prevArray.map((item, idx) => {
                    if (idx === index) {
                        return { ...item, value: newValue, isMerged: true };
                    }
                    return { ...item };
                });
                return newArray;
            });
            setTimeout(() => {
                setArray(prevArray => {
                    const newArray = prevArray.map(item => ({
                        ...item,
                        isMerged: false,
                    }));
                    return newArray;
                });
                resolve();
            }, sortingSpeed);
        });
    };

    return (
        <div className="mergeSort-screen">
            <h1>Merge Sort Visualizer</h1>
            <div className="array-container">
                {array.map((element, index) => (
                    <div
                        key={index}
                        className={`array-bar ${
                            element.isComparing
                                ? 'comparing'
                                : element.isMerged
                                    ? 'merged'
                                    : element.isBranch
                                        ? 'branch'
                                        : 'default'
                        }`}
                        style={{ height: `${element.value * 3}px` }}
                        data-value={element.value}
                    >
                        {/* Optional: Display value */}
                        {/* <span className="bar-value">{element.value}</span> */}
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
                <button onClick={mergeSort} disabled={sorting}>
                    Start Merge Sort
                </button>
            </div>
        </div>
    );
}

export default MergeSort;