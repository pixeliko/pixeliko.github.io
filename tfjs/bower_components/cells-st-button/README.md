# cells-st-button

[![Certificated](https://img.shields.io/badge/certificated-yes-brightgreen.svg)](http://bbva-files.s3.amazonaws.com/cells/bbva-catalog/index.html)

[Demo of component in Cells Catalog](http://bbva-files.s3.amazonaws.com/cells/bbva-catalog/index.html#/elements/cells-st-button)

`cells-st-button` is a styling wrapper for native `button` elements. It expects a `button` tag as content.

You can use the normal button attributes in the `button` tag, as `disabled`, `autofocus`...

```html
<cells-st-button>
  <button>My button</button>
</cells-st-button>
```

```html
<cells-st-button>
  <button disabled>My button</button>
</cells-st-button>
```

## Available styling classes

You can use helper classes in the `cells-st-button` tag, in order to modify the styling of the button.

- primary
- secondary
- tertiary
- quaternary
- neutral
- link
- transparent (makes button transparent, with no paddings)

```html
<cells-st-button class="primary">
  <button>My button</button>
</cells-st-button>
```

```html
<cells-st-button class="transparent">
  <button>My button</button>
</cells-st-button>
```

## Button sizes

Other classes are provided to modify the size of the button.

- size-xl
- size-l
- size-m (default)
- size-s
- size-xs
- full (will give a 100% width to the button)

```html
<cells-st-button class="size-l secondary">
  <button>My button</button>
</cells-st-button>
```

## Button subtext

The button is prepared to show a normal text inside it. You can show a secondary, smaller text adding a `span` tag with the class `subtext` inside the button.

```html
<cells-st-button>
  <button>
    My button
    <span class="subtext">
      Button subtext
    </span>
  </button>
</cells-st-button>
```

## Composed buttons (icon and text)

Showing both text and icons is also supported using the class `composed`, a `span` tag with class `btn-contents`, and `span` tags with classes `btn-text` and `btn-icon`.

```html
<cells-st-button class="composed">
  <button>
    <span class="btn-contents">
      <span class="btn-text">Btn text</span>
      <cells-atom-icon class="btn-icon icon-size-24" icon="coronita:info"></cells-atom-icon>
    </span>
  </button>
</cells-st-button>
```

## Inner alignment

By default, button contents (text or icons) are centered, but you can control this inner alignment using the classes:

- content-left
- content-right
- content-centered

```html
<cells-st-button class="full content-right">
  <button>My button</button>
</cells-st-button>
```

In composed buttons (icon and text), you can add the alignment classes to the `btn-contents` span, and the `btn-text` and `btn-icon` spans, to manage the alignment.

```html
<cells-st-button class="composed full">
  <button>
    <span class="btn-contents content-left">
      <span class="btn-text content-center">
        Btn text
        <span class="subtext">Lorem ipsum</span>
      </span>
      <cells-atom-icon class="btn-icon icon-size-24" icon="coronita:info"></cells-atom-icon>
    </span>
  </button>
</cells-st-button>
```

## Styling

The following custom properties and mixins are available for styling:

### Default buttons

| Custom property | Description     | Default        |
|:----------------|:----------------|:--------------:|
| --cells-st-button-bg-color            | Default background color                   | var(--bbva-core-blue, #004481)                  |
| --cells-st-button-text-color          | Default text color                         | #fff                     |
| --cells-st-button-text-size           | Default text size                          | rem(14px)                |
| --cells-st-button-border-radius       | Default border radius                      | 1px                      |
| --cells-st-button-min-height          | Default button min height                  | var(--cells-st-button-m-min-height, rem(50px)) |
| --cells-st-button                     | Empty mixin for button                     | {}                       |
| --cells-st-button-subtext-size        | Default subtext size                       | rem(11px)                |
| --cells-st-button-subtext             | Empty mixin for button content `.subtext`  | {}                       |
| --cells-st-button-bg-color-hover      | Default background color on `:hover`       | #053967                  |
| --cells-st-button-bg-color-focus      | Default background color on `:focus`       | #053967                  |
| --cells-st-button-text-color-hover    | Default text color on `:hover`             | #fff                     |
| --cells-st-button-text-color-focus    | Default text color on `:focus`             | #fff                     |
| --cells-st-button-hover               | Empty mixin for button on `:hover`         | {}                       |
| --cells-st-button-focus               | Empty mixin for button on `:focus`         | {}                       |
| --cells-st-button-bg-color-active     | Default `:active` background color         | #053967                  |
| --cells-st-button-text-color-active   | Default `:active` text color               | #fff |
| --cells-st-button-active              | Empty mixin for button on `:active`        | {}                       |
| --cells-st-button-bg-color-disabled   | Default `disabled` background color        | #E9E9E9                  |
| --cells-st-button-disabled            | Empty mixin for button `disabled`          | {}                       |
| --cells-st-button-full                | Empty mixin for `.full` button             | {}                       |
| --cells-st-button-bg-color-disabled-on-dark | Background color of disabled buttons on dark backgrouund | rgba(233, 233, 233, 0.3) |
| --cells-st-button-text-color-disabled-on-dark | Text color of disabled buttons on dark backgrouund | rgba(255, 255, 255, 0.3) |
| --cells-st-button-disabled-on-dark | Empty mixin for disabled buttons on dark background | {} |

### Primary buttons

| Custom property | Description     | Default        |
|:----------------|:----------------|:--------------:|
| --cells-st-button-bg-color-primary          | `.primary` button background color              | var(--bbva-core-blue, #004481)                  |
| --cells-st-button-text-color-primary        | `.primary` button text color                    | #fff                     |
| --cells-st-button-primary                   | Empty mixin for `.primary` button               | {}                       |
| --cells-st-button-bg-color-primary-hover    | `.primary` button background color on `:hover`  | #053967                  |
| --cells-st-button-text-color-primary-hover  | `.primary` button text color on `:hover`        | #fff                     |
| --cells-st-button-primary-hover             | Empty mixin for `.primary` button on `:hover`   | {}                       |
| --cells-st-button-bg-color-primary-active   | `.primary` button `:active` background color    | #053967                  |
| --cells-st-button-text-color-primary-active | `.primary` button `:active` text color          | #fff |
| --cells-st-button-primary-active            | Empty mixin for `.primary` button on `:active`  | {}                       |
| --cells-st-button-bg-color-primary-focus   | `.primary` button `:focus` background color    | #053967                  |
| --cells-st-button-text-color-primary-focus | `.primary` button `:focus` text color          | #fff |
| --cells-st-button-primary-focus            | Empty mixin for `.primary` button on `:focus`  | {}                       |
| --cells-st-button-bg-color-primary-disabled | `.primary` button `disabled` background color   | #E9E9E9                  |
| --cells-st-button-primary-disabled          | Empty mixin for `.primary` button `disabled`    | {}                       |

### Secondary buttons

| Custom property | Description     | Default        |
|:----------------|:----------------|:--------------:|
| --cells-st-button-bg-color-secondary          | `.secondary` button background color             | var(--bbva-medium-blue, #237ABA)              |
| --cells-st-button-text-color-secondary        | `.secondary` button text color                   | #fff                 |
| --cells-st-button-secondary                   | Empty mixin for `.secondary` button              | {}                   |
| --cells-st-button-bg-color-secondary-hover    | `.secondary` button background color on `:hover` | #1B6092              |
| --cells-st-button-text-color-secondary-hover  | `.secondary` button text color on `:hover`       | #fff                 |
| --cells-st-button-secondary-hover             | Empty mixin for `.secondary` button on `:hover`  | {}                   |
| --cells-st-button-bg-color-secondary-active   | `.secondary` button `:active` background color   | #1B6092              |
| --cells-st-button-text-color-secondary-active | `.secondary` button `:active` text color         | #fff |
| --cells-st-button-secondary-active            | Empty mixin for `.secondary` button on `:active` | {}                   |
| --cells-st-button-bg-color-secondary-focus    | `.secondary` button `:focus` background color    | #1B6092              |
| --cells-st-button-text-color-secondary-focus  | `.secondary` button `:active` text color         | #fff |
| --cells-st-button-secondary-focus             | Empty mixin for `.secondary` button on `:focus`  | {}                   |
| --cells-st-button-bg-color-secondary-disabled | `.secondary` button `disabled` background color  | #E9E9E9              |
| --cells-st-button-secondary-disabled          | Empty mixin for `.secondary` button `disabled`   | {}                   |

### Tertiary buttons

| Custom property | Description     | Default        |
|:----------------|:----------------|:--------------:|
| --cells-st-button-bg-color-tertiary           | `.tertiary` button background color              | var(--bbva-core-blue, #004481)              |
| --cells-st-button-text-color-tertiary         | `.tertiary` button text color                    | #fff                 |
| --cells-st-button-tertiary                    | Empty mixin for `.tertiary` button               | {}                   |
| --cells-st-button-bg-color-tertiary-hover     | `.tertiary` button background color on `:hover`  | #053967              |
| --cells-st-button-text-color-tertiary-hover   | `.tertiary` button text color on `:hover`        | #fff                 |
| --cells-st-button-tertiary-hover              | Empty mixin for `.tertiary` button on `:hover`   | {}                   |
| --cells-st-button-bg-color-tertiary-active    | `.tertiary` button `:active` background color    | #053967              |
| --cells-st-button-text-color-tertiary-active  | `.tertiary` button `:active` text color          | #fff |
| --cells-st-button-tertiary-active             | Empty mixin for `.tertiary` button on `:active`  | {}                   |
| --cells-st-button-bg-color-tertiary-focus    | `.tertiary` button `:focus` background color    | #053967              |
| --cells-st-button-text-color-tertiary-focus  | `.tertiary` button `:focus` text color          | #fff |
| --cells-st-button-tertiary-focus             | Empty mixin for `.tertiary` button on `:focus`  | {}                   |
| --cells-st-button-bg-color-tertiary-disabled  | `.tertiary` button `disabled` background color   | #E9E9E9              |
| --cells-st-button-tertiary-disabled           | Empty mixin for `.tertiary` button `disabled`    | {}                   |

### Quaternary buttons

| Custom property | Description     | Default        |
|:----------------|:----------------|:--------------:|
| --cells-st-button-bg-color-quaternary           | `.quaternary` button background color             | var(--bbva-core-blue, #004481)           |
| --cells-st-button-text-color-quaternary         | `.quaternary` button text color                   | #fff              |
| --cells-st-button-quaternary                    | Empty mixin for `.quaternary` button              | {}                |
| --cells-st-button-bg-color-quaternary-hover     | `.quaternary` button background color on `:hover` | #053967           |
| --cells-st-button-text-color-quaternary-hover   | `.quaternary` button text color on `:hover`       | #fff              |
| --cells-st-button-quaternary-hover              | Empty mixin for `.quaternary` button on `:hover`  | {}                |
| --cells-st-button-bg-color-quaternary-active    | `.quaternary` button `:active` background color   | #053967           |
| --cells-st-button-text-color-quaternary-active  | `.quaternary` button `:active` text color         | #fff |
| --cells-st-button-quaternary-active             | Empty mixin for `.quaternary` button on `:active` | {}                |
| --cells-st-button-bg-color-quaternary-focus    | `.quaternary` button `:focus` background color   | #053967           |
| --cells-st-button-text-color-quaternary-focus  | `.quaternary` button `:focus` text color         | #fff |
| --cells-st-button-quaternary-focus             | Empty mixin for `.quaternary` button on `:focus` | {}                |
| --cells-st-button-bg-color-quaternary-disabled  | `.quaternary` button `disabled` background color  | #E9E9E9           |
| --cells-st-button-quaternary-disabled           | Empty mixin for `.quaternary` button `disabled`   | {}                |

### Neutral buttons

| Custom property | Description     | Default        |
|:----------------|:----------------|:--------------:|
| --cells-st-button-bg-color-neutral            | `.neutral` button background color             | var(--bbva-core-blue, #004481)                  |
| --cells-st-button-text-color-neutral          | `.neutral` button text color                   | #fff                     |
| --cells-st-button-neutral                     | Empty mixin for `.neutral` button              | {}                       |
| --cells-st-button-bg-color-neutral-hover      | `.neutral` button background color on `:hover` | #053967                  |
| --cells-st-button-text-color-neutral-hover    | `.neutral` button text color on `:hover`       | #fff                     |
| --cells-st-button-neutral-hover               | Empty mixin for `.neutral` button on `:hover`  | {}                       |
| --cells-st-button-bg-color-neutral-active     | `.neutral` button `:active` background color   | #053967                  |
| --cells-st-button-text-color-neutral-active   | `.neutral` button `:active` text color         | #fff |
| --cells-st-button-neutral-active              | Empty mixin for `.neutral` button on `:active` | {}                       |
| --cells-st-button-bg-color-neutral-focus     | `.neutral` button `:focus` background color   | #053967                  |
| --cells-st-button-text-color-neutral-focus   | `.neutral` button `:focus` text color         | #fff |
| --cells-st-button-neutral-focus              | Empty mixin for `.neutral` button on `:focus` | {}                       |
| --cells-st-button-bg-color-neutral-disabled   | `.neutral` button `disabled` background color  | #E9E9E9                  |
| --cells-st-button-neutral-disabled            | Empty mixin for `.neutral` button `disabled`   | {}                       |

### Link buttons

| Custom property | Description     | Default        |
|:----------------|:----------------|:--------------:|
| --cells-st-button-bg-color-link           | `.link` button background color              | transparent |
| --cells-st-button-text-color-link         | `.link` button text color                    | var(--bbva-medium-blue, #237ABA)     |
| --cells-st-button-link                    | Empty mixin for `.link` button               | {}          |
| --cells-st-button-bg-color-link-hover     | `.link` button background color on `:hover`  | transparent |
| --cells-st-button-bg-color-link-focus     | `.link` button background color on `:focus`  | transparent |
| --cells-st-button-text-color-link-hover   | `.link` button text color on `:hover`        | var(--bbva-medium-blue, #237ABA)     |
| --cells-st-button-text-color-link-focus   | `.link` button text color on `:focus`        | var(--bbva-medium-blue, #237ABA)     |
| --cells-st-button-link-hover              | Empty mixin for `.link` button on `:hover`   | {}          |
| --cells-st-button-text-color-link-active  | Empty mixin for `.link` button on `:active`  | var(--bbva-medium-blue, #237ABA)     |
| --cells-st-button-bg-color-link-active    | Empty mixin for `.link` button on `:active`  | transparent |
| --cells-st-button-link-active             | Empty mixin for `.link` button on `:active`  | {}          |
| --cells-st-button-link-focus              | Empty mixin for `.link` button on `:focus`  | {}          |
| --cells-st-button-bg-color-link-disabled  | `.link` button `disabled` background color   | #E9E9E9     |
| --cells-st-button-link-disabled           | Empty mixin for `.link` button `disabled`    | {}          |

### Transparent buttons

| Custom property | Description     | Default        |
|:----------------|:----------------|:--------------:|
| --cells-st-button-bg-color-transparent          | `.transparent` button background color              | transparent  |
| --cells-st-button-text-color-transparent        | `.transparent` button text color                    | var(--bbva-medium-blue, #237ABA)      |
| --cells-st-button-transparent                   | Empty mixin for `.transparent` button               | {}           |
| --cells-st-button-bg-color-transparent-hover    | `.transparent` button background color on `:hover`  | transparent  |
| --cells-st-button-bg-color-transparent-focus    | `.transparent` button background color on `:focus`  | transparent  |
| --cells-st-button-text-color-transparent-hover  | `.transparent` button text color on `:hover`        | var(--bbva-medium-blue, #237ABA)      |
| --cells-st-button-text-color-transparent-focus  | `.transparent` button text color on `:hover`        | var(--bbva-medium-blue, #237ABA)      |
| --cells-st-button-transparent-hover             | Empty mixin for `.transparent` button on `:hover`   | {}           |
| --cells-st-button-bg-color-transparent-active   | `.transparent` button background color on `:active` | transparent  |
| --cells-st-button-text-color-transparent-active | `.transparent` button text color on `:active`       | var(--bbva-medium-blue, #237ABA)      |
| --cells-st-button-transparent-active            | Empty mixin for `.transparent` button on `:active`  | {}           |
| --cells-st-button-transparent-disabled          | Empty mixin for `.transparent` button `disabled`    | {}           |
| --cells-st-button-transparent-focus             | Empty mixin for `.transparent` button on `:focus`   | {}           |

### Composed buttons

| Custom property | Description     | Default        |
|:----------------|:----------------|:--------------:|
| --cells-st-button-composed          | Empty mixin for `.composed` button                      | {}    |
| --cells-st-button-composed-contents | Empty mixin for `.composed` button `.btn-contents` span | {}    |
| --cells-st-button-composed-text     | Empty mixin for `.composed` button content `.btn-text`  | {}    |
| --cells-st-button-composed-icon     | Empty mixin for `.composed` button content `.btn-icon`  | {}    |

### Content alignment

| Custom property | Description     | Default        |
|:----------------|:----------------|:--------------:|
| --cells-st-button-content-centered  | Empty mixin for `.content-centered` class  | {}     |
| --cells-st-button-content-left      | Empty mixin for `.content-left` class      | {}     |
| --cells-st-button-content-right     | Empty mixin for `.content-right` class     | {}     |

### Size

| Custom property | Description     | Default        |
|:----------------|:----------------|:--------------:|
| --cells-st-button-xl-min-height | `.size-xl` button min-height      | rem(58px)  |
| --cells-st-button-size-xl       | Empty mixin for `.size-xl` button | {}         |
| --cells-st-button-l-min-height  | `.size-l` button min-height       | rem(50px)  |
| --cells-st-button-size-l        | Empty mixin for `.size-l` button  | {}         |
| --cells-st-button-m-min-height  | `.size-m` button min-height       | rem(42px)  |
| --cells-st-button-size-m        | Empty mixin for `.size-m` button  | {}         |
| --cells-st-button-s-min-height  | `.size-s` button min-height       | rem(34px)  |
| --cells-st-button-size-s        | Empty mixin for `.size-s` button  | {}         |
| --cells-st-button-xs-min-height | `.size-xs` button min-height      | rem(26px)  |
| --cells-st-button-size-xs       | Empty mixin for `.size-xs` button | {}         |
