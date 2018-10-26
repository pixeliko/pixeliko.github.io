# Changes in Cells Polymer Bridge

## Version 3.4.0

- `New feature`. Meta-data for Composer. The Bridge generates extra information
  that is used by Composer to create applications.

## Version 3.3.3

- `Bug fix`. Fixed logout function.

## Version 3.3.2

- `Bug fix`. Fixed a case when properties were treated as attributes.
- `Bug fix`. Events patched with ie11 polyfill didn't work the same way as native Events (they didn't have the AT_TARGET property).

## Version 3.3.1

- `Bug fix`. Unresolved components were not retrieved.

## Version 3.3.0

- `New feature`. Prepared for using routable web components.
- `New feature`. Use of local definition pages or served from Composer (static & remote pages).

## Version 3.2.0

- `New feature`. Add several skip navigations at once.
- `Bug fix`. Fixed an issue with components getting the same event twice after being reattached to a channel.

## Version 3.1.2

- `Bug fix`. Fixed minor bugs related to satic HTML pages.

## Version 3.1.0

- `New feature`. Skip pages from history navigation.

## Version 3.0.0

- `New feature`. Static HTML pages. Now applications can have their pages written in HTML.

- `New feature`. Priority render for components. Every component can have a priority assigned and Cells Bridge can render the components based on their priority.

## Version 2.0.3

- `Bug fix`. Update of cells-bridge dependecy that solves minor bugs.

## Version 2.0.2

- `Bug fix`. Update of cells-bridge dependecy that solves minor bugs.

## Version 2.0.0

- `New Feature`. Compatible with Polymer 2 elements.

## Version 1.0.3

- `Bug fix`. Update of cells-bridge dependecy that solves minor bugs.

## Version 1.0.2

- `Bug fix`. Fix private channels with pre-rendered pages.

## Version 1.0.1

- `Refactor`. Refactor of the way Rx library is packed.

## Version 1.0.0

- `New Feature`. Pre-render of pages.
- `New Feature`. Compatible with Polymer's hybrid components.

## Version 0.9.0

- `New Feature`. Events hooks now are published in channels.
- `New Feature`. Channels can be configured to discard old values upon reconnection of components.
- `New Feature`. In-memory local storage for cases when the browser's local storage is disabled.

## Version 0.8.0

- `New Feature`. RxJs 5. Cells now it's using the latest version of RxJs which brings a big improvement in performance.

- `Bug Fixes`. This version has fixes for:
  - Logout. The transition between pages when doing a logout wasn't smooth. It's been solved.
  - Property-changed event. When two components fired an event with the same name, different channels listening to the event could get wrong values. That was due to Polymer using cache for events. Now, Polymer's event cache can be disabled. Just set to `false` the property `avoidPolymerEventCache` when creating an instance of `CellsPolymerBridge` in the `app.js` file:
  ```javascript
      var bridge = new window.CellsPolymerBridge({
      avoidPolymerEventCache: true,
      ...
  ```

## Version 0.7.1

- `Bug fixes`. These release solves the following problems:
  - Event retargeting with shady-dom (Safari/Firefox) were not working properly.
  - Navigate to the same page triggered multiple times the same event.
  - The logout function didn't reconnect cross components when there were more than one registered in the initial page.

## Version 0.7.0

- `New feature`. Logout. Cells now implements a logout function. This function does:

  - It removes every template from the DOM.
  - It removes every template from the Cells' cache.
  - It resets every channel (including the private channels).
  - It resets every cross component.
  - It navigates to the another page (usually the login page).

- `New feature`. Handle missing page definition. When a page definition (.json file) is not found, the bridge can redirect to a custom error page.

- `New feature`. Control multiple instances of Cells Bridge. It prints on console a warning message when there are more than one instance of the bridge.

## Version 0.6.0

- `New feature`. Cells now has support for:

  - Fast `R`ender of the initial route
  - `L`azy load and creation of remaining routes on demand.

  These are two steps toward the [PRPL pattern](https://developers.google.com/web/fundamentals/performance/prpl-pattern/?hl=en).

  _*To use this feature you will also need to update the Cells CLI tools (cells-app & pisco-cells-app-create)*_.

  See documentation [here](https://bbva.cellsjs.com/guides/advanced-guides/application-start.html).

- `New feature`. Serve and vulcanize files in `elements` folder.

  _*To use this feature you will need to update the Cells CLI tools (cells-app & pisco-cells-app-create)*_.

  More info [here](https://bbva.cellsjs.com/guides/advanced-guides/application-start.html#elements).

- `New feature`. Support for ES6 (ES2015).

  See documentation [here](https://bbva.cellsjs.com/guides/advanced-guides/es6-support.html)

  _*To use this feature you will need to update the Cells CLI tools (cells-app & pisco-cells-app-create)*_.

## Version 0.5.1

- This version includes a new feature that lets you define a custom 404 error page or redirection if the page doesn't exist. Also we've solved some minor issues with Safari and Polymer 2.
