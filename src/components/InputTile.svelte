<script>
    import { afterUpdate } from 'svelte';
    import { generateTileID, getState } from '../helpers.js';
    import { activeTile, tileStates, highlightColumn, highlightRow } from '../store';

    export let rowID;
    export let letterID;

    $: tileID = `R${rowID}T${letterID}`;
    $: text = $tileStates[tileID].value;
    $: state = getState($tileStates[tileID].state);
    $: errorState = (letterID === $highlightColumn || rowID === $highlightRow) ? 'tile-error' : '';

    afterUpdate(() => {
        if (text == '') {
            updateTileState(0);
        }
    });

    function focusForward() {
        if (tileID == 'R5T4') {
            return;
        }
        $activeTile = generateTileID(rowID, letterID+1);
    }

    function focusBackward() {
        if (tileID === 'R0T0') {
            return;
        }
        $activeTile = generateTileID(rowID, letterID-1);
    }

    function handleInput (e) {
        const char = (typeof e !== 'undefined') ? e.keyCode : e.which;

        if (char >= 65 && char <= 90) {
            $tileStates[tileID].value = String.fromCharCode(char);
            updateTileState(1);
            focusForward();
        } else if (char === 8) {
            $tileStates[tileID].value = "";
            updateTileState(0);
            focusBackward();
        } else if (char >= 37 && char <= 40) {
            const row = +$activeTile[1];
            const col = +$activeTile[3];
            switch (char) {
                case 37:
                    if (col === 0 && row === 0) {
                        $activeTile = generateTileID(5, 4);
                    } else {
                        $activeTile = generateTileID(rowID, letterID-1);
                    }
                    break;

                case 38:
                    if (row === 0) {
                        $activeTile = generateTileID(5, col);
                    } else {
                        $activeTile = generateTileID(row-1, col);
                    }
                    break;

                case 39:
                    if (col === 4 && row === 5) {
                        $activeTile = generateTileID(0, 0);
                    } else {
                        $activeTile = generateTileID(rowID, letterID+1);
                    }
                    break;

                case 40:
                    if (row === 5) {
                        $activeTile = generateTileID(0, col);
                    } else {
                        $activeTile = generateTileID(row+1, col);
                    }
                    break;

                default:
                    break;
            }
        }
    }

    function handleClick() {
        if (text !== "") {
            updateTileState(Math.max(($tileStates[tileID].state+1) % 4, 1));
        }
    }

    function updateTileState(newState) {
        $tileStates[tileID].state = newState;
    }
</script>


<div class="tile-container">
    <input type="text" class={`tile ${state} ${errorState}`} bind:value={text} on:keydown={handleInput} maxlength="1" name={tileID} id={tileID}>
    <button class='btn-tile' on:click={handleClick}>
        <div class={`knob ${state}`}></div>
    </button>
</div>


<style>
    .tile-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 5px;
        margin-right: 5px;
        padding: 0;
        width: 64px;
    }

    .tile-container:last-child {
        margin-right: 0px;
    }

    .tile {
        width: 100%;
        max-width: 62px;
        height: 3rem;
        max-height: 62px;
        border: 2px solid var(--col-gray);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        vertical-align: middle;
        box-sizing: border-box;
        color: var(--col-light);
        margin-bottom: 0.5rem;
        font-size: 2rem;
        text-transform: uppercase;
        text-align: center;
        user-select: none;
        caret-color: transparent;
    }

    .tile:active, .tile:focus {
        outline: none;
        border-color: var(--col-light-gray);
    }

    .tile-error {
        border-color: var(--bs-danger);
    }

    .btn-tile {
        width: 48px;
        height: 12px;
        padding: 0;
        position: relative;
        border: none;
        outline: none;
        box-shadow: 0 0 0 3px var(--col-gray);
        background-color: var(--col-light);
        border-radius: 999px !important;
        overflow: hidden;
        --webkit-appearance: none;
    }

    .btn-tile:focus {
        box-shadow: 0 0 0 3px var(--col-light-gray);
    }

    .knob {
        position: absolute;
        left: 6px;
        top: 1px;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: var(--col-gray);
    }

    .knob.present {
        background-color: var(--col-present);
        left: 19px;
    }

    .knob.correct {
        background-color: var(--col-correct);
        left: 32px;
    }
</style>