<script lang=ts>
  const routes = import.meta.glob('/src/routes/**/**.svelte')
  const routeArr: string[] = []

  for(const route in routes)
    routeArr.push(
      route
        .replace(/^\/src\/routes\//, '')
        .replace(/(\/*index)*.svelte$/, ''))

  routeArr.sort()
</script>

<header>
  {#each routeArr as route}
    <p><a href={'/' + route}>{route ? route.toUpperCase() : 'HOME'}</a></p>
  {/each}
</header>

<style>
  header {
    position: absolute;
    background: #0008;
  }

  p { padding: 16px; }

  a { color: #fff; }
</style>