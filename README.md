# Usage
To use the app:
1. Install the App in your organization
2. Deploy the app using `zeit`:
  * now secret add github-private-key "$(cat [.pem file] | base64)"
  * now secrets add github_app_identifier [app-identifier]
  * now
  * Set [url]/event_handler as the web hook address.

#Development
To run the app locally you need to dispatch the web hook to you local machine. You can achieve that using [smee.io](http://smee.io).
1. add local variables using `.env` file or:
* export GITHUB_PRIVATE_KEY="$(cat [.pem file] | base64)"
* export GITHUB_APP_IDENTIFIER=[app-identifier]
2. npm run dev
3. smee --url https://smee.io/EW6V0yRgPYjZZj3 --path /event_handler --port 3000
4. Set https://smee.io/EW6V0yRgPYjZZj3 as the web hook address.
