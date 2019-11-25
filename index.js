require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const Octokit = require("@octokit/rest")
const { App } = require('@octokit/app')

// Set export GITHUB_PRIVATE_KEY=... outside
const githubApp = new App({ id: process.env.GITHUB_APP_IDENTIFIER, privateKey: process.env.GITHUB_PRIVATE_KEY });

const app = express()
const port = 3000

app.use(bodyParser.json())
app.post('/event_handler', async (req, res) => {
  try {
    console.log(req.headers);
    console.log(req.body);
    const installationId = req.body.installation.id;
    const installationAccessToken = await githubApp.getInstallationAccessToken({ installationId })
    const octokit = new Octokit({
      auth: `token ${installationAccessToken}`
    });

    switch (req.headers['x-github-event']) {
      case 'pull_request':
        if (req.body.action === 'opened' || req.body.action === 'reopened') {
          const { data } = await octokit.issues.addAssignees({
            owner: 'alonn24',
            repo: req.body.repository['name'],
            issue_number: req.body['pull_request']['number'],
            assignees: req.body.sender.login
          })
          console.log('update successfully', data);
        }
        break;
      case 'issues':
      default:
        console.log(`Unhandled event ${req.headers['x-github-event']}`)
    }
    res.sendStatus(200)
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
})

app.listen(port, () => console.log(`Github manager listening on port ${port}`))

