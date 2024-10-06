// Utility function to create a range array
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

function generateSudoku() {
    const d = range(1, 9, 1);
    
    // Create initial random 3x3 matrix
    const y1 = shuffleArray(d).reduce((acc, curr, idx) => {
        acc[Math.floor(idx / 3)][idx % 3] = curr;
        return acc;
    }, Array(3).fill().map(() => Array(3).fill(0)));

    // Define row permutations
    const rowPerm1 = [2, 0, 1];
    const rowPerm2 = [1, 2, 0];

    // Generate y2 and y3 by row permutations of y1
    const y2 = rowPerm1.map(i => y1[i]);
    const y3 = rowPerm2.map(i => y1[i]);

    // Generate y4 by column rotation of y1
    const y4 = y1.map(row => [...row.slice(-1), ...row.slice(0, -1)]);

    // Generate y5 and y6 by row permutations of y4
    const y5 = rowPerm1.map(i => y4[i]);
    const y6 = rowPerm2.map(i => y4[i]);

    // Generate y7 by column rotation of y4
    const y7 = y4.map(row => [...row.slice(-1), ...row.slice(0, -1)]);

    // Generate y8 and y9 by row permutations of y7
    const y8 = rowPerm1.map(i => y7[i]);
    const y9 = rowPerm2.map(i => y7[i]);

    // Combine all matrices
    const m = [
        ...combineRows(y1, y2, y3),
        ...combineRows(y4, y5, y6),
        ...combineRows(y7, y8, y9)
    ];

    return m;
}

function createPuzzle(solution, numToRemove = 40) {
    const puzzle = solution.map(row => [...row]);
    const indices = shuffleArray(range(0, 80, 1));
    
    for (let i = 0; i < numToRemove; i++) {
        const idx = indices[i];
        puzzle[Math.floor(idx / 9)][idx % 9] = 0;
    }
    
    return puzzle;
}

// Helper functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function combineRows(...matrices) {
    return matrices[0].map((_, rowIndex) => 
        matrices.reduce((acc, matrix) => [...acc, ...matrix[rowIndex]], [])
    );
}

// Generate a new Sudoku puzzle
function newPuzzle() {
    const solution = generateSudoku();
    const puzzle = createPuzzle(solution);
    return { puzzle, solution };
}

// ... [Keep all the existing code from sudoku-generator-js.js] ...

// Add the following code at the end of the file:

document.addEventListener('DOMContentLoaded', () => {
    const gridElement = document.getElementById('sudoku-grid');
    const newPuzzleButton = document.getElementById('new-puzzle');
    const solvePuzzleButton = document.getElementById('solve-puzzle');
    
    let currentPuzzle, currentSolution;

    function displayPuzzle(puzzle) {
        gridElement.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (puzzle[i][j] !== 0) {
                    cell.textContent = puzzle[i][j];
                } else {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.dataset.row = i;
                    input.dataset.col = j;
                    cell.appendChild(input);
                }
                gridElement.appendChild(cell);
            }
        }
    }

    function generateNewPuzzle() {
        console.log('Generating new puzzle...'); // Debug log
        const { puzzle, solution } = newPuzzle();
        currentPuzzle = puzzle;
        currentSolution = solution;
        displayPuzzle(currentPuzzle);
    }

    function solvePuzzle() {
        displayPuzzle(currentSolution);
    }

    newPuzzleButton.addEventListener('click', generateNewPuzzle);
    solvePuzzleButton.addEventListener('click', solvePuzzle);

    // Initialize with a new puzzle
    generateNewPuzzle();
});