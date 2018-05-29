module.exports = name =>
`<div class="{{ $styles['${name}-component'] }}">
  <h1>[component: ${name}]</h1>
</div>
`;