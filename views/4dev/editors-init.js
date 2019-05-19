'use strict';

$('.lined').linedtextarea({selectedLine: 1});

const html = ace.edit('html');
html.setTheme('ace/theme/monokai');
html.setFontSize(14);
html.getSession().setMode('ace/mode/html');
html.getSession().setUseWrapMode(true);
html.getSession().setTabSize(2);
html.$blockScrolling = Infinity;
html.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});

const css = ace.edit('css');
css.setTheme('ace/theme/monokai');
css.setFontSize(14);
css.getSession().setMode('ace/mode/css');
css.getSession().setUseWrapMode(true);
css.getSession().setTabSize(2);
css.$blockScrolling = Infinity;
css.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});

const js = ace.edit('js');
js.setTheme('ace/theme/monokai');
js.setFontSize(14);
js.getSession().setMode('ace/mode/javascript');
js.getSession().setUseWrapMode(true);
js.getSession().setTabSize(2);
js.$blockScrolling = Infinity;
js.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});

module.exports = {
  html: html,
  css: css,
  js: js
};
