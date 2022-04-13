import { useTypedSelector as useSelector } from "../../hooks/useTypesSelector";
import { Cell } from "../../state";
import CellListItem from "../cellListItem";
import AddCell from "../addCell";
import { Fragment, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import './cellList.css';

const CellList: React.FC = () => {
  // @ts-ignore
  const cells = useSelector(({ cells: { order, data } }) => {
    return order.map((id: string) => data[id])
  });

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map((cell: Cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className='cell-list'>
      <AddCell forceVisible={ cells.length === 0 } prevCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;