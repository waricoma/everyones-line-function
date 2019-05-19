const toDoList: ((event: MessageEvent, eventAny: any) => void)[] = [];
const regexList: RegExp[] = [];
const router: { [key: string]: number[] } = {};
router['user'] = [];
router['group'] = [];
router['room'] = [];

export function ear(event: MessageEvent,
                    callback: (
                      event: MessageEvent,
                      eventAny: any,
                    ) => void): boolean {

  const eventAny = JSON.parse(JSON.stringify(event)); // 😢

  if (eventAny.type !== 'message') {
    callback(event, eventAny);
    return true;
  }

  for (const regexI of router[eventAny.source.type]) {
    if (!(regexList[regexI].test(eventAny.message.text))) continue;
    toDoList[regexI](event, eventAny);
    break;
  }

  callback(event, eventAny);

  return true;
}

export function hears(regex: RegExp,
                      positions: string[],
                      toDo:(
                        event: MessageEvent,
                        eventAny: any,
                      ) => void): boolean {

  if (positions.length === 0) return false;
  const isItAll = (positions.indexOf('all') !== -1);
  if (
    !isItAll
    &&
    !(Object.keys(router).some((elm) => { return (positions.indexOf(elm) !== -1); }))
  ) return false;

  const toDoListLen: number = toDoList.length;
  toDoList.push(toDo);
  regexList.push(regex);

  if (isItAll) {
    for (const position in router) router[position].push(toDoListLen);
    return true;
  }
  for (const position of positions) router[position].push(toDoListLen);

  return true;
}
