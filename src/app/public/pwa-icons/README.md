# PWA icon status note

The advertised PNG files were absent from this nested directory in the
inspected source tree. A nested manifest referenced icon sizes 72, 96, 128,
144, 152, 192, 384 and 512, plus shortcut images. The nested service worker
also referenced an icon and badge.

Those references do not establish that the assets exist or that this nested
public directory is published by the root Vite build. PWA support, artwork and
publication decisions remain pending.

Do not generate, replace or publish assets, and do not change manifests or
service workers as part of this note.
