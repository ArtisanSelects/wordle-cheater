import { results, highlightRow, highlightColumn, errorMsg } from './store';

export function formatTileID(row, col) {
    return `R${row}T${col}`;
}

export function generateTileID(row, col) {
    if (col < 0) {
        if (row === 0) {
            return formatTileID(0, 0);
        }
        return formatTileID(row-1, 4);
    } else if (col > 4) {
        if (row === 5) {
            return formatTileID(5,4);
        }
        return formatTileID(row+1, 0);
    }
    return formatTileID(row, col);
}

export function getState(state) {
    switch (state) {
        case 0:
            return 'empty';

        case 1:
            return 'absent';

        case 2:
            return 'present';

        case 3:
            return 'correct';

        default:
            return 'empty';
    }
}

export function handleError(msg, badRow, badCol, resetResults=true) {
    if (resetResults) {
        results.update(res => []);
    }
    highlightRow.update(row => badRow);
    highlightColumn.update(col => badCol);
    errorMsg.update(old => msg);
}

export function wordFilter(boardState, word, letters) {
    for (let [col, letter] of Object.entries(boardState.hasCorrect)) {
        if (letters[col] !== letter) {
            return false;
        }
    }
    for (let [k, letterSet] of Object.entries(boardState.hasPresent)) {
        const col = +k;
        for (let letter of letterSet) {
            const index = word.indexOf(letter);
            if (index === -1 || index === col) {
                return false;
            }
        }
    }
    for (let letter of boardState.hasAbsent) {
        if (word.indexOf(letter) !== -1) {
            return false;
        }
    }
    return true;
}