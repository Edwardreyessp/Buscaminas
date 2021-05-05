import "../App.css"

const Cell = ({ details, updateFlag, revealCell }) => {
  const cellstyle = {
    background: details.revealed
      ? details.value === "X"
        ? "#393e46"
        : bombChexPattern(details.x, details.y)
      : chexPattern(details.x, details.y),
    color: numColorCode(details.value),
  }

  return (
    <div
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      onClick={() => revealCell(details.x, details.y)}
      style={cellstyle}
      className="cellStyle"
    >
      {!details.revealed && details.flagged ? (
        "🚩"
      ) : details.revealed && details.value !== 0 ? (
        details.value === "X" ? (
          <i class="fas fa-bomb"></i>
        ) : (
          details.value
        )
      ) : (
        ""
      )}
    </div>
  )
}

const bombChexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#ffd3b4"
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#ffaaa7"
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#ffaaa7"
  } else {
    return "#ffd3b4"
  }
}

const chexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#aad8d3"
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#00adb5"
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#00adb5"
  } else {
    return "#aad8d3"
  }
}

const numColorCode = (num) => {
  if (num === 1) {
    return "#1976d2"
  } else if (num === 2) {
    return "#388d3c"
  } else if (num === 3) {
    return "#d33030"
  } else if (num === 4) {
    return "#7c21a2"
  } else if (num === 5) {
    return "#1976d2"
  } else if (num === 6) {
    return "#1976d2"
  } else {
    return "white"
  }
}

export default Cell