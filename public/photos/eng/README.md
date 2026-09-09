# Engineering stack project photos

Drop images into a folder per project, then list them on that project’s
`more.images` in `src/engineering/config.js`.

Example:

```
public/photos/eng/spin-master/board.jpg
public/photos/eng/risc-v/waveform.png
```

```js
more: {
  paragraphs: ["…"],
  bullets: ["…"],
  images: [
    { src: "/photos/eng/spin-master/board.jpg", alt: "Test controller board" },
  ],
},
```

Clicking a thumbnail opens the same expand/lightbox as the photography portfolio.
