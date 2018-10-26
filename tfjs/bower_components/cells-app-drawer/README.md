##&lt;cells-app-drawer&gt;

Material design: [Navigation drawer](https://www.google.com/design/spec/patterns/navigation-drawer.html)

`cells-app-drawer` contains a drawer panel and a main panel.  The drawer
and the main panel are side-by-side with drawer on the left.  When the browser
window size is smaller than the `responsiveWidth`, `cells-app-drawer`
changes to narrow layout.  In narrow layout, the drawer will be stacked on top
of the main panel.  The drawer will slide in/out to hide/reveal the main
panel.

Use the attribute `drawer` to indicate that the element is the drawer panel and
`main` to indicate that the element is the main panel.

Example:

```html
<cells-app-drawer>
  <div slot="drawer"> Drawer panel... </div>
  <div slot="main"> Main panel... </div>
</cells-app-drawer>
```

The drawer and the main panels are not scrollable.  You can set CSS overflow
property on the elements to make them scrollable or use `paper-header-panel`.

Example:

```html
<cells-app-drawer>
  <paper-header-panel slot="drawer">
    <paper-toolbar></paper-toolbar>
    <div> Drawer content... </div>
  </paper-header-panel>
  <paper-header-panel slot="main">
    <paper-toolbar></paper-toolbar>
    <div> Main content... </div>
  </paper-header-panel>
</cells-app-drawer>
```

An element that should toggle the drawer will automatically do so if it's
given the `paper-drawer-toggle` attribute.  Also this element will automatically
be hidden in wide layout.

Example:

```html
<cells-app-drawer>
  <paper-header-panel slot="drawer">
    <paper-toolbar>
      <div>Application</div>
    </paper-toolbar>
    <div> Drawer content... </div>
  </paper-header-panel>
  <paper-header-panel slot="main">
    <paper-toolbar>
      <paper-icon-button icon="menu" paper-drawer-toggle></paper-icon-button>
      <div>Title</div>
    </paper-toolbar>
    <div> Main content... </div>
  </paper-header-panel>
</cells-app-drawer>
```

To position the drawer to the right, add `right-drawer` attribute.

```html
<cells-app-drawer right-drawer>
  <div slot="drawer"> Drawer panel... </div>
  <div slot="main"> Main panel... </div>
</cells-app-drawer>
```

### Styling

To change the main container:

```css
cells-app-drawer {
  --cells-app-drawer-main-container: {
    background-color: gray;
  };
}
```

To change the drawer container when it's in the left side:

```css
cells-app-drawer {
  --cells-app-drawer-left-drawer-container: {
    background-color: white;
  };
}
```

To change the drawer container when it's in the right side:

```css
cells-app-drawer {
  --cells-app-drawer-right-drawer-container: {
    background-color: white;
  };
}
```

To customize the scrim:

```css
cells-app-drawer {
  --cells-app-drawer-scrim: {
    background-color: red;
  };
}
```

The following custom properties and mixins are available for styling:

| Custom property | Description | Default |
| --- | --- | --- |
| `--cells-app-drawer-scrim-opacity` | Scrim opacity | 1 |
| `--cells-app-drawer-drawer-container` | Mixin applied to drawer container | {} |
| `--cells-app-drawer-left-drawer-container` | Mixin applied to container when it's in the left side | {} |
| `--cells-app-drawer-main-container` | Mixin applied to main container | {} |
| `--cells-app-drawer-right-drawer-container` | Mixin applied to container when it's in the right side | {} |
| `--cells-app-drawer-scrim` | Mixin applied to scrim | {} |


