"use strict";

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;if (!f && c) return c(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
        }var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];return o(n || r);
        }, p, p.exports, r, e, n, t);
      }return n[i].exports;
    }for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }return o;
  }return r;
})()({ 1: [function (require, module, exports) {
    'use strict';

    var userAction = true;

    var cursorInf = {
      type: '',
      editorLang: '',
      editorKind: '',
      pos: null
    };

    module.exports.inf = function () {
      return cursorInf;
    };

    module.exports.listener = function (editors) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var editorLang = _step.value;

          var editorKinds = Object.keys(editors[editorLang]);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            var _loop2 = function _loop2() {
              var editorKind = _step2.value;

              if (editorKind !== 'ace') {
                editors[editorLang][editorKind].jq.on('keyup click focus', function () {
                  userAction = false;
                  cursorInf.type = 'textarea';
                  cursorInf.editorLang = editorLang;
                  cursorInf.editorKind = editorKind;
                  cursorInf.pos = editors[editorLang][editorKind].jq.prop('selectionStart');
                  userAction = true;
                });
              } else {
                editors[editorLang][editorKind].editor.selection.on('changeSelection', function () {
                  if (!userAction) return true;
                  cursorInf.type = 'ace';
                  cursorInf.editorLang = editorLang;
                  cursorInf.editorKind = editorKind;
                  cursorInf.pos = editors[editorLang][editorKind].editor.selection.getCursor();
                });
              }
            };

            for (var _iterator2 = editorKinds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _loop2();
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        };

        for (var _iterator = editors.langs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    };
  }, {}], 2: [function (require, module, exports) {
    'use strict';

    $('.lined').linedtextarea({ selectedLine: 1 });

    var html = ace.edit('html');
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

    var css = ace.edit('css');
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

    var js = ace.edit('js');
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
  }, {}], 3: [function (require, module, exports) {
    'use strict';

    var editorsInit = require('./editors-init');

    var editors = {
      HTML: {},
      CSS: {},
      JS: {}
    };

    editors.langs = Object.keys(editors);
    editors.kinds = ['simple', 'line', 'ace'];

    var setHideShowToggle = function setHideShowToggle(className, editorLang, editorKind) {
      var jq = editors[editorLang][editorKind].jq;
      var parentQuery = '.col.s12';
      editors[editorLang][editorKind].hide = function () {
        return jq.parents(parentQuery).addClass(className);
      };
      editors[editorLang][editorKind].show = function () {
        return jq.parents(parentQuery).removeClass(className);
      };
      editors[editorLang][editorKind].toggle = function () {
        return jq.parents(parentQuery).toggleClass(className);
      };
    };

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = editors.langs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _editorLang3 = _step3.value;
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = editors.kinds[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _editorKind3 = _step8.value;

            editors[_editorLang3][_editorKind3] = {};
            if (_editorKind3 === 'simple') {
              editors[_editorLang3][_editorKind3].jq = $("#simple" + _editorLang3);
              setHideShowToggle('hide', _editorLang3, _editorKind3);
            }
            if (_editorKind3 === 'line') {
              editors[_editorLang3][_editorKind3].jq = $("#withNum" + _editorLang3);
              setHideShowToggle('w0h0', _editorLang3, _editorKind3);
            }
            if (_editorKind3 === 'ace') {
              var editorLangToLower = _editorLang3.toLowerCase();
              editors[_editorLang3][_editorKind3].jq = $("#" + editorLangToLower);
              editors[_editorLang3][_editorKind3].editor = editorsInit[editorLangToLower];
              setHideShowToggle('hide', _editorLang3, _editorKind3);
            }
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
              _iterator8.return();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var selectedMode = 'simple';
    var selectedFile = 'ALL';

    editors.otherModeHide = function (targetMode) {
      selectedMode = targetMode;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = editors.langs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _editorLang = _step4.value;

          var _editorKinds = Object.keys(editors[_editorLang]);
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = _editorKinds[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _editorKind = _step5.value;

              if (_editorKind === targetMode || 'all' === targetMode) {
                if (_editorLang === selectedFile || 'ALL' === selectedFile) editors[_editorLang][_editorKind].show();
                continue;
              }
              editors[_editorLang][_editorKind].hide();
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    };

    editors.otherFileHide = function (targetFile) {
      selectedFile = targetFile;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = editors.langs[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _editorLang2 = _step6.value;

          var _editorKinds2 = Object.keys(editors[_editorLang2]);
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = _editorKinds2[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var _editorKind2 = _step7.value;

              if (_editorLang2 === targetFile || 'ALL' === targetFile) {
                if (_editorKind2 === selectedMode || 'all' === selectedMode) editors[_editorLang2][_editorKind2].show();
                continue;
              }
              editors[_editorLang2][_editorKind2].hide();
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    };

    module.exports = editors;
  }, { "./editors-init": 2 }], 4: [function (require, module, exports) {
    'use strict';

    var userAction = true;

    module.exports = function (editors) {

      var setValue = function setValue(editorLang, editorKind, value) {
        userAction = false;
        if (editorKind !== 'simple') editors[editorLang].simple.jq.val(value);
        if (editorKind !== 'line') editors[editorLang].line.jq.val(value);
        if (editorKind !== 'ace') editors[editorLang].ace.editor.setValue(value);
        userAction = true;
      };

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        var _loop3 = function _loop3() {
          var editorLang = _step9.value;

          var editorKinds = Object.keys(editors[editorLang]);
          var _iteratorNormalCompletion10 = true;
          var _didIteratorError10 = false;
          var _iteratorError10 = undefined;

          try {
            var _loop4 = function _loop4() {
              var editorKind = _step10.value;

              if (editorKind !== 'ace') {
                editors[editorLang][editorKind].jq.on('input propertychange', function () {
                  setValue(editorLang, editorKind, editors[editorLang][editorKind].jq.val());
                });
              } else {
                editors[editorLang][editorKind].editor.getSession().on('change', function () {
                  if (!userAction) return true;
                  setValue(editorLang, editorKind, editors[editorLang][editorKind].editor.getValue());
                });
              }
            };

            for (var _iterator10 = editorKinds[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
              _loop4();
            }
          } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion10 && _iterator10.return) {
                _iterator10.return();
              }
            } finally {
              if (_didIteratorError10) {
                throw _iteratorError10;
              }
            }
          }
        };

        for (var _iterator9 = editors.langs[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          _loop3();
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }
    };
  }, {}], 5: [function (require, module, exports) {
    'use strict';

    var editors = require('./4dev/editors-interface');
    require('./4dev/editors-link')(editors);
    var editorsCursor = require('./4dev/editors-cursor');
    editorsCursor.listener(editors);

    $('select').material_select();

    liff.init(function (data) {
      $('#btn').click(function () {
        liff.sendMessages([{
          type: 'text',
          text: "Test Message"
        }, {
          type: 'sticker',
          packageId: '2',
          stickerId: '144'
        }]).then(function () {}).catch(function (error) {
          console.log("Error sending message: " + error);
        });
      });
    });

    /*
    const toolsJq = $('#tools');
    const mvToolsJq = $('#mvTools');
    
    
    mvToolsJq.draggable({
      drag: (event, ui) => {
        toolsJq.css('top', ui.offset.top + mvToolsJq.height());
        toolsJq.css('left', ui.offset.left - (toolsJq.width()/2) + mvToolsJq.width());
      },
      create: (event, ui) => {
        toolsJq.css('top', mvToolsJq.offset().top + mvToolsJq.height());
        toolsJq.css('left', mvToolsJq.offset().left - (toolsJq.width()/2) + mvToolsJq.width());
      },
      containment: 'html'
    });
    */

    var modeSelector = $('#modeSelector');
    modeSelector.change(function () {
      editors.otherModeHide(modeSelector.val());
    });

    var fileSelector = $('#fileSelector');
    fileSelector.change(function () {
      editors.otherFileHide(fileSelector.val());
    });

    $('#undo').click(function () {
      if (fileSelector.val() === 'ALL') {
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = editors.langs[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var _editorLang4 = _step11.value;
            editors[_editorLang4].ace.editor.undo();
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion11 && _iterator11.return) {
              _iterator11.return();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }

        return true;
      }
      editors[fileSelector.val()].ace.editor.undo();
    });

    $('#redo').click(function () {
      if (fileSelector.val() === 'ALL') {
        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
          for (var _iterator12 = editors.langs[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var _editorLang5 = _step12.value;
            editors[_editorLang5].ace.editor.redo();
          }
        } catch (err) {
          _didIteratorError12 = true;
          _iteratorError12 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion12 && _iterator12.return) {
              _iterator12.return();
            }
          } finally {
            if (_didIteratorError12) {
              throw _iteratorError12;
            }
          }
        }

        return true;
      }
      editors[fileSelector.val()].ace.editor.redo();
    });

    var beautifyOp = { indent_size: 2, space_in_empty_paren: true };

    $('#auto').click(function () {
      switch (fileSelector.val()) {
        case 'HTML':
          editors[fileSelector.val()].simple.jq.val(html_beautify(editors[fileSelector.val()].simple.jq.val(), beautifyOp));
          break;
        case 'CSS':
          editors[fileSelector.val()].simple.jq.val(css_beautify(editors[fileSelector.val()].simple.jq.val(), beautifyOp));
          break;
        case 'JS':
          editors[fileSelector.val()].simple.jq.val(js_beautify(editors[fileSelector.val()].simple.jq.val(), beautifyOp));
          break;
        default:
          editors.HTML.simple.jq.val(html_beautify(editors.HTML.simple.jq.val(), beautifyOp));
          editors.CSS.simple.jq.val(css_beautify(editors.CSS.simple.jq.val(), beautifyOp));
          editors.JS.simple.jq.val(js_beautify(editors.JS.simple.jq.val(), beautifyOp));
          break;
      }
    });

    var symbolSelector = $('#symbolSelector');

    symbolSelector.change(function () {
      var editorVal = '',
          beforeVal = '',
          afterVal = '';var cursorInf = editorsCursor.inf();switch (cursorInf.type) {
        case 'textarea':
          editorVal = editors[cursorInf.editorLang][cursorInf.editorKind].jq.val();
          beforeVal = editorVal.substr(0, cursorInf.pos);
          afterVal = editorVal.substr(cursorInf.pos, editorVal.length);
          editors[cursorInf.editorLang][cursorInf.editorKind].jq.val(beforeVal + symbolSelector.val() + afterVal);
          break;
        case 'ace':
          editorVal = editors[cursorInf.editorLang][cursorInf.editorKind].editor.getValue();
          var editorValLines = /\n/.test(editorVal) ? editorVal.split('\n') : [editorVal];
          var targetLine = editorValLines[cursorInf.pos.row];
          beforeVal = targetLine.substr(0, cursorInf.pos.column);
          afterVal = targetLine.substr(cursorInf.pos.column, targetLine.length);
          editorValLines[cursorInf.pos.row] = beforeVal + symbolSelector.val() + afterVal;
          editors[cursorInf.editorLang][cursorInf.editorKind].editor.setValue(editorValLines.join('\n'));
          break;
      }symbolSelector.val('');
    });

    var findReplace = $('#findReplace');

    findReplace.click(function () {});

    console.log(300);

    editors.HTML.simple.jq.val('<!DOCTYPE html>\n' + '<html lang="en">\n' + '<head>\n' + '    <meta charset="UTF-8">\n' + '    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP" rel="stylesheet" />\n' + '    <link rel="stylesheet" href="./main.css" />\n' + '    <title>PockeYobi</title>\n' + '    <script>\n' + '      window.jQuery = window.$ = require(\'./jquery-3.3.1.min.js\');\n' + '      const open = require(\'open\');\n' + '    </script>\n' + '</head>\n' + '<body>\n' + '<main>\n' + '  <div id="confirmConsent">\n' + '      <h1>Terms of use</h1>\n' + '      <ul>\n' + '          <li>\n' + '              <span>This "pockeYobi" is the application for support for user of "<a href="javascript:open(\'https://nnn.ed.nico/\')" target="_blank">nnn.ed.nico</a>" .</span>\n' + '          </li>\n' + '          <li>\n' + '              <span>We can\'t take any responsible for your using this application.</span>\n' + '              <span> In advance please forgive.</span>\n' + '          </li>\n' + '      </ul>\n' + '  </div>\n' + '  <div class="area">\n' + '      <h1>Settings</h1>\n' + '      <ul>\n' + '          <li>\n' + '              <span>Email or Phone Number *</span><a href="javascript:open(\'https://nicovideo.jp/\')" target="_blank">nicovideo.jp</a>\n' + '              <div>\n' + '                  <input id="emailOrPhone" required="" type="text">\n' + '              </div>\n' + '          </li>\n' + '          <li>\n' + '              <span>Password</span>\n' + '              <div><input id="password" required="" type="password"></div>\n' + '          </li>\n' + '          <!-- li>\n' + '              <span>Headless</span>\n' + '              <label class="checkbox"><input id="headless" required="" type="checkbox"><span></span></label>\n' + '          </li -->\n' + '          <li>\n' + '              <span>Chapter or course url *https://www.nnn.ed.nico/courses/xxx/chapters/yyy</span>\n' + '              <div><input id="chapterUrl" required="" type="url"></div>\n' + '          </li>\n' + '      </ul>\n' + '      <div id="importBtn" class="btn"><span class="text">IMPORT</span></div>\n' + '  </div>\n' + '</main>\n' + '\n' + '<script>\n' + '  const {ipcRenderer} = require(\'electron\');\n' + '\n' + '  $(\'#importBtn\').click(()=>{\n' + '    ipcRenderer.send(\'import\', {\n' + '      emailOrPhone: $(\'#emailOrPhone\').val().trim(),\n' + '      password: $(\'#password\').val().trim(),\n' + '      power: parseFloat($(\'#power\').val()),\n' + '      headless: false/*$(\'#headless\').prop(\'checked\')*/,\n' + '      chapterUrl: $(\'#chapterUrl\').val().trim()\n' + '    });\n' + '  });\n' + '</script>\n' + '</body>\n' + '</html>\n');

    editors.CSS.simple.jq.val('body {\n' + '  padding: 50px;\n' + '  box-sizing: border-box;\n' + '  margin: 0;\n' + '  font-size: 13px;\n' + '  white-space: nowrap;\n' + '}\n' + '\n' + '*{\n' + '  font-family: \'Inter UI\', \'Noto Sans JP\', sans-serif;\n' + '}\n' + '\n' + 'main{\n' + '  max-width: 1024px;\n' + '  margin: 0 auto;\n' + '}\n' + '\n' + 'h1{\n' + '  font-size: 15px;\n' + '}\n' + '\n' + 'a {\n' + '  color: #00B7FF;\n' + '}\n' + '\n' + 'hr {\n' + '  width: 100%;\n' + '}\n' + '\n' + 'ul{\n' + '  padding: 0;\n' + '  list-style: none;\n' + '}\n' + '\n' + 'li:first-of-type{\n' + '  margin-bottom: 20px;\n' + '}\n' + '\n' + 'ul > li{\n' + '  margin-bottom: 50px;\n' + '}\n' + '\n' + '#confirmConsent #agreeBtn {\n' + '  font-size: 1.2em;\n' + '  text-align: center;\n' + '  -webkit-transition: all 0.1s linear;\n' + '  transition: all 0.1s linear;\n' + '}\n' + '\n' + '#confirmConsent #agreeBtn:hover {\n' + '  color: white;\n' + '  background-color: black;\n' + '}\n' + '\n' + '.area input {\n' + '  border-top: 0;\n' + '  border-left: 0;\n' + '  border-right: 0;\n' + '  border-bottom: 1px solid black;\n' + '  background-color: rgba(0, 0, 0, 0);\n' + '  font-size: 1.1em;\n' + '  width: 100%;\n' + '  transition: all 0.2s ease;\n' + '  line-height: 30px;\n' + '  font-size: 17px;\n' + '  box-sizing: border-box;\n' + '  padding: 2px 8px;\n' + '  margin-top: 10px;\n' + '  outline: none;\n' + '}\n' + '\n' + '.area input:focus{\n' + '  background-color: #e5e5e5;\n' + '}\n' + '\n' + '.area #browserCount {\n' + '  width: 3em;\n' + '  margin-right: 1.5em;\n' + '}\n' + '\n' + '.btn {\n' + '  position: relative;\n' + '  display: block;\n' + '  width: 160px;\n' + '  height: 50px;\n' + '  margin: 0 auto;\n' + '  background-color: #fafafa;\n' + '  text-align: center;\n' + '  transition: 0.2s ease;\n' + '  cursor: pointer;\n' + '  overflow: hidden;\n' + '  transition: 0.1s ease;\n' + '  transform: translate(0px, 0px);\n' + '  box-shadow: 1px 2px 1px 1px #dbdbdb;\n' + '  border-radius: 0px;\n' + '}\n' + '\n' + '.text{\n' + '  box-sizing: border-box;\n' + '  line-height: 50px;\n' + '  font-size: 16px;\n' + '  overflow: hidden;\n' + '  transform: rotateZ(0deg);\n' + '}\n' + '\n' + '.btn:hover{\n' + '  transform: translate(1px, 2px);\n' + '  box-shadow: 0px 0px 1px 1px #dbdbdb;\n' + '}\n' + '\n' + '.btn:active{\n' + '  border-radius: 12px;\n' + '}\n' + '\n' + '.checkbox > span {\n' + '  padding: 3px;\n' + '  position:relative;\n' + '}\n' + '.checkbox > span::before {\n' + '  content: "";\n' + '  display: inline-block;\n' + '  position: absolute;\n' + '  width: 1em;\n' + '  height: 1em;\n' + '  border: medium dotted black;\n' + '}\n' + '.checkbox > span:hover::before {\n' + '  border: solid 3.5px black\n' + '}\n' + '.checkbox > input:checked + span::after{\n' + '  content: "";\n' + '  display: inline-block;\n' + '  position: absolute;\n' + '  top: -0.15em;\n' + '  left: 0.5em;\n' + '  width: 7px;\n' + '  height: 14px;\n' + '  transform: rotate(40deg);\n' + '  border-bottom: 3px solid black;\n' + '  border-right: 3px solid black;\n' + '}\n' + '\n' + '.checkbox > input {\n' + '  display: none;\n' + '}\n' + '\n' + '@import url(\'https://rsms.me/inter/inter-ui.css\');\n');

    editors.JS.simple.jq.val('\'use strict\';\n' + 'const {app, BrowserWindow, ipcMain, Menu} = require(\'electron\');\n' + 'const path = require(\'path\');\n' + 'const fs = require(\'fs-extra\');\n' + 'const puppeteer = require(\'puppeteer\');\n' + 'const notifier = require(\'node-notifier\');\n' + 'const delay = require(\'delay\');\n' + 'const open = require(\'open\');\n' + '\n' + 'const HOME = process.env[(process.platform === \'win32\') ? \'USERPROFILE\' : \'HOME\'];\n' + 'const DESKTOP = path.join(HOME, \'Desktop\');\n' + 'const VACUUM = path.join(DESKTOP, \'PockeYobi\');\n' + '\n' + 'let mainWindow = null;\n' + 'app.on(\'ready\', ()=>{\n' + '  const template = [\n' + '    {\n' + '      label: \'Edit\',\n' + '      submenu: [\n' + '        {role: \'undo\'},\n' + '        {role: \'redo\'},\n' + '        {type: \'separator\'},\n' + '        {role: \'cut\'},\n' + '        {role: \'copy\'},\n' + '        {role: \'paste\'},\n' + '        {role: \'pasteandmatchstyle\'},\n' + '        {role: \'delete\'},\n' + '        {role: \'selectall\'}\n' + '      ]\n' + '    },\n' + '    {\n' + '      label: \'View\',\n' + '      submenu: [\n' + '        {role: \'reload\'},\n' + '        {role: \'forcereload\'},\n' + '        {role: \'toggledevtools\'},\n' + '        {type: \'separator\'},\n' + '        {role: \'resetzoom\'},\n' + '        {role: \'zoomin\'},\n' + '        {role: \'zoomout\'},\n' + '        {type: \'separator\'},\n' + '        {role: \'togglefullscreen\'}\n' + '      ]\n' + '    },\n' + '    {\n' + '      role: \'window\',\n' + '      submenu: [\n' + '        {role: \'minimize\'},\n' + '        {role: \'close\'}\n' + '      ]\n' + '    },\n' + '    {\n' + '      role: \'help\',\n' + '      submenu: [\n' + '        {\n' + '          label: \'Learn More\',\n' + '          click () { require(\'electron\').shell.openExternal(\'https://electronjs.org\') }\n' + '        }\n' + '      ]\n' + '    }\n' + '  ];\n' + '\n' + '  if (process.platform === \'darwin\') {\n' + '    template.unshift({\n' + '      label: app.getName(),\n' + '      submenu: [\n' + '        {role: \'about\'},\n' + '        {type: \'separator\'},\n' + '        {role: \'services\', submenu: []},\n' + '        {type: \'separator\'},\n' + '        {role: \'hide\'},\n' + '        {role: \'hideothers\'},\n' + '        {role: \'unhide\'},\n' + '        {type: \'separator\'},\n' + '        {role: \'quit\'}\n' + '      ]\n' + '    });\n' + '\n' + '    // Edit menu\n' + '    template[1].submenu.push(\n' + '      {type: \'separator\'},\n' + '      {\n' + '        label: \'Speech\',\n' + '        submenu: [\n' + '          {role: \'startspeaking\'},\n' + '          {role: \'stopspeaking\'}\n' + '        ]\n' + '      }\n' + '    );\n' + '\n' + '    // Window menu\n' + '    template[3].submenu = [\n' + '      {role: \'close\'},\n' + '      {role: \'minimize\'},\n' + '      {role: \'zoom\'},\n' + '      {type: \'separator\'},\n' + '      {role: \'front\'}\n' + '    ];\n' + '  }\n' + '  const menu = Menu.buildFromTemplate(template);\n' + '  Menu.setApplicationMenu(menu);\n' + '  mainWindow = new BrowserWindow({width: 600, height: 700});\n' + '  mainWindow.loadURL(`file://${__dirname}/ui/index.html`);\n' + '  mainWindow.on(\'closed\', ()=>{ mainWindow = null; });\n' + '  // mainWindow.webContents.openDevTools();\n' + '});\n' + '\n' + 'let browsers = [];\n' + '\n' + 'const unLogin = ()=>{\n' + '  notifier.notify({\n' + '    title: \'PockeYobi\',\n' + '    message: \'(/_;) Login failed!\',\n' + '    icon: path.join(__dirname, \'icon.png\'),\n' + '    sound: true\n' + '  });\n' + '  process.exit(0);\n' + '};\n' + '\n' + 'let finishChapterCount = 0;\n' + '\n' + 'const subOpen = async (targetIndex, browserI, progressExistsCount, chapterUrl, COURSE)=>{\n' + '  const subPage = await browsers[browserI][\'browser\'].newPage();\n' + '  await subPage.goto(chapterUrl, {waitUntil:\'networkidle2\'});\n' + '  await subPage.waitFor(\'.typo-page-title.p-chapters-title\');\n' + '  await subPage.evaluate(targetIndex=>{\n' + '    $(`.primary:not(.primary[style="width: 0%;"]):eq(${targetIndex})`).click();\n' + '  }, targetIndex);\n' + '  await subPage.waitForNavigation({waitUntil:"networkidle2"});\n' + '  await subPage.waitFor(\'.l-contents-wrapper\');\n' + '  const chapterInf = JSON.parse(await subPage.evaluate(()=>{\n' + '    return $(\'.l-contents-wrapper>div:eq(1)\').attr(\'data-react-props\');\n' + '  }));\n' + '  const CHAPTER = path.join(COURSE, chapterInf.chapter.chapter.title.replace(/\\//g,\'__\').replace(/#/g,\'--\'));\n' + '  fs.mkdirs(CHAPTER);\n' + '  for(let section of chapterInf.chapter.chapter.sections){\n' + '    if(!section.passed || section.resource_type === \'movie\') continue;\n' + '    await subPage.goto(section.content_url, {waitUntil:\'networkidle2\'});\n' + '    await subPage.waitFor(\'.resource-title\');\n' + '    const pageData = await subPage.evaluate(()=>{\n' + '      const html = document.getElementsByTagName(\'html\')[0].cloneNode(true);\n' + '      const nodes = html.querySelectorAll(\'[href],[src]\');\n' + '      for (let i=0, n=nodes.length; i<n; i++) {\n' + '        if (nodes[i].href) { nodes[i].href=nodes[i].href; }\n' + '        if (nodes[i].src) { nodes[i].src=nodes[i].src; }\n' + '      }\n' + '      const src = html.innerHTML;\n' + '      const name     = document.doctype.name;\n' + '      const publicId = document.doctype.publicId;\n' + '      const systemID = document.doctype.systemId;\n' + '      const doctype  = `<!DOCTYPE ${name}${publicId ? \' PUBLIC "\' + publicId + \'"\' : \'\'}${systemID ? \' "\' + systemID + \'"\' : \'\'}>`;\n' + '      let htmlTag = \'<html\';\n' + '      const attrs = html.attributes;\n' + '      for (let i=0, n=attrs.length; i<n; i++) {\n' + '        const attr = attrs[i];\n' + '        htmlTag += ` ${attr.nodeName}${attr.nodeValue ? \'="\' + attr.nodeValue + \'"\' : \'\'}`;\n' + '      }\n' + '      htmlTag += \'>\';\n' + '      return `${doctype}\\n${htmlTag}\\n${src}\\n</html>`;\n' + '    });\n' + '    fs.writeFileSync(path.join(CHAPTER, `${section.title.replace(/\\//g,\'__\').replace(/#/g,\'--\')}.html`), pageData);\n' + '  }\n' + '  await subPage.close();\n' + '  finishChapterCount++;\n' + '  if(finishChapterCount === progressExistsCount){\n' + '    await notifier.notify({\n' + '      title: \'PockeYobi\',\n' + '      message: \'Import finish! Σ(ﾟ∀ﾟﾉ)ﾉ\',\n' + '      icon: path.join(__dirname, \'icon.png\'),\n' + '      sound: true\n' + '    });\n' + '    await browsers[browserI][\'page\'].close();\n' + '    await browsers[browserI][\'browser\'].close();\n' + '    browsers[browserI][\'using\'] = false;\n' + '  }\n' + '\n' + '};\n' + '\n' + 'const loginSequenceFinish = async (chapterUrl, browserI)=>{\n' + '  chapterUrl = chapterUrl.replace(/\\/$/, \'\');\n' + '  let chapterUrlArr = chapterUrl.split(\'/\');\n' + '  if(chapterUrlArr.length === 6){\n' + '    const courseUrl = chapterUrlArr.join(\'/\');\n' + '    await browsers[browserI][\'page\'].goto(courseUrl, {waitUntil:\'networkidle2\'});\n' + '    await browsers[browserI][\'page\'].waitFor(\'.ny-ci\');\n' + '    const progressExistsCount = await browsers[browserI][\'page\'].evaluate(()=>{\n' + '      return $(\'.primary:not(.primary[style="width: 0%;"])\').length;\n' + '    });\n' + '    const courseTitle = await browsers[browserI][\'page\'].evaluate(()=>{\n' + '      return $(\'.u-breadcrumbs>li:eq(1)\').text();\n' + '    });\n' + '    const COURSE = path.join(VACUUM, courseTitle.replace(/\\//g,\'__\').replace(/#/g,\'--\'));\n' + '    fs.mkdirs(COURSE);\n' + '    await notifier.notify({\n' + '      title: \'PockeYobi\',\n' + '      message: \'Import start! 💪\',\n' + '      icon: path.join(__dirname, \'icon.png\'),\n' + '      sound: true\n' + '    });\n' + '    finishChapterCount = 0;\n' + '    for(let i=0;i<progressExistsCount;i++) subOpen(i, browserI, progressExistsCount, chapterUrl, COURSE);\n' + '    return;\n' + '  }\n' + '  await browsers[browserI][\'page\'].goto(chapterUrl, {waitUntil:\'networkidle2\'});\n' + '  await browsers[browserI][\'page\'].waitFor(\'.ny-ci\');\n' + '  await notifier.notify({\n' + '    title: \'PockeYobi\',\n' + '    message: \'Viewing start! 💪\',\n' + '    icon: path.join(__dirname, \'icon.png\'),\n' + '    sound: true\n' + '  });\n' + '  await browsers[browserI][\'page\'].evaluate(()=>{setInterval(()=>{$(\'.movie:not(.good)\').eq(0).find(\'.typo-list-item-title\').click();}, 1000);});\n' + '  let chapterView = await browsers[browserI][\'page\'].evaluate(()=>{\n' + '    const notGoodMv = $(\'.movie\').not(\'.good\');\n' + '    if(notGoodMv.length === 0) return false;\n' + '    return notGoodMv.eq(0).prev().length === 0 || /^(movie|(evaluation|essay)-test) good$/.test(notGoodMv.eq(0).prev().prop(\'class\'))\n' + '  });\n' + '  while(chapterView){\n' + '    await delay(1000);\n' + '    chapterView = await browsers[browserI][\'page\'].evaluate(()=>{\n' + '      const notGoodMv = $(\'.movie\').not(\'.good\');\n' + '      if(notGoodMv.length === 0) return false;\n' + '      return notGoodMv.eq(0).prev().length === 0 || /^(movie|(evaluation|essay)-test) good$/.test(notGoodMv.eq(0).prev().prop(\'class\'))\n' + '    });\n' + '  }\n' + '  await notifier.notify({\n' + '    title: \'PockeYobi\',\n' + '    message: \'Viewing finish! Σ(ﾟ∀ﾟﾉ)ﾉ\',\n' + '    icon: path.join(__dirname, \'icon.png\'),\n' + '    sound: true\n' + '  });\n' + '  await open(chapterUrl);\n' + '  await browsers[browserI][\'page\'].close();\n' + '  await browsers[browserI][\'browser\'].close();\n' + '  browsers[browserI][\'using\'] = false;\n' + '};\n' + '\n' + 'ipcMain.on(\'import\', async (event, settings)=>{\n' + '  if(settings.chapterUrl === \'\' || settings.emailOrPhone === \'\' || settings.password === \'\') return;\n' + '  const browserI = browsers.length;\n' + '  browsers[browserI] = {};\n' + '  browsers[browserI][\'browser\'] = await puppeteer.launch({\n' + '    headless: settings.headless,\n' + '    args: [\'--window-size=550,550\'],\n' + '    ignoreDefaultArgs: [\'--mute-audio\']\n' + '  });\n' + '  browsers[browserI][\'page\'] = await browsers[browserI][\'browser\'].newPage();\n' + '  browsers[browserI][\'using\'] = true;\n' + '  await browsers[browserI][\'page\'].setRequestInterception(true);\n' + '  await browsers[browserI][\'page\'].on(\'request\', interceptedRequest=>{\n' + '    const interceptedRequestUrl = interceptedRequest.url();\n' + '    if(interceptedRequestUrl.endsWith(\'.mp4\')||interceptedRequestUrl.endsWith(\'.png\')||interceptedRequestUrl.endsWith(\'.jpg\')||interceptedRequestUrl.endsWith(\'.jpeg\')||interceptedRequestUrl.endsWith(\'.jpg:small\')||interceptedRequestUrl.endsWith(\'.gif\')||interceptedRequestUrl.endsWith(\'.ico\')||interceptedRequestUrl.endsWith(\'.svg\')||interceptedRequestUrl.endsWith(\'.woff\')){\n' + '      interceptedRequest.abort();\n' + '    }else{\n' + '      interceptedRequest.continue();\n' + '    }\n' + '  });\n' + '  await browsers[browserI][\'page\'].goto(\'https://www.nnn.ed.nico/home\', {waitUntil:\'networkidle2\'});\n' + '  await browsers[browserI][\'page\'].waitFor(\'.login>div>a\');\n' + '  await browsers[browserI][\'page\'].click(\'.login>div>a\', {waitUntil:"networkidle2"});\n' + '  await browsers[browserI][\'page\'].waitFor(\'#input__mailtel\');\n' + '  await browsers[browserI][\'page\'].type(\'#input__mailtel\', settings.emailOrPhone);\n' + '  await browsers[browserI][\'page\'].type(\'#input__password\', settings.password);\n' + '  await browsers[browserI][\'page\'].click(\'#login__submit\', {waitUntil:"networkidle2"});\n' + '  await delay(3000);\n' + '  await browsers[browserI][\'page\'].goto(\'https://www.nnn.ed.nico/home\', {waitUntil:\'networkidle2\'});\n' + '  await browsers[browserI][\'page\'].waitFor(\'.login>div>a\');\n' + '  await browsers[browserI][\'page\'].click(\'.login>div>a\', {waitUntil:"networkidle2"});\n' + '  await delay(3000);\n' + '  await browsers[browserI][\'page\'].goto(\'https://www.nnn.ed.nico/contents/guides/2520/content\', {waitUntil:\'networkidle2\'});\n' + '  const perMsg = await browsers[browserI][\'page\'].evaluate(()=>{return document.getElementsByClassName(\'permission-message\').length});\n' + '  if(perMsg === 1) return unLogin();\n' + '  await loginSequenceFinish(settings.chapterUrl, browserI);\n' + '});');
  }, { "./4dev/editors-cursor": 1, "./4dev/editors-interface": 3, "./4dev/editors-link": 4 }] }, {}, [5]);
