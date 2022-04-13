import { useTypedSelector as useSelector } from "./useTypesSelector";

export const useCumulativeCode = (cellId: string) => {
  return useSelector((state) => {
    // @ts-ignore
    const { data, order } = state.cells;
    const orderedcells = order.map((id: string) => data[id]);

    const showFunction = `
      import _rct from 'react';
      import _rctDOM from 'react-dom';
      var show = (value) => {
        const root = document.querySelector('#root')
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _rctDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      }
    `
    
    const showFunctionNoop = 'var show = () => {}';

    const cumulativeCode = [];
    
    for (let cell of orderedcells) {
      if (cell.type === 'code') {
        if (cell.id === cellId) {
          cumulativeCode.push(showFunction);
        } else cumulativeCode.push(showFunctionNoop);
        cumulativeCode.push(cell.content);
      }
      if (cell.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
}