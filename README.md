# This package has been moved

**Use the new oc-template-solid template on [vite-templates](https://github.com/opencomponents/vite-templates)**

## oc-template-solid

[SolidJS](https://www.solidjs.com/) template with support & utilities for the [OpenComponents](https://github.com/opentable/oc) template system

---

## Packages included in this repo

| Name                                                                                       | Version                                                                                                                                             |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`oc-template-solid`](/packages/oc-template-solid)                   | [![npm version](https://badge.fury.io/js/oc-template-solid.svg)](http://badge.fury.io/js/oc-template-solid)                   |
| [`oc-template-solid-compiler`](/packages/oc-template-solid-compiler) | [![npm version](https://badge.fury.io/js/oc-template-solid-compiler.svg)](http://badge.fury.io/js/oc-template-solid-compiler) |

## Usage:

Initialize a component with the oc-template-solid and follow the CLI instructions

```
$ npx oc init my-awesome-oc oc-template-solid
$ cd my-awesome-oc
$ npm install
```

## Extra info:

### package.json requirements

- `template.src` - the Solid App entry point - should export a solid component as `default`
- `template.type` - `oc-template-solid`
- required in `devDependencies` - `oc-template-solid-compiler`, `solid-js`

### conventions

- `props = server()` - the viewModel generated by the server is automatically passed to the solid application as props
- The oc-client-browser is extended and will now expose all the available solid-component at `oc.solidComponents[bundleHash]`
- You can register an event handler within the [oc.events](https://github.com/opentable/oc/wiki/Browser-client#oceventsoneventname-callback) system for the the `oc:componentDidMount` event. The event will be fired immediately after the solid app is mounted.
- You can register an event handler within the [oc.events](https://github.com/opentable/oc/wiki/Browser-client#oceventsoneventname-callback) system for the the `oc:cssDidMount` event. The event will be fired immediately after the style tag will be added to the active DOM tree.

### features

- `Server Side Rendering` = server side rendering should work as for any other OpenComponent
- `css-modules` are supported.
- `sass-modules` are supported (you need to install the `node-sass` dependency).
- `post-css` is supported with the following plugins:
  - [postcss-import](https://github.com/postcss/postcss-import)
  - [postcss-extend](https://github.com/travco/postcss-extend)
  - [postcss-icss-values](https://github.com/css-modules/postcss-icss-values)
  - [autoprefixer](https://github.com/postcss/autoprefixer)

## Utils

The compiler exposes some utilities that could be used by your Solid application:

### Hooks

#### useData

A hook that will make a `getData` function available via props, plus
the initial data passed from the server to the component.

##### Usage:

```javascript
import { useData } from 'oc-template-solid-compiler/utils/useData';

const App = (props) => {
  // getData and getSetting are always available
  const { id, getData, getSetting } = useData<{ id: number }>();
  const staticPath = getSetting('staticPath');

  return (
    <div>
      <h1>Id: {id}</h1>
      <img src={`${staticPath}/public/logo.png`} alt="Logo" />
    </div>
  )
};

yourEnhancedApp = withDataProvider(yourApp);
```

`getData` accept one argument: `(params) => Promise<result>`. It will perform a post back request to the component endpoint with the specified query perams invoking the callback with the results.

`getSetting` accept one argument: `settingName => settingValue`. It will return the value for the requested setting.

Settings available at the moment:

- `getSetting('name')` : return the name of the OC component
- `getSetting('version')` : return the version of the OC component
- `getSetting('baseUrl')` : return the [baseUrl of the oc-registry](https://github.com/opentable/oc/wiki/The-server.js#context-properties)
- `getSetting('staticPath')` : return the path to the [static assets](https://github.com/opentable/oc/wiki/The-server.js#add-static-resource-to-the-component) of the OC component

For more details, check the [`example app`](/acceptance-components/solid-app/app.js)
