import React, { useState, useEffect } from 'react';
import './InsertionSort.css';

function InsertionSort() {
    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(10);  // Slider to control array size
    const [sortingSpeed, setSortingSpeed] = useState(300);  // Slider to control sorting speed
    const [sorting, setSorting] = useState(false);
    const [sortedIndex, setSortedIndex] = useState(-1);

    useEffect(() => {
        resetArray();
    }, [arraySize]);  // Reset array whenever the size slider changes

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(Math.floor(Math.random() * 100) + 1);
        }
        setArray(newArray);
        setSortedIndex(-1);
    };

    const insertionSort = async () => {
        let arr = [...array];
        setSorting(true);
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
                setArray([...arr]);
                setSortedIndex(i);
                await sleep(sortingSpeed); // Adjust speed dynamically
            }
            arr[j + 1] = key;
            setArray([...arr]);
            setSortedIndex(i);
            await sleep(sortingSpeed);
        }
        setSorting(false);
    };

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    return (
        <div className="insertionSort-screen">
            <h1>Insertion Sort Visualizer</h1>
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
                <button onClick={insertionSort} disabled={sorting}>Start Sorting</button>
            </div>
        </div>
    );
}

export default InsertionSort;
