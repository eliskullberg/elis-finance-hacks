## Elis Finance Hacks

Monorepo for a hobby project web-app that does the following:

- Tracks the current value of subscription rights (Swedish: teckningsrätter). Live price data is fetched via Avanza API.
- Tracks the current NAV of a portfolio of certificates, stocks, funds and bank accounts. Useful when you have holdings stuck in various banks (e.g. becuase of tjänstepension etc) but want a live total value of all your holdings. Live price data is fetched from Avanza.

## Installation

The app runs out-of-the-box in Google App engine.

1. Set-up a new Google App Engine project and install Google Cloud CLI.
2. Run "gcloud app deploy dispatch.yaml" from project root.
3. Run "npm run deploy" from client folder.
4. Re-name example files in the "backend/static"-folders. Add your holdings and whatever rights you want to track.
5. Run "npm run deploy" from backend folder.
