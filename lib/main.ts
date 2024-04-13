export type CellPosition = {
  rowIndex?: number,
  cell?: HTMLTableCellElement,
  colSpan?: number,
  rowSpan?: number,
  content?: string | null,
  rowHeight?: number,
  from?: CellPosition
}

export type RowPosition = {
  tr: HTMLTableRowElement,
  rowHeight: number,
  cells: CellPosition[],
}

export function getComplexTablePosition(table: HTMLTableElement): RowPosition[] {
  const tbodyRows = table.tBodies[0].rows;
  const positions: RowPosition[] = [];
  // 构建初始位置表
  for (let i = 0; i < tbodyRows.length; i++) {
      const row = tbodyRows[i];
      const currentRowPositions = positions[i] ?? {
          rowHeight: row.offsetHeight,
          cells: [],
          tr: row,
      }
      let colIndex =  currentRowPositions.cells.length;
      positions[i] = currentRowPositions;
      for (let j = 0; j < row.cells.length; j++) {
          let emptyIndex = -1;
          const col = row.cells[j];
          const colSpan = col.colSpan;
          const rowSpan = col.rowSpan;
          let from: CellPosition;
          for (let k = 0; k < colSpan; k++) {
              for (let m = 0; m < currentRowPositions.cells.length; m++) {
                  if (!currentRowPositions.cells[m]) {
                      emptyIndex = m;
                      break;
                  }
              }

              function addContent(from: CellPosition) {
                  if (emptyIndex === -1) {
                      currentRowPositions.cells.push(from)
                  } else {
                      currentRowPositions.cells[emptyIndex] = from
                  }
              }

              if (k == 0) {
                  from = {
                      rowIndex: i,
                      cell: col,
                      colSpan,
                      rowSpan,
                      content: col.textContent,
                      rowHeight: col.parentElement!.offsetHeight,
                  }
                  addContent(from)
              } else {
                  addContent({
                      from: from!,
                  })
              }

              for (let l = 1; l < rowSpan; l++) {
                  const rowIndex = l + i;
                  if (!positions[rowIndex]) {
                      positions[rowIndex] = {
                          rowHeight: tbodyRows[rowIndex].offsetHeight,
                          cells: [],
                          tr: tbodyRows[rowIndex]
                      }
                  }
                  positions[rowIndex].cells[colIndex] = {
                      from: from!,
                  }
              }
              colIndex++;
          }
      }
  }

  return positions;
}

export function splitTable(table: HTMLTableElement) {
  
}