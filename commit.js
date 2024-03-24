const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = 'RapiIlham';
const repo = 'repo-goodle-noodle';

async function createIssue() {
  try {
    const response = await octokit.issues.create({
      owner,
      repo,
      title: 'Auto-generated Issue',
      body: 'This issue was automatically created by the GitHub bot.',
    });
    console.log('Issue created:', response.data.html_url);
  } catch (error) {
    console.error('Error creating issue:', error.message);
  }
}

async function main() {
  try {
    await createIssue();
    // Add more actions here if needed
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
