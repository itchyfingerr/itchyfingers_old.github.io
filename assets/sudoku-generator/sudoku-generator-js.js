console.log("JavaScript is loaded");
// Sudoku functions (converted from Python)
function startMat() {
    const d = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    
    const y1 = Array(3).fill().map(() => shuffle(d).slice(0, 3));
    const y5 = Array(3).fill().map(() => shuffle(d).slice(0, 3));
    const y9 = Array(3).fill().map(() => shuffle(d).slice(0, 3));
    
    const emptyBlock = () => Array(3).fill().map(() => Array(3).fill(0));
    const y2 = emptyBlock(), y3 = emptyBlock(), y4 = emptyBlock(),
          y6 = emptyBlock(), y7 = emptyBlock(), y8 = emptyBlock();
    
    const s = [
        ...y1.map((row, i) => [...row, ...y2[i], ...y3[i]]),
        ...y4.map((row, i) => [...row, ...y5[i], ...y6[i]]),
        ...y7.map((row, i) => [...row, ...y8[i], ...y9[i]])
    ];
    
    return s;
}

function possible(y, x, n, s) {
    for (let i = 0; i < 9; i++) {
        if (s[y][i] === n || s[i][x] === n) return false;
    }
    const x0 = Math.floor(x / 3) * 3;
    const y0 = Math.floor(y / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (s[y0 + i][x0 + j] === n) return false;
        }
    }
    return true;
}

function solve(s) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (s[y][x] === 0) {
                for (let n = 1; n <= 9; n++) {
                    if (possible(y, x, n, s)) {
                        s[y][x] = n;
                        if (solve(s)) return true;
                        s[y][x] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function generatePuzzle() {
    const fullSolution = startMat();
    solve(fullSolution);
    
    const puzzle = fullSolution.map(row => [...row]);
    const cellsToRemove = 40; // Adjust this for difficulty
    
    for (let i = 0; i < cellsToRemove; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 9);
            y = Math.floor(Math.random() * 9);
        } while (puzzle[y][x] === 0);
        puzzle[y][x] = 0;
    }
    
    return { puzzle, solution: fullSolution };
}

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
        const { puzzle, solution } = generatePuzzle();
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