const render = require('preact-render-to-string');

const createPredicate = require('./to-be-published/get-js-from-url');
const tryGetCached = require('./to-be-published/try-get-cached');

module.exports = (options, callback) => {
  try {
    const url = options.model.solidComponent.src;
    const key = options.model.solidComponent.key;
    const props = options.model.solidComponent.props;
    const extractor = (key, context) => context.oc.solidComponents[key];
    const getJsFromUrl = createPredicate({
      key,
      url,
      extractor,
    });

    tryGetCached('solidComponent', key, getJsFromUrl, (err, CachedApp) => {
      if (err) return callback(err);
      try {
        const preactHtml = render(CachedApp(props));

        const html = options.template(
          Object.assign({}, options.model, {
            __html: preactHtml,
          })
        );
        return callback(null, html);
      } catch (error) {
        return callback(error);
      }
    });
  } catch (err) {
    return callback(err);
  }
};
