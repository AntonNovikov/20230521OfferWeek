// function renderWaterfall(rootNode, columnCount, elementGap) {
//     console.log("root Height", rootNode.style , " N")
//     console.log("root Width", rootNode.style.clientWidth , " N")
//     console.log("root height", rootNode.style.height , " N")
//     console.log("root height", rootNode.height , " N")
//     var els = rootNode.querySelectorAll(".el");
//   var colHeights = Array(columnCount).fill(0);
//   var colWidth = 100 / columnCount;
// //   console.log(colWidth)
//   for (var i = 0; i < els.length; i++) {
//     var el = els[i];
//     var minColHeight = Math.min(...colHeights);
//     var minCol = colHeights.indexOf(minColHeight);
//     el.style.position = "absolute";
//     el.style.left = minCol * colWidth + "%";
//     el.style.top = minColHeight + "px" ;
//     el.style.maxWidth = colWidth + "%";
//     // console.log(el.style.maxWidth)
//     colHeights[minCol] += el.offsetHeight + elementGap;
//   }
//   var maxColHeight = Math.max(...colHeights);
//   rootNode.style.height = maxColHeight + "px";
// }

function renderWaterfall(rootNode, columnCount, elementGap) {
  // rootNode.style.display = 'grid';
  // rootNode.style.gridTemplateColums = `repeat(${columnCount}, 1fr)`;
  // rootNode.styel.gap = `${elementGap}px`

  var elements = rootNode.querySelectorAll(".el");
  var columnHeight = new Array(columnCount).fill(0);
  //   var columnWidth = 100 / columnCount;
  var containerWidth = rootNode.offsetWidth;
  console.log(containerWidth);
  var columnWidth = Math.floor(
    (containerWidth - elementGap * (columnCount -1)) / columnCount
  );
  console.log(columnWidth);
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var minHeightColumn = columnHeight.indexOf(Math.min(...columnHeight));
    element.style.width = columnWidth + "px";
    element.style.position = "absolute";
    element.style.top = columnHeight[minHeightColumn] + "px";
    element.style.left =
      minHeightColumn * columnWidth + elementGap * (minHeightColumn)+8*minHeightColumn+ "px";
    columnHeight[minHeightColumn] += element.offsetHeight + elementGap;
  }

  // Resize container to fit all columns
  var maxHeight = Math.max(...columnHeight);
  var containerHeight = maxHeight - elementGap + "px";
  rootNode.style.height = containerHeight;
}

let root = document.querySelector(".root");
let columnCount = 3;
let elementGap = 10;
renderWaterfall(root, columnCount, elementGap);

// var columnGapInPixels = 10;
// renderWaterfall(rootNode, columnCount, elementGap, columnGapInPixels);
