# PageWatch Netlify Build Plugin

This Build Plugin automatically tests each Netlify deployment with PageWatch.

You need a [PageWatch](https://pagewatch.dev) account to use this plugin.

## Setup

1. Install the plugin using `yarn`:

```yarn add netlify-plugin-pagewatch```

2. Update your `netlify.toml` plugins section to reference the plugin:

```
[[plugins]]
  package = "netlify-plugin-pagewatch"
```

3. Grab your [PageWatch Api Key](https://docs.pagewatch.dev/guide/api.html) and store it as the `PAGEWATCH_SITE_KEY` environment variable in your [Netlify build settings](https://docs.netlify.com/configure-builds/environment-variables/).

![Netlify environment variable setup](https://docs.pagewatch.dev/assets/img/netlify-env-variables.png)

For detailed instructions see [our guide](https://docs.pagewatch.dev/guide/netlify.html).

## GitHub integration

You can run PageWatch as part of your continuous integration process.
![](https://docs.pagewatch.dev/assets/img/github-checks.png)

See the [PageWatch GitHub integration](https://docs.pagewatch.dev/guide/github.html) for instructions.
