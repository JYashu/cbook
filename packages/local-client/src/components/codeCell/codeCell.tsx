import { useEffect, useState } from 'react';
import { Cell } from '../../state';
import Editor from '../codeEditor';
import Preview from '../preview';
import Resizable from '../resizable';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector as useSelector } from '../../hooks/useTypesSelector';
import { useCumulativeCode } from '../../hooks/useCumulativeCode';
import './codeCell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  
  const { updateCell, createBundle } = useActions();
  // @ts-ignore
  const bundle = useSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    }
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div className='code-cell'>
        <Resizable direction='horizontal'>
          <Editor 
            initialValue={cell.content} 
            onChange={(value) => updateCell(cell.id, value)}  
          />
        </Resizable>
        <div className='progress-wrapper'>
          {
            !bundle || bundle.processing
            ? <div className='progress-cover'><progress className='progress is-small is-primary' max='100'>Loading</progress></div>
            : <Preview code={bundle.code} status={bundle.error} />
          }
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;