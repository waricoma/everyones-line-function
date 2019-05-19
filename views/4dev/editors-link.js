'use strict';

let userAction = true;

module.exports = editors => {

  const setValue = (editorLang, editorKind, value) => {
    userAction = false;
    if(editorKind !== 'simple') editors[editorLang].simple.jq.val(value);
    if(editorKind !== 'line') editors[editorLang].line.jq.val(value);
    if(editorKind !== 'ace') editors[editorLang].ace.editor.setValue(value);
    userAction = true;
  };

  for (let editorLang of editors.langs) {
    const editorKinds = Object.keys(editors[editorLang]);
    for (let editorKind of editorKinds) {
      if(editorKind !== 'ace') {
        editors[editorLang][editorKind].jq.on('input propertychange', () => {
          setValue(editorLang, editorKind, editors[editorLang][editorKind].jq.val());
        });
      } else {
        editors[editorLang][editorKind].editor.getSession().on('change', () => {
          if(!userAction) return true;
          setValue(editorLang, editorKind, editors[editorLang][editorKind].editor.getValue());
        });
      }
    }
  }
};
