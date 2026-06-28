Video fallback behavior:

- On GitHub Pages or localhost, the portfolio attempts to stream the YouTube intro inline.
- When opened directly as file://, YouTube embeds can fail because there is no valid HTTP referrer. The portfolio now defaults to the local MP4 file instead.
- Local fallback file expected path: public/videos/intro_video.mp4

Recommended local test:
  npx serve .
