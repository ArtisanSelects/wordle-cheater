<script>
    import { results } from '../store';
    export let showResults;

    $: resultTitle = `${$results.length} Result${$results.length !== 1 ? 's' : ''}`
</script>


<div class="row mb-5">
    <div class="col-sm-12 col-lg-8 results-container mt-4">
        {#if showResults}
            <h3 class="mt-3 border-bottom">{resultTitle}</h3>
            <div class="results-list">
                {#each $results as result}
                    <div class="result">
                        {result}
                    </div>
                {/each}
            </div>
        {:else}
            <div class="my-3 text-center">
                <h1 class="display-6 fw-bold">How to Use</h1>
                <ol class="list-group list-group-numbered">
                    <li class="list-group-item bg-transparent border-0 instructions">Enter your guesses from your Wordle board.</li>
                    <li class="list-group-item bg-transparent border-0 instructions">Use the button beneath each tile to toggle its color.</li>
                    <li class="list-group-item bg-transparent border-0 instructions">Press the submit button to find all of the possible solutions.</li>
                </ol>
            </div>
        {/if}
    </div>
</div>


<style>
    .instructions {
        color: var(--col-light) !important;
    }

    .results-container {
        color: var(--col-light);
        border: 5px solid var(--col-light);
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        height: fit-content;
        max-height: 480px;
        align-items: center;
        margin: 0 auto;
    }

    .results-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin: 1rem 0px;
    }

    .result {
        text-align: center;
        line-height: 2rem;
        flex: 0 0 25%;
    }
</style>