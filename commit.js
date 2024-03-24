const { Octokit } = require('@octokit/rest');
const fs = require('fs');
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = 'RapiIlham';
const repo = 'repo-goodle-noodle';
const filePath = 'commit.js'; // Path to the file you want to modify

async function getFileSha() {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
    });

    return response.data.sha;
  } catch (error) {
    console.error('Error fetching file:', error.message);
    return null;
  }
}

async function commitChanges() {
  try {
    const sha = await getFileSha();
    if (!sha) return;

    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');

    // Update the content (you can modify it as needed)
    const timestamp = new Date().toISOString();

    // Create a new commit
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: `Update commit.js`,
      content: Buffer.from(content).toString('base64'), // Convert content to base64
      sha, // Provide the SHA hash of the existing file content
      committer: {
        name: 'RapiIlham',
        email: 't.eratmbl1@gmail.com',
      },
      author: {
        name: 'RapiIlham',
        email: 't.eratmbl1@gmail.com',
      },
    });

    console.log('Changes committed:', response.data.commit.html_url);
  } catch (error) {
    console.error('Error committing changes:', error.message);
  }
}

async function main() {
  try {
    await commitChanges();
    // Add more actions here if needed
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
