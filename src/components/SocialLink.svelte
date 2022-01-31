<script>
    export let href;
    export let src;
    export let alt;
</script>


<a {href} target="_blank" rel="noopener noreferrer">
    <img class="social-link btn-generic mx-2" {src} {alt}>
</a>


<style>
    .social-link {
		width: 32px;
		height: 32px;
		filter: invert(100%);
	}
</style>