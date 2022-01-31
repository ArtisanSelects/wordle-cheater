<script>
    import InputTile from './InputTile.svelte';
    export let rowID;
</script>


<div class="col">
    <div class="input-row">
        <div class="row">
            {#each {length: 5} as _, i}
                <InputTile rowID={rowID} letterID={i} />
            {/each}
        </div>
    </div>
</div>


<style>
    .input-row {
        width: 100%;
        max-width: 576px;
        margin: 2.5px auto;
        display: flex;
        justify-content: center;
    }
</style>