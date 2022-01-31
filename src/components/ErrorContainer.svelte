<script>
    import { errorMsg } from '../store';
    import { handleError } from '../helpers';
</script>


{#if $errorMsg}
	<div class="row mt-4">
		<div class="text-center text-danger error-container">
            <button on:click={() => handleError("", null, null)} class="btn-generic close">X</button>
			<pre class="error-msg mb-0">
				{$errorMsg}
			</pre>
		</div>
	</div>
{/if}


<style>
    .error-container {
        width: 100%;
        max-width: 576px;
        border: 2px solid var(--bs-danger);
        margin: 0px auto;
        position: relative;
        padding: 12px 0px;
    }

    .error-msg {
		white-space: pre-wrap;
        width: 95%;
        margin: 0 auto;
	}

    .close {
        position: absolute;
        top: -1%;
        left: 1%;
        background-color: transparent;
        border: 0;
        color: var(--bs-danger);
        margin: 0;
        padding: 0;
        font-weight: bold;
    }
</style>