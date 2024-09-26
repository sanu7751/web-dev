// Add animations for when a cell is clicked (player makes a move)
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        // Add a pop effect when a player makes a move
        cell.classList.add('pop-animation');
        setTimeout(() => {
            cell.classList.remove('pop-animation');
        }, 500);
    });
});

// Celebrate the winner with a "highlight" animation on the board
function celebrateWinner(winningCells) {
    winningCells.forEach(index => {
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.classList.add('winner-animation');
    });
}

// Add hover effects on cells
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('mouseenter', () => {
        cell.classList.add('hover-animation');
    });
    cell.addEventListener('mouseleave', () => {
        cell.classList.remove('hover-animation');
    });
});
