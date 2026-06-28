YouTube Embed Preview Note

The portfolio streams the YouTube introduction inline when the site is opened through http/https, for example:
- GitHub Pages
- http://localhost:5500
- a local dev server

If index.html is opened directly with file://, YouTube blocks inline playback and can show Error 153.
For local testing, run one of these commands in the project folder:

python -m http.server 5500

or

npx serve .

Then open the localhost URL in your browser.
