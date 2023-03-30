const removeExtension = (path) => path.replace(/\.(t|j)sx?$/, '');

const solidOCProviderTemplate = ({ viewPath }) => `
  import { render } from 'solid-js/web';
  import View from '${removeExtension(viewPath)}';
  import { DataProvider } from 'oc-template-solid-compiler/utils/useData'

  function OCProvider(props: any): any {
    const { _staticPath, _baseUrl, _componentName, _componentVersion, ...rest } = props;

    (window as any).oc.events.fire('oc:componentDidMount', rest);

    function getData(providerProps: any, parameters: any, cb: (error: any, parameters?: any, props?: any) => void) {
      return (window as any).oc.getData({
        name: providerProps._componentName,
        version: providerProps._componentVersion,
        baseUrl: providerProps._baseUrl,
        parameters
      }, (err: any, data: any) => {
        if (err) {
          return cb(err);
        }
        cb(null, rest, data.solidComponent.props);
      });
    }

    function getSetting(providerProps: any, setting: string) {
      const settingHash = {
        name: providerProps._componentName,
        version: providerProps._componentVersion,
        baseUrl: providerProps._baseUrl,
        staticPath: providerProps._staticPath
      };
      return (settingHash as any)[setting];
    }
   
    (rest as any).getData = (parameters: any, cb: (error: any, parameters?: any, props?: any) => void) => getData(props, parameters, cb);
    (rest as any).getSetting = (setting: string) => getSetting(props, setting);

    return (
      <DataProvider value={{...rest}}>
        <View { ...rest } />
      </DataProvider>
    );
  }

  function renderer(props, element) {
    render(() => <OCProvider {...props} />, element);
  }

  export default renderer;
`;

module.exports = solidOCProviderTemplate;
