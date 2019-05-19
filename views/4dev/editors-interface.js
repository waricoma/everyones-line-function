'use strict';

const editorsInit = require('./editors-init');

const editors = {
  HTML: {},
  CSS: {},
  JS: {}
};

editors.langs = Object.keys(editors);
editors.kinds = ['simple', 'line', 'ace'];

const setHideShowToggle = (className, editorLang, editorKind) => {
  const jq = editors[editorLang][editorKind].jq;
  const parentQuery = '.col.s12';
  editors[editorLang][editorKind].hide = () => jq.parents(parentQuery).addClass(className);
  editors[editorLang][editorKind].show = () => jq.parents(parentQuery).removeClass(className);
  editors[editorLang][editorKind].toggle = () => jq.parents(parentQuery).toggleClass(className);
};

for (let editorLang of editors.langs) for (let editorKind of editors.kinds) {
  editors[editorLang][editorKind] = {};
  if (editorKind === 'simple') {
    editors[editorLang][editorKind].jq = $(`#simple${editorLang}`);
    setHideShowToggle('hide', editorLang, editorKind);
  }
  if (editorKind === 'line') {
    editors[editorLang][editorKind].jq = $(`#withNum${editorLang}`);
    setHideShowToggle('w0h0', editorLang, editorKind);
  }
  if (editorKind === 'ace') {
    const editorLangToLower = editorLang.toLowerCase();
    editors[editorLang][editorKind].jq = $(`#${editorLangToLower}`);
    editors[editorLang][editorKind].editor = editorsInit[editorLangToLower];
    setHideShowToggle('hide', editorLang, editorKind);
  }
}

let selectedMode = 'simple';
let selectedFile = 'ALL';

editors.otherModeHide = targetMode => {
  selectedMode = targetMode;
  for (let editorLang of editors.langs) {
    const editorKinds = Object.keys(editors[editorLang]);
    for (let editorKind of editorKinds) {
      if (editorKind === targetMode || 'all' === targetMode) {
        if (editorLang === selectedFile || 'ALL' === selectedFile) editors[editorLang][editorKind].show();
        continue;
      }
      editors[editorLang][editorKind].hide();
    }
  }
};

editors.otherFileHide = targetFile => {
  selectedFile = targetFile;
  for (let editorLang of editors.langs) {
    const editorKinds = Object.keys(editors[editorLang]);
    for (let editorKind of editorKinds) {
      if (editorLang === targetFile || 'ALL' === targetFile) {
        if (editorKind === selectedMode || 'all' === selectedMode) editors[editorLang][editorKind].show();
        continue;
      }
      editors[editorLang][editorKind].hide();
    }
  }
};

module.exports = editors;
