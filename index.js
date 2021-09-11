import axios from "axios";
import btoa from "btoa";
import core from "@actions/core";
import github from "@actions/github";
import dotenv from "dotenv";

dotenv.config();

const getGitHubRequestHeaders = (username, accessToken) => ({
  headers: { Authorization: `Basic ${btoa(`${username}:${accessToken}`)}` },
});

const fetchPRURL = async (
  commitHash,
  username,
  accessToken,
  repoOwner,
  repoName
) => {
  const issuesResponse = await axios.get(
    `https://api.github.com/search/issues?q=hash:${commitHash}`,
    getGitHubRequestHeaders(username, accessToken)
  );
  const { items: issues } = await issuesResponse.data;

  const prURLRegex = new RegExp(
    `https://api.github.com/repos/${repoOwner}/${repoName}/pulls/[0-9]+`
  );
  const { pull_request } = issues.find((issue) =>
    issue.pull_request.url.match(prURLRegex)
  );
  return pull_request.url;
};

const isOffline = process.env.NODE_ENV === "offline";
const commitHash = isOffline ? process.env.COMMIT_HASH : github.context.sha;
const repoOwner = isOffline
  ? process.env.REPO_OWNER
  : github.context.repo.owner;
const repoName = isOffline ? process.env.REPO_NAME : github.context.repo.repo;
const username = process.env.GH_USERNAME;
const accessToken = process.env.GH_ACCESS_TOKEN;

const prURL = await fetchPRURL(
  commitHash,
  username,
  accessToken,
  repoOwner,
  repoName
);
console.log(prURL);
