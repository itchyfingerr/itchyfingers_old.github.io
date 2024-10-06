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
