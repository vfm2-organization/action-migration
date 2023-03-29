const fs = require("fs");
const { Octokit } = require("octokit");

let gh = new Octokit({
  baseUrl: process.env.GITHUB_API_URL,
  auth: process.env.GHES_ADMIN_TOKEN,
});

const repos = fs
  .readFileSync("repositories.txt")
  .toString()
  .split("\n")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

function deleteFromOrg() {
  repos.forEach(function (index) {
    let [org, repo] = index.split("/");
    gh.rest.repos
      .delete({
        owner: org,
        repo: repo,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

module.exports = {
  deleteFromOrg: deleteFromOrg,
};
