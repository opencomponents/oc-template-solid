const escapeCSS = require('cssesc');

const viewTemplate = ({ templateId, css, bundle, hash }) => `function(model){
  oc.solidComponents = oc.solidComponents || {};
  oc.solidComponents['${hash}'] = oc.solidComponents['${hash}'] || (${bundle});
  if (!model) return;
  var modelHTML =  model.__html ? model.__html : '';
  var staticPath = model.component.props._staticPath;
  var props = JSON.stringify(model.component.props);
  window.oc = window.oc || {};
  window.oc.__solidTemplate = window.oc.__solidTemplate || { count: 0 };
  var count = window.oc.__solidTemplate.count;
  var templateId = "${templateId}-" + count;
  window.oc.__solidTemplate.count++;
  return '<div id="' + templateId + '" class="${templateId}">' + modelHTML + '</div>' +
    '${css ? '<style>' + escapeCSS(css) + '</style>' : ''}' +
    '<script>' +
    'window.oc = window.oc || {};' +
    'oc.cmd = oc.cmd || [];' +
    'oc.cmd.push(function(oc){' +
    '${css ? "oc.events.fire(\\'oc:cssDidMount\\', \\'" + css + "\\');" : ''}' +
      'var targetNode = document.getElementById("' + templateId + '");' +
      'targetNode.setAttribute("id","");' +
      'oc.solidComponents["${hash}"](' + props + ', targetNode);' +
    '});' +
  '</script>'
}`;

module.exports = viewTemplate;
