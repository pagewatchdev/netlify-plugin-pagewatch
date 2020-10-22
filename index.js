const { env } = require("process");
const fetch = require('node-fetch');

module.exports = {
  onSuccess: async ({ utils, constants }) => {
    // only run audit on production / pull requests
    if (env.CONTEXT !== 'production' && env.CONTEXT !== 'deploy-preview'){
      return
    }

    // this plugin needs a publicly accessible url to work
    if (constants.IS_LOCAL){
      return
    }

    if (!env.PAGEWATCH_SITE_KEY) {
      return utils.build.failPlugin(
        "Please add PAGEWATCH_SITE_KEY to your environment. See: https://docs.pagewatch.dev/guide/netlify.html"
      );
    }

    try {
      const response = await fetch(
        'https://api.pagewatch.dev/v1/site/audit',
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${env.PAGEWATCH_SITE_KEY}`,
            Accept: "application/json"
          },
          body: JSON.stringify({
            commit_hash: env.COMMIT_REF,
            pull_request: env.PULL_REQUEST === 'true' || env.PULL_REQUEST === true,  // this is set a string, eg "'false'"
            repo_url: env.REPOSITORY_URL,
            context: env.CONTEXT,
            branch: env.BRANCH,
            trigger: 'netlify',
            url: env.URL,
            base_url: env.DEPLOY_URL
          })
        }
      );

      if (response.status === 403) {
        return utils.build.failPlugin(
          "Your PAGEWATCH_SITE_KEY is not valid, please generate a new key at https://app.pagewatch.dev/admin/admin/api"
        );
      }
      else if (response.status !== 200) {
        const data = await response.json();
        return utils.build.failPlugin(
          "PageWatch audit could not be started. Reason: " + data.error
        );
      } else {
        const data = await response.json();
        utils.status.show({
          title: "PageWatch report started",
          summary: `View the full report at ${data.url}`,
          text: ""
        });
      }
    } catch (error) {
      return utils.build.failPlugin("PageWatch test could not be started", {
        error
      });
    }
  }
};
