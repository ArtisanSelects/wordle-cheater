<script>
	import InputRow from './components/InputRow.svelte';
	import Results from './components/Results.svelte';
	import SocialContainer from './components/SocialContainer.svelte';
	import ErrorContainer from './components/ErrorContainer.svelte';
	import { activeTile, tileStates, results } from './store';
	import { formatTileID, handleError, wordFilter } from './helpers';

	$: $activeTile, changeFocus();
	
	let showResults = false;

	function changeFocus() {
		const toFocus = document.querySelector(`#${$activeTile}`);
		if (toFocus) {
			toFocus.focus();
		}
	}

	function validateInput() {
		handleError("", null, null, false);
		const tilesByState = {1: [], 2: [], 3: []};
		for (var row = 0; row < 6; row++) {
			let letters = 0;
			let empties = 0;
			for (var col = 0; col < 5; col++) {
				const tile = $tileStates[formatTileID(row, col)];
				const value = tile.value;
				if (value === "") {
					if (letters > 0) {
						handleError("You can't have any partially-filled rows.", row, null);
						return false;
					}
					empties++;
				} else {
					if (empties > 0) {
						handleError("You can't have any partially-filled rows.", row, null);
						return false;
					}
					letters++;
					tilesByState[tile.state].push({...tile, row, col});
				}
			}
		}
		if (tilesByState[1].length + tilesByState[2].length + tilesByState[3].length === 0) {
			handleError("Please fill out the board.", null, null);
			return false;
		}
		const boardState = {hasCorrect: {0: "", 1: "", 2: "", 3: "", 4: "", 5: "", all: new Set()},
							hasPresent: {0: new Set(), 1: new Set(), 2: new Set(), 3: new Set(), 4: new Set(), 5: new Set(), all: new Set()},
							hasAbsent: new Set()};
		for (let tile of tilesByState[3]) {
			if (boardState.hasCorrect[tile.col] !== "" && boardState.hasCorrect[tile.col] != tile.value) {
				handleError("You can't have two different 'correct' letters in the same column.", null, tile.col);
				return false;
			}
			boardState.hasCorrect[tile.col] = tile.value;
			boardState.hasCorrect.all.add(tile.value);
		}
		for (let tile of tilesByState[2]) {
			if (boardState.hasCorrect[tile.col] === tile.value) {
				handleError("You can't have the same letter appear as both 'Present' and 'Correct' in the same column.", null, tile.col);
				return false;
			}
			boardState.hasPresent[tile.col].add(tile.value);
			boardState.hasPresent.all.add(tile.value);
		}
		for (let tile of tilesByState[1]) {
			if (!boardState.hasCorrect.all.has(tile.value) && !boardState.hasPresent.all.has(tile.value)) {
				boardState.hasAbsent.add(tile.value);
			}
		}
		for (let val in boardState.hasCorrect) {
			if (val === 'all' || boardState.hasCorrect[val] === "") {
				delete boardState.hasCorrect[val];
			}
		}
		for (let val in boardState.hasPresent) {
			if (val === 'all' || boardState.hasPresent[val].size === 0) {
				delete boardState.hasPresent[val];
			}
		}
		solvePuzzle(boardState);
	}

	async function solvePuzzle(boardState) {
		try {
			const response = await fetch('words.json');
			let words = await response.json();
			words = Object.entries(words).filter(word => wordFilter(boardState, word[0], word[1]));
			$results = Object.values(words).map(word => word[0]);
			showResults = true;
		} catch (err) {
			handleError("Something went wrong.\nThe website may be offline, or there might be an issue with your internet connection.\nPlease try again later.", null, null);
		}
	}
</script>


<header>
	<h1 class="text-center display-4 fw-bold">Wordle Cheater &#129323;</h1>
</header>

<div class="mt-3">
	{#each {length: 6} as _, i}
		<div class="row">
			<InputRow rowID={i} />
		</div>
	{/each}	
</div>

<ErrorContainer />

<div class="row">
	<button class="mt-4 w-25 mx-auto btn-submit btn-generic" on:click={validateInput}>Submit</button>
</div>

<Results {showResults} />

<SocialContainer />


<style>
	.btn-submit {
		background-color: var(--col-light);
		color: var(--col-black);
		border: 0;
		outline: none;
		padding: 8px;
		font-weight: bold;
		font-size: 20px;
		box-shadow: 2px 2px 4px black;
	}
</style>