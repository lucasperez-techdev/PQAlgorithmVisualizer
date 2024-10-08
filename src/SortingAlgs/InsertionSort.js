import React, { useState, useEffect } from 'react';
import './InsertionSort.css';

function InsertionSort() {
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

    const insertionSort = async () => {
        let arr = [...array];
        setSorting(true);

        // Compute the final sorted array values
        const finalSortedValues = arr.map((e) => e.value).slice().sort((a, b) => a - b);

        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            key.isKey = true;
            setArray([...arr]);
            await sleep(sortingSpeed);

            let j = i - 1;

            // Shift elements that are greater than the key
            while (j >= 0 && arr[j].value > key.value) {
                arr[j + 1] = arr[j];
                arr[j].isShifted = true;
                setArray([...arr]);
                await sleep(sortingSpeed);
                j = j - 1;
            }

            // Place the key in its correct position
            arr[j + 1] = key;
            setArray([...arr]);
            await sleep(sortingSpeed);

            // Reset flags
            key.isKey = false;
            arr.forEach((element) => {
                element.isShifted = false;
            });

            // Update sorted elements
            for (let k = 0; k <= i; k++) {
                if (arr[k].value === finalSortedValues[k]) {
                    arr[k].isSorted = true;
                } else {
                    arr[k].isSorted = false;
                }
            }
            setArray([...arr]);
            await sleep(sortingSpeed);
        }

        // After sorting, mark all elements as sorted
        arr.forEach((element) => {
            element.isSorted = true;
        });
        setArray([...arr]);
        setSorting(false);
    };

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    return (
        <div className="insertionSort-screen">
            <h1>Insertion Sort Visualizer</h1>
            <div className="array-container">
                {array.map((element, index) => (
                    <div
                        key={index}
                        className={`array-bar ${
                            element.isSorted
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
                <button onClick={insertionSort} disabled={sorting}>
                    Start Sorting
                </button>
            </div>
        </div>
    );
}

export default InsertionSort;