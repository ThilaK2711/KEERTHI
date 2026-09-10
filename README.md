# Keerthi · Birthday Surprise

A romantic, multilingual birthday surprise built with React and Vite.

## Run locally

```bash
npm install
npm run dev
```

## Publish online

### Vercel

1. Push this folder to a GitHub repository.
2. Import the repository at [vercel.com](https://vercel.com).
3. Keep the defaults: Vite detects the build command as `npm run build` and the output folder as `dist`.

### Netlify

1. Push this folder to a GitHub repository.
2. Choose **Add new site → Import an existing project** at [netlify.com](https://netlify.com).
3. Use `npm run build` as the build command and `dist` as the publish directory.

## Personalize

- Replace the message in `src/main.jsx` inside the `message-card` section.
- Edit the `birthdayWishes` and `careCards` arrays to personalize the background and doctor theme.
- Edit the `littleThings` array to add personal notes and inside jokes.
- For the optional note form, create a form at [formspree.io](https://formspree.io), then replace `YOUR_FORM_ID` in `feedbackEndpoint` inside `src/main.jsx`.
- Replace the audio URL on the `<audio>` element if you want a different soundtrack. Music only starts after the visitor presses the music button.
