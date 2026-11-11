# Historical note: light CSS selectors

This note records a historical, unvalidated transformation proposal. It is not
a current instruction and must not be executed without separate approval.

The historical claim was that `body:not(.dark)` selectors could leak light
styles into dark mode. The historical report counted **73+** instances.

Historical before/after example:

```css
/* Before: historical example */
:root:not(.dark) .header,
body:not(.dark) .header {
  background: pink;
}

/* After: historical example */
:root:not(.dark) .header {
  background: pink;
}
```

The examples and count are retained for reports that reference this note. They
are historical claims, not a fresh diagnosis or a directive to alter
`light.css`.
