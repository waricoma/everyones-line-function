'use strict';

let userAction = true;

let cursorInf = {
  type: '',
  editorLang: '',
  editorKind: '',
  pos: null
};

module.exports.inf = () => {
  return cursorInf;
};

module.exports.listener = editors => {
  for (let editorLang of editors.langs) {
    const editorKinds = Object.keys(editors[editorLang]);
    for (let editorKind of editorKinds) {
      if(editorKind !== 'ace') {
        editors[editorLang][editorKind].jq.on('keyup click focus', () => {
          userAction = false;
          cursorInf.type = 'textarea';
          cursorInf.editorLang = editorLang;
          cursorInf.editorKind = editorKind;
          cursorInf.pos = editors[editorLang][editorKind].jq.prop('selectionStart');
          userAction = true;
        });
      } else {
        editors[editorLang][editorKind].editor.selection.on('changeSelection', () => {
          if(!userAction) return true;
          cursorInf.type = 'ace';
          cursorInf.editorLang = editorLang;
          cursorInf.editorKind = editorKind;
          cursorInf.pos = editors[editorLang][editorKind].editor.selection.getCursor();
        });
      }
    }
  }
};
