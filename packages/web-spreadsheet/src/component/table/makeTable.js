import { getFontSizePxByPt } from "../../core/font";

import getDraw, { getDrawBox, thinLineWidth } from "../../canvas/draw";
import { h } from "../element";
import { cssPrefix } from "../../config";

const cellPaddingWidth = 5;
const tableGridStyle = {
  fillStyle: "#fff",
  lineWidth: thinLineWidth,
  strokeStyle: "#e6e6e6",
};

function getTableDrawBox(data, rindex, cindex, yoffset = 0) {
  const { left, top, width, height } = data.cellRect(rindex, cindex);
  return getDrawBox(left, top + yoffset, width, height, cellPaddingWidth);
}

export const makeTable = ({
  data,
  hyperFormula,
  renderFixedHeaders = () => {},
  renderFixedLeftTopCell = () => {},
}) => {
  const el = h("canvas", `${cssPrefix}-table`);
  const draw = getDraw(el.el, data.viewWidth(), data.viewHeight());
  let calculateFormulas = true;

  const renderCell = (draw, data, rindex, cindex, yoffset = 0) => {
    const { sortedRowMap, rows, cols } = data;
    if (rows.isHide(rindex) || cols.isHide(cindex)) return;
    let nrindex = rindex;
    if (sortedRowMap.has(rindex)) {
      nrindex = sortedRowMap.get(rindex);
    }

    const cell = data.getCell(nrindex, cindex);
    if (cell === null) return;
    let frozen = false;
    if ("editable" in cell && cell.editable === false) {
      frozen = true;
    }

    const style = data.getCellStyleOrDefault(nrindex, cindex);
    const dbox = getTableDrawBox(data, rindex, cindex, yoffset);
    dbox.bgcolor = style.bgcolor;
    if (style.border !== undefined) {
      // bboxes.push({ ri: rindex, ci: cindex, box: dbox });
      draw.strokeBorders(style.border, dbox);
    }

    draw.rect(dbox, () => {
      // TODO: Fix sheets later
      const cellAddress = {
        col: cindex,
        row: rindex,
        sheet: 0,
      };

      // render text
      let cellText = calculateFormulas
        ? hyperFormula.getCellValue(cellAddress)
        : cell.text || "";
      let format = style.format;

      if (!calculateFormulas && hyperFormula.doesCellHaveFormula(cellAddress)) {
        format = "text";
      }

      // if (format) {
      //   cellText = formats[format].render(cellText);
      // }
      const font = Object.assign({}, style.font);
      font.size = getFontSizePxByPt(font.size);

      draw.text(
        cellText,
        dbox,
        {
          align: style.align,
          valign: style.valign,
          font,
          color: style.color,
          strike: style.strike,
          underline: style.underline,
        },
        style.textwrap,
      );
      // error
      const error = data.validations.getError(rindex, cindex);
      if (error) {
        draw.error(dbox);
      }
      if (frozen) {
        draw.frozen(dbox);
      }
    });
  };

  const setCalculateFormulas = (shouldCalculateFormulas) => {
    calculateFormulas = shouldCalculateFormulas;
  };

  const renderAutofilter = (viewRange) => {
    if (viewRange) {
      const { autoFilter } = data;
      if (!autoFilter.active()) return;
      const afRange = autoFilter.hrange();
      if (viewRange.intersects(afRange)) {
        afRange.each((ri, ci) => {
          const dbox = getTableDrawBox(data, ri, ci);
          draw.dropdown(dbox);
        });
      }
    }
  };

  const renderContent = (
    viewRange,
    fixedHeaderWidth,
    fixedHeaderHeight,
    tx,
    ty,
  ) => {
    draw.save();
    draw.translate(fixedHeaderWidth, fixedHeaderHeight);
    draw.translate(tx, ty);

    const { exceptRowSet } = data;
    // const exceptRows = Array.from(exceptRowSet);
    const filteredTranslateFunc = (ri) => {
      const ret = exceptRowSet.has(ri);
      if (ret) {
        const height = data.rows.getHeight(ri);
        draw.translate(0, -height);
      }
      return !ret;
    };

    const exceptRowTotalHeight = data.exceptRowTotalHeight(
      viewRange.sri,
      viewRange.eri,
    );
    // 1 render cell
    draw.save();
    draw.translate(0, -exceptRowTotalHeight);
    viewRange.each(
      (ri, ci) => {
        renderCell(draw, data, ri, ci);
      },
      (ri) => filteredTranslateFunc(ri),
    );
    draw.restore();

    // 2 render mergeCell
    const rset = new Set();
    draw.save();
    draw.translate(0, -exceptRowTotalHeight);
    data.eachMergesInView(viewRange, ({ sri, sci, eri }) => {
      if (!exceptRowSet.has(sri)) {
        renderCell(draw, data, sri, sci);
      } else if (!rset.has(sri)) {
        rset.add(sri);
        const height = data.rows.sumHeight(sri, eri + 1);
        draw.translate(0, -height);
      }
    });
    draw.restore();

    // 3 render autofilter
    renderAutofilter(viewRange);

    draw.restore();
  };

  const renderContentGrid = (
    { sri, sci, eri, eci, w, h },
    fixedHeaderWidth,
    fixedHeaderHeight,
    tx,
    ty,
  ) => {
    const { options } = data;

    draw.save();
    draw.attr(tableGridStyle);
    draw.translate(fixedHeaderWidth + tx, fixedHeaderHeight + ty);

    draw.clearRect(0, 0, w, h);
    if (!options.showGrid) {
      draw.restore();
      return;
    }

    data.rowEach(sri, eri, (i, y, ch) => {
      if (i !== sri) draw.line([0, y], [w, y]);
      if (i === eri) draw.line([0, y + ch], [w, y + ch]);
    });
    data.colEach(sci, eci, (i, x, cw) => {
      if (i !== sci) draw.line([x, 0], [x, h]);
      if (i === eci) draw.line([x + cw, 0], [x + cw, h]);
    });
    draw.restore();
  };

  const renderFreezeHighlightLine = (
    fixedHeaderWidth,
    fixedHeaderHeight,
    ftw,
    fth,
  ) => {
    const twidth = data.viewWidth() - fixedHeaderWidth;
    const theight = data.viewHeight() - fixedHeaderHeight;
    draw.save();
    draw.translate(fixedHeaderWidth, fixedHeaderHeight);
    draw.attr({ strokeStyle: "rgba(75, 137, 255, .6)" });
    draw.line([0, fth], [twidth, fth]);
    draw.line([ftw, 0], [ftw, theight]);
    draw.restore();
  };

  const render = () => {
    // resize canvas
    const { rows, cols } = data;
    // fixed width of header
    const fixedHeaderWidth = cols.indexWidth;
    // fixed height of header
    const fixedHeaderHeight = rows.height;

    draw.resize(data.viewWidth(), data.viewHeight());
    clear();

    const viewRange = data.viewRange();

    const tx = data.freezeTotalWidth();
    const ty = data.freezeTotalHeight();
    const { x, y } = data.scroll;
    // 1
    renderContentGrid(viewRange, fixedHeaderWidth, fixedHeaderHeight, tx, ty);
    renderContent(viewRange, fixedHeaderWidth, fixedHeaderHeight, -x, -y);
    renderFixedHeaders(
      "all",
      viewRange,
      fixedHeaderWidth,
      fixedHeaderHeight,
      tx,
      ty,
    );
    renderFixedLeftTopCell(fixedHeaderWidth, fixedHeaderHeight);

    const [fri, fci] = data.getFreeze();
    if (fri > 0 || fci > 0) {
      // 2
      if (fri > 0) {
        const vr = viewRange.clone();
        vr.sri = 0;
        vr.eri = fri - 1;
        vr.h = ty;
        renderContentGrid(vr, fixedHeaderWidth, fixedHeaderHeight, tx, 0);
        renderContent(vr, fixedHeaderWidth, fixedHeaderHeight, -x, 0);
        renderFixedHeaders(
          "top",
          vr,
          fixedHeaderWidth,
          fixedHeaderHeight,
          tx,
          0,
        );
      }
      // 3
      if (fci > 0) {
        const vr = viewRange.clone();
        vr.sci = 0;
        vr.eci = fci - 1;
        vr.w = tx;
        renderContentGrid(vr, fixedHeaderWidth, fixedHeaderHeight, 0, ty);
        renderFixedHeaders(
          "left",
          vr,
          fixedHeaderWidth,
          fixedHeaderHeight,
          0,
          ty,
        );
        renderContent(vr, fixedHeaderWidth, fixedHeaderHeight, 0, -y);
      }
      // 4
      const freezeViewRange = data.freezeViewRange();
      renderContentGrid(
        freezeViewRange,
        fixedHeaderWidth,
        fixedHeaderHeight,
        0,
        0,
      );
      renderFixedHeaders(
        "all",
        freezeViewRange,
        fixedHeaderWidth,
        fixedHeaderHeight,
        0,
        0,
      );
      renderContent(freezeViewRange, fixedHeaderWidth, fixedHeaderHeight, 0, 0);
      // 5
      renderFreezeHighlightLine(fixedHeaderWidth, fixedHeaderHeight, tx, ty);
    }
  };

  const clear = () => {
    draw.clear();
  };

  const resetData = (datum) => {
    data = datum;
    render();
  };

  return {
    el,
    draw,
    calculateFormulas,
    setCalculateFormulas,
    clear,
    render,
    resetData,
  };
};