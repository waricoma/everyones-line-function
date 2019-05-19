'use strict';

const editors = require('./4dev/editors-interface');
require('./4dev/editors-link')(editors);
const editorsCursor = require('./4dev/editors-cursor');
editorsCursor.listener(editors);

$('select').material_select();

liff.init(data => {
  $('#btn').click(() => {
    liff.sendMessages([{
      type: 'text',
      text: "Test Message"
    }, {
      type: 'sticker',
      packageId: '2',
      stickerId: '144'
    }]).then(() => {

    }).catch(error => {
      console.log(`Error sending message: ${error}`);
    });
  });
});


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

const modeSelector = $('#modeSelector');
modeSelector.change(() => { editors.otherModeHide(modeSelector.val()); });

const fileSelector = $('#fileSelector');
fileSelector.change(() => { editors.otherFileHide(fileSelector.val()); });

$('#undo').click(() => {
  if(fileSelector.val() === 'ALL') {
    for (let editorLang of editors.langs) editors[editorLang].ace.editor.undo();
    return true;
  }
  editors[fileSelector.val()].ace.editor.undo();
});

$('#redo').click(() => {
  if(fileSelector.val() === 'ALL') {
    for (let editorLang of editors.langs) editors[editorLang].ace.editor.redo();
    return true;
  }
  editors[fileSelector.val()].ace.editor.redo();
});

const beautifyOp = { indent_size: 2, space_in_empty_paren: true };

$('#auto').click(() => { switch (fileSelector.val()) {
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
}});

const symbolSelector = $('#symbolSelector');

symbolSelector.change(() => { let editorVal = '', beforeVal = '', afterVal = ''; const cursorInf = editorsCursor.inf(); switch (cursorInf.type) {
  case 'textarea':
    editorVal = editors[cursorInf.editorLang][cursorInf.editorKind].jq.val();
    beforeVal = editorVal.substr(0, cursorInf.pos);
    afterVal = editorVal.substr(cursorInf.pos, editorVal.length);
    editors[cursorInf.editorLang][cursorInf.editorKind].jq.val(beforeVal + symbolSelector.val() + afterVal);
    break;
  case 'ace':
    editorVal = editors[cursorInf.editorLang][cursorInf.editorKind].editor.getValue();
    let editorValLines = /\n/.test(editorVal) ? editorVal.split('\n') : [editorVal];
    const targetLine = editorValLines[cursorInf.pos.row];
    beforeVal = targetLine.substr(0, cursorInf.pos.column);
    afterVal = targetLine.substr(cursorInf.pos.column, targetLine.length);
    editorValLines[cursorInf.pos.row] = beforeVal + symbolSelector.val() + afterVal;
    editors[cursorInf.editorLang][cursorInf.editorKind].editor.setValue(editorValLines.join('\n'));
    break;
} symbolSelector.val('') });

const findReplace = $('#findReplace');

findReplace.click(() => {

});



editors.HTML.simple.jq.val('<!DOCTYPE html>\n' +
  '<html lang="en">\n' +
  '<head>\n' +
  '    <meta charset="UTF-8">\n' +
  '    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP" rel="stylesheet" />\n' +
  '    <link rel="stylesheet" href="./main.css" />\n' +
  '    <title>PockeYobi</title>\n' +
  '    <script>\n' +
  '      window.jQuery = window.$ = require(\'./jquery-3.3.1.min.js\');\n' +
  '      const open = require(\'open\');\n' +
  '    </script>\n' +
  '</head>\n' +
  '<body>\n' +
  '<main>\n' +
  '  <div id="confirmConsent">\n' +
  '      <h1>Terms of use</h1>\n' +
  '      <ul>\n' +
  '          <li>\n' +
  '              <span>This "pockeYobi" is the application for support for user of "<a href="javascript:open(\'https://nnn.ed.nico/\')" target="_blank">nnn.ed.nico</a>" .</span>\n' +
  '          </li>\n' +
  '          <li>\n' +
  '              <span>We can\'t take any responsible for your using this application.</span>\n' +
  '              <span> In advance please forgive.</span>\n' +
  '          </li>\n' +
  '      </ul>\n' +
  '  </div>\n' +
  '  <div class="area">\n' +
  '      <h1>Settings</h1>\n' +
  '      <ul>\n' +
  '          <li>\n' +
  '              <span>Email or Phone Number *</span><a href="javascript:open(\'https://nicovideo.jp/\')" target="_blank">nicovideo.jp</a>\n' +
  '              <div>\n' +
  '                  <input id="emailOrPhone" required="" type="text">\n' +
  '              </div>\n' +
  '          </li>\n' +
  '          <li>\n' +
  '              <span>Password</span>\n' +
  '              <div><input id="password" required="" type="password"></div>\n' +
  '          </li>\n' +
  '          <!-- li>\n' +
  '              <span>Headless</span>\n' +
  '              <label class="checkbox"><input id="headless" required="" type="checkbox"><span></span></label>\n' +
  '          </li -->\n' +
  '          <li>\n' +
  '              <span>Chapter or course url *https://www.nnn.ed.nico/courses/xxx/chapters/yyy</span>\n' +
  '              <div><input id="chapterUrl" required="" type="url"></div>\n' +
  '          </li>\n' +
  '      </ul>\n' +
  '      <div id="importBtn" class="btn"><span class="text">IMPORT</span></div>\n' +
  '  </div>\n' +
  '</main>\n' +
  '\n' +
  '<script>\n' +
  '  const {ipcRenderer} = require(\'electron\');\n' +
  '\n' +
  '  $(\'#importBtn\').click(()=>{\n' +
  '    ipcRenderer.send(\'import\', {\n' +
  '      emailOrPhone: $(\'#emailOrPhone\').val().trim(),\n' +
  '      password: $(\'#password\').val().trim(),\n' +
  '      power: parseFloat($(\'#power\').val()),\n' +
  '      headless: false/*$(\'#headless\').prop(\'checked\')*/,\n' +
  '      chapterUrl: $(\'#chapterUrl\').val().trim()\n' +
  '    });\n' +
  '  });\n' +
  '</script>\n' +
  '</body>\n' +
  '</html>\n');

editors.CSS.simple.jq.val('body {\n' +
  '  padding: 50px;\n' +
  '  box-sizing: border-box;\n' +
  '  margin: 0;\n' +
  '  font-size: 13px;\n' +
  '  white-space: nowrap;\n' +
  '}\n' +
  '\n' +
  '*{\n' +
  '  font-family: \'Inter UI\', \'Noto Sans JP\', sans-serif;\n' +
  '}\n' +
  '\n' +
  'main{\n' +
  '  max-width: 1024px;\n' +
  '  margin: 0 auto;\n' +
  '}\n' +
  '\n' +
  'h1{\n' +
  '  font-size: 15px;\n' +
  '}\n' +
  '\n' +
  'a {\n' +
  '  color: #00B7FF;\n' +
  '}\n' +
  '\n' +
  'hr {\n' +
  '  width: 100%;\n' +
  '}\n' +
  '\n' +
  'ul{\n' +
  '  padding: 0;\n' +
  '  list-style: none;\n' +
  '}\n' +
  '\n' +
  'li:first-of-type{\n' +
  '  margin-bottom: 20px;\n' +
  '}\n' +
  '\n' +
  'ul > li{\n' +
  '  margin-bottom: 50px;\n' +
  '}\n' +
  '\n' +
  '#confirmConsent #agreeBtn {\n' +
  '  font-size: 1.2em;\n' +
  '  text-align: center;\n' +
  '  -webkit-transition: all 0.1s linear;\n' +
  '  transition: all 0.1s linear;\n' +
  '}\n' +
  '\n' +
  '#confirmConsent #agreeBtn:hover {\n' +
  '  color: white;\n' +
  '  background-color: black;\n' +
  '}\n' +
  '\n' +
  '.area input {\n' +
  '  border-top: 0;\n' +
  '  border-left: 0;\n' +
  '  border-right: 0;\n' +
  '  border-bottom: 1px solid black;\n' +
  '  background-color: rgba(0, 0, 0, 0);\n' +
  '  font-size: 1.1em;\n' +
  '  width: 100%;\n' +
  '  transition: all 0.2s ease;\n' +
  '  line-height: 30px;\n' +
  '  font-size: 17px;\n' +
  '  box-sizing: border-box;\n' +
  '  padding: 2px 8px;\n' +
  '  margin-top: 10px;\n' +
  '  outline: none;\n' +
  '}\n' +
  '\n' +
  '.area input:focus{\n' +
  '  background-color: #e5e5e5;\n' +
  '}\n' +
  '\n' +
  '.area #browserCount {\n' +
  '  width: 3em;\n' +
  '  margin-right: 1.5em;\n' +
  '}\n' +
  '\n' +
  '.btn {\n' +
  '  position: relative;\n' +
  '  display: block;\n' +
  '  width: 160px;\n' +
  '  height: 50px;\n' +
  '  margin: 0 auto;\n' +
  '  background-color: #fafafa;\n' +
  '  text-align: center;\n' +
  '  transition: 0.2s ease;\n' +
  '  cursor: pointer;\n' +
  '  overflow: hidden;\n' +
  '  transition: 0.1s ease;\n' +
  '  transform: translate(0px, 0px);\n' +
  '  box-shadow: 1px 2px 1px 1px #dbdbdb;\n' +
  '  border-radius: 0px;\n' +
  '}\n' +
  '\n' +
  '.text{\n' +
  '  box-sizing: border-box;\n' +
  '  line-height: 50px;\n' +
  '  font-size: 16px;\n' +
  '  overflow: hidden;\n' +
  '  transform: rotateZ(0deg);\n' +
  '}\n' +
  '\n' +
  '.btn:hover{\n' +
  '  transform: translate(1px, 2px);\n' +
  '  box-shadow: 0px 0px 1px 1px #dbdbdb;\n' +
  '}\n' +
  '\n' +
  '.btn:active{\n' +
  '  border-radius: 12px;\n' +
  '}\n' +
  '\n' +
  '.checkbox > span {\n' +
  '  padding: 3px;\n' +
  '  position:relative;\n' +
  '}\n' +
  '.checkbox > span::before {\n' +
  '  content: "";\n' +
  '  display: inline-block;\n' +
  '  position: absolute;\n' +
  '  width: 1em;\n' +
  '  height: 1em;\n' +
  '  border: medium dotted black;\n' +
  '}\n' +
  '.checkbox > span:hover::before {\n' +
  '  border: solid 3.5px black\n' +
  '}\n' +
  '.checkbox > input:checked + span::after{\n' +
  '  content: "";\n' +
  '  display: inline-block;\n' +
  '  position: absolute;\n' +
  '  top: -0.15em;\n' +
  '  left: 0.5em;\n' +
  '  width: 7px;\n' +
  '  height: 14px;\n' +
  '  transform: rotate(40deg);\n' +
  '  border-bottom: 3px solid black;\n' +
  '  border-right: 3px solid black;\n' +
  '}\n' +
  '\n' +
  '.checkbox > input {\n' +
  '  display: none;\n' +
  '}\n' +
  '\n' +
  '@import url(\'https://rsms.me/inter/inter-ui.css\');\n');

editors.JS.simple.jq.val('\'use strict\';\n' +
  'const {app, BrowserWindow, ipcMain, Menu} = require(\'electron\');\n' +
  'const path = require(\'path\');\n' +
  'const fs = require(\'fs-extra\');\n' +
  'const puppeteer = require(\'puppeteer\');\n' +
  'const notifier = require(\'node-notifier\');\n' +
  'const delay = require(\'delay\');\n' +
  'const open = require(\'open\');\n' +
  '\n' +
  'const HOME = process.env[(process.platform === \'win32\') ? \'USERPROFILE\' : \'HOME\'];\n' +
  'const DESKTOP = path.join(HOME, \'Desktop\');\n' +
  'const VACUUM = path.join(DESKTOP, \'PockeYobi\');\n' +
  '\n' +
  'let mainWindow = null;\n' +
  'app.on(\'ready\', ()=>{\n' +
  '  const template = [\n' +
  '    {\n' +
  '      label: \'Edit\',\n' +
  '      submenu: [\n' +
  '        {role: \'undo\'},\n' +
  '        {role: \'redo\'},\n' +
  '        {type: \'separator\'},\n' +
  '        {role: \'cut\'},\n' +
  '        {role: \'copy\'},\n' +
  '        {role: \'paste\'},\n' +
  '        {role: \'pasteandmatchstyle\'},\n' +
  '        {role: \'delete\'},\n' +
  '        {role: \'selectall\'}\n' +
  '      ]\n' +
  '    },\n' +
  '    {\n' +
  '      label: \'View\',\n' +
  '      submenu: [\n' +
  '        {role: \'reload\'},\n' +
  '        {role: \'forcereload\'},\n' +
  '        {role: \'toggledevtools\'},\n' +
  '        {type: \'separator\'},\n' +
  '        {role: \'resetzoom\'},\n' +
  '        {role: \'zoomin\'},\n' +
  '        {role: \'zoomout\'},\n' +
  '        {type: \'separator\'},\n' +
  '        {role: \'togglefullscreen\'}\n' +
  '      ]\n' +
  '    },\n' +
  '    {\n' +
  '      role: \'window\',\n' +
  '      submenu: [\n' +
  '        {role: \'minimize\'},\n' +
  '        {role: \'close\'}\n' +
  '      ]\n' +
  '    },\n' +
  '    {\n' +
  '      role: \'help\',\n' +
  '      submenu: [\n' +
  '        {\n' +
  '          label: \'Learn More\',\n' +
  '          click () { require(\'electron\').shell.openExternal(\'https://electronjs.org\') }\n' +
  '        }\n' +
  '      ]\n' +
  '    }\n' +
  '  ];\n' +
  '\n' +
  '  if (process.platform === \'darwin\') {\n' +
  '    template.unshift({\n' +
  '      label: app.getName(),\n' +
  '      submenu: [\n' +
  '        {role: \'about\'},\n' +
  '        {type: \'separator\'},\n' +
  '        {role: \'services\', submenu: []},\n' +
  '        {type: \'separator\'},\n' +
  '        {role: \'hide\'},\n' +
  '        {role: \'hideothers\'},\n' +
  '        {role: \'unhide\'},\n' +
  '        {type: \'separator\'},\n' +
  '        {role: \'quit\'}\n' +
  '      ]\n' +
  '    });\n' +
  '\n' +
  '    // Edit menu\n' +
  '    template[1].submenu.push(\n' +
  '      {type: \'separator\'},\n' +
  '      {\n' +
  '        label: \'Speech\',\n' +
  '        submenu: [\n' +
  '          {role: \'startspeaking\'},\n' +
  '          {role: \'stopspeaking\'}\n' +
  '        ]\n' +
  '      }\n' +
  '    );\n' +
  '\n' +
  '    // Window menu\n' +
  '    template[3].submenu = [\n' +
  '      {role: \'close\'},\n' +
  '      {role: \'minimize\'},\n' +
  '      {role: \'zoom\'},\n' +
  '      {type: \'separator\'},\n' +
  '      {role: \'front\'}\n' +
  '    ];\n' +
  '  }\n' +
  '  const menu = Menu.buildFromTemplate(template);\n' +
  '  Menu.setApplicationMenu(menu);\n' +
  '  mainWindow = new BrowserWindow({width: 600, height: 700});\n' +
  '  mainWindow.loadURL(`file://${__dirname}/ui/index.html`);\n' +
  '  mainWindow.on(\'closed\', ()=>{ mainWindow = null; });\n' +
  '  // mainWindow.webContents.openDevTools();\n' +
  '});\n' +
  '\n' +
  'let browsers = [];\n' +
  '\n' +
  'const unLogin = ()=>{\n' +
  '  notifier.notify({\n' +
  '    title: \'PockeYobi\',\n' +
  '    message: \'(/_;) Login failed!\',\n' +
  '    icon: path.join(__dirname, \'icon.png\'),\n' +
  '    sound: true\n' +
  '  });\n' +
  '  process.exit(0);\n' +
  '};\n' +
  '\n' +
  'let finishChapterCount = 0;\n' +
  '\n' +
  'const subOpen = async (targetIndex, browserI, progressExistsCount, chapterUrl, COURSE)=>{\n' +
  '  const subPage = await browsers[browserI][\'browser\'].newPage();\n' +
  '  await subPage.goto(chapterUrl, {waitUntil:\'networkidle2\'});\n' +
  '  await subPage.waitFor(\'.typo-page-title.p-chapters-title\');\n' +
  '  await subPage.evaluate(targetIndex=>{\n' +
  '    $(`.primary:not(.primary[style="width: 0%;"]):eq(${targetIndex})`).click();\n' +
  '  }, targetIndex);\n' +
  '  await subPage.waitForNavigation({waitUntil:"networkidle2"});\n' +
  '  await subPage.waitFor(\'.l-contents-wrapper\');\n' +
  '  const chapterInf = JSON.parse(await subPage.evaluate(()=>{\n' +
  '    return $(\'.l-contents-wrapper>div:eq(1)\').attr(\'data-react-props\');\n' +
  '  }));\n' +
  '  const CHAPTER = path.join(COURSE, chapterInf.chapter.chapter.title.replace(/\\//g,\'__\').replace(/#/g,\'--\'));\n' +
  '  fs.mkdirs(CHAPTER);\n' +
  '  for(let section of chapterInf.chapter.chapter.sections){\n' +
  '    if(!section.passed || section.resource_type === \'movie\') continue;\n' +
  '    await subPage.goto(section.content_url, {waitUntil:\'networkidle2\'});\n' +
  '    await subPage.waitFor(\'.resource-title\');\n' +
  '    const pageData = await subPage.evaluate(()=>{\n' +
  '      const html = document.getElementsByTagName(\'html\')[0].cloneNode(true);\n' +
  '      const nodes = html.querySelectorAll(\'[href],[src]\');\n' +
  '      for (let i=0, n=nodes.length; i<n; i++) {\n' +
  '        if (nodes[i].href) { nodes[i].href=nodes[i].href; }\n' +
  '        if (nodes[i].src) { nodes[i].src=nodes[i].src; }\n' +
  '      }\n' +
  '      const src = html.innerHTML;\n' +
  '      const name     = document.doctype.name;\n' +
  '      const publicId = document.doctype.publicId;\n' +
  '      const systemID = document.doctype.systemId;\n' +
  '      const doctype  = `<!DOCTYPE ${name}${publicId ? \' PUBLIC "\' + publicId + \'"\' : \'\'}${systemID ? \' "\' + systemID + \'"\' : \'\'}>`;\n' +
  '      let htmlTag = \'<html\';\n' +
  '      const attrs = html.attributes;\n' +
  '      for (let i=0, n=attrs.length; i<n; i++) {\n' +
  '        const attr = attrs[i];\n' +
  '        htmlTag += ` ${attr.nodeName}${attr.nodeValue ? \'="\' + attr.nodeValue + \'"\' : \'\'}`;\n' +
  '      }\n' +
  '      htmlTag += \'>\';\n' +
  '      return `${doctype}\\n${htmlTag}\\n${src}\\n</html>`;\n' +
  '    });\n' +
  '    fs.writeFileSync(path.join(CHAPTER, `${section.title.replace(/\\//g,\'__\').replace(/#/g,\'--\')}.html`), pageData);\n' +
  '  }\n' +
  '  await subPage.close();\n' +
  '  finishChapterCount++;\n' +
  '  if(finishChapterCount === progressExistsCount){\n' +
  '    await notifier.notify({\n' +
  '      title: \'PockeYobi\',\n' +
  '      message: \'Import finish! Σ(ﾟ∀ﾟﾉ)ﾉ\',\n' +
  '      icon: path.join(__dirname, \'icon.png\'),\n' +
  '      sound: true\n' +
  '    });\n' +
  '    await browsers[browserI][\'page\'].close();\n' +
  '    await browsers[browserI][\'browser\'].close();\n' +
  '    browsers[browserI][\'using\'] = false;\n' +
  '  }\n' +
  '\n' +
  '};\n' +
  '\n' +
  'const loginSequenceFinish = async (chapterUrl, browserI)=>{\n' +
  '  chapterUrl = chapterUrl.replace(/\\/$/, \'\');\n' +
  '  let chapterUrlArr = chapterUrl.split(\'/\');\n' +
  '  if(chapterUrlArr.length === 6){\n' +
  '    const courseUrl = chapterUrlArr.join(\'/\');\n' +
  '    await browsers[browserI][\'page\'].goto(courseUrl, {waitUntil:\'networkidle2\'});\n' +
  '    await browsers[browserI][\'page\'].waitFor(\'.ny-ci\');\n' +
  '    const progressExistsCount = await browsers[browserI][\'page\'].evaluate(()=>{\n' +
  '      return $(\'.primary:not(.primary[style="width: 0%;"])\').length;\n' +
  '    });\n' +
  '    const courseTitle = await browsers[browserI][\'page\'].evaluate(()=>{\n' +
  '      return $(\'.u-breadcrumbs>li:eq(1)\').text();\n' +
  '    });\n' +
  '    const COURSE = path.join(VACUUM, courseTitle.replace(/\\//g,\'__\').replace(/#/g,\'--\'));\n' +
  '    fs.mkdirs(COURSE);\n' +
  '    await notifier.notify({\n' +
  '      title: \'PockeYobi\',\n' +
  '      message: \'Import start! 💪\',\n' +
  '      icon: path.join(__dirname, \'icon.png\'),\n' +
  '      sound: true\n' +
  '    });\n' +
  '    finishChapterCount = 0;\n' +
  '    for(let i=0;i<progressExistsCount;i++) subOpen(i, browserI, progressExistsCount, chapterUrl, COURSE);\n' +
  '    return;\n' +
  '  }\n' +
  '  await browsers[browserI][\'page\'].goto(chapterUrl, {waitUntil:\'networkidle2\'});\n' +
  '  await browsers[browserI][\'page\'].waitFor(\'.ny-ci\');\n' +
  '  await notifier.notify({\n' +
  '    title: \'PockeYobi\',\n' +
  '    message: \'Viewing start! 💪\',\n' +
  '    icon: path.join(__dirname, \'icon.png\'),\n' +
  '    sound: true\n' +
  '  });\n' +
  '  await browsers[browserI][\'page\'].evaluate(()=>{setInterval(()=>{$(\'.movie:not(.good)\').eq(0).find(\'.typo-list-item-title\').click();}, 1000);});\n' +
  '  let chapterView = await browsers[browserI][\'page\'].evaluate(()=>{\n' +
  '    const notGoodMv = $(\'.movie\').not(\'.good\');\n' +
  '    if(notGoodMv.length === 0) return false;\n' +
  '    return notGoodMv.eq(0).prev().length === 0 || /^(movie|(evaluation|essay)-test) good$/.test(notGoodMv.eq(0).prev().prop(\'class\'))\n' +
  '  });\n' +
  '  while(chapterView){\n' +
  '    await delay(1000);\n' +
  '    chapterView = await browsers[browserI][\'page\'].evaluate(()=>{\n' +
  '      const notGoodMv = $(\'.movie\').not(\'.good\');\n' +
  '      if(notGoodMv.length === 0) return false;\n' +
  '      return notGoodMv.eq(0).prev().length === 0 || /^(movie|(evaluation|essay)-test) good$/.test(notGoodMv.eq(0).prev().prop(\'class\'))\n' +
  '    });\n' +
  '  }\n' +
  '  await notifier.notify({\n' +
  '    title: \'PockeYobi\',\n' +
  '    message: \'Viewing finish! Σ(ﾟ∀ﾟﾉ)ﾉ\',\n' +
  '    icon: path.join(__dirname, \'icon.png\'),\n' +
  '    sound: true\n' +
  '  });\n' +
  '  await open(chapterUrl);\n' +
  '  await browsers[browserI][\'page\'].close();\n' +
  '  await browsers[browserI][\'browser\'].close();\n' +
  '  browsers[browserI][\'using\'] = false;\n' +
  '};\n' +
  '\n' +
  'ipcMain.on(\'import\', async (event, settings)=>{\n' +
  '  if(settings.chapterUrl === \'\' || settings.emailOrPhone === \'\' || settings.password === \'\') return;\n' +
  '  const browserI = browsers.length;\n' +
  '  browsers[browserI] = {};\n' +
  '  browsers[browserI][\'browser\'] = await puppeteer.launch({\n' +
  '    headless: settings.headless,\n' +
  '    args: [\'--window-size=550,550\'],\n' +
  '    ignoreDefaultArgs: [\'--mute-audio\']\n' +
  '  });\n' +
  '  browsers[browserI][\'page\'] = await browsers[browserI][\'browser\'].newPage();\n' +
  '  browsers[browserI][\'using\'] = true;\n' +
  '  await browsers[browserI][\'page\'].setRequestInterception(true);\n' +
  '  await browsers[browserI][\'page\'].on(\'request\', interceptedRequest=>{\n' +
  '    const interceptedRequestUrl = interceptedRequest.url();\n' +
  '    if(interceptedRequestUrl.endsWith(\'.mp4\')||interceptedRequestUrl.endsWith(\'.png\')||interceptedRequestUrl.endsWith(\'.jpg\')||interceptedRequestUrl.endsWith(\'.jpeg\')||interceptedRequestUrl.endsWith(\'.jpg:small\')||interceptedRequestUrl.endsWith(\'.gif\')||interceptedRequestUrl.endsWith(\'.ico\')||interceptedRequestUrl.endsWith(\'.svg\')||interceptedRequestUrl.endsWith(\'.woff\')){\n' +
  '      interceptedRequest.abort();\n' +
  '    }else{\n' +
  '      interceptedRequest.continue();\n' +
  '    }\n' +
  '  });\n' +
  '  await browsers[browserI][\'page\'].goto(\'https://www.nnn.ed.nico/home\', {waitUntil:\'networkidle2\'});\n' +
  '  await browsers[browserI][\'page\'].waitFor(\'.login>div>a\');\n' +
  '  await browsers[browserI][\'page\'].click(\'.login>div>a\', {waitUntil:"networkidle2"});\n' +
  '  await browsers[browserI][\'page\'].waitFor(\'#input__mailtel\');\n' +
  '  await browsers[browserI][\'page\'].type(\'#input__mailtel\', settings.emailOrPhone);\n' +
  '  await browsers[browserI][\'page\'].type(\'#input__password\', settings.password);\n' +
  '  await browsers[browserI][\'page\'].click(\'#login__submit\', {waitUntil:"networkidle2"});\n' +
  '  await delay(3000);\n' +
  '  await browsers[browserI][\'page\'].goto(\'https://www.nnn.ed.nico/home\', {waitUntil:\'networkidle2\'});\n' +
  '  await browsers[browserI][\'page\'].waitFor(\'.login>div>a\');\n' +
  '  await browsers[browserI][\'page\'].click(\'.login>div>a\', {waitUntil:"networkidle2"});\n' +
  '  await delay(3000);\n' +
  '  await browsers[browserI][\'page\'].goto(\'https://www.nnn.ed.nico/contents/guides/2520/content\', {waitUntil:\'networkidle2\'});\n' +
  '  const perMsg = await browsers[browserI][\'page\'].evaluate(()=>{return document.getElementsByClassName(\'permission-message\').length});\n' +
  '  if(perMsg === 1) return unLogin();\n' +
  '  await loginSequenceFinish(settings.chapterUrl, browserI);\n' +
  '});');


console.log(300);
