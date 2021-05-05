import React, { useEffect, useReducer } from "react"
import createBoard from "../util/createBoard"
import Cell from "./Cell"
import { revealed } from "../util/reveal"
import Modal from "./Modal"

const reducer = (grid, action) => {
  if(action.type === "freshBoard") {
    return action.payload
  }
}

const reducer2 = (nonMineCount, action) => {
  if(action.type === "freshBoard") {
    return 10 * 15 - 15
  }
  if(action.type === "revealCell") {
    return action.payload
  }
}

const reducer3 = (setMineLocations, action) => {
  if(action.type === "freshBoard") {
    return action.payload
  }
}

const reducer4 = (gameOver, action) => {
  if(action.type === "freshBoard") {
    return false
  }
  if(action.type === "revealCell") {
    return true
  }
}

const Board = () => {
  const [grid, dispatch] = useReducer(reducer, [])
  const [nonMineCount, dispatch2] = useReducer(reducer2, 0)
  const [mineLocations, dispatch3] = useReducer(reducer3, [])
  const [gameOver, dispatch4] = useReducer(reducer4,false)

  useEffect(() => {
    freshBoard()
  }, [])

  const freshBoard = () => {
    const newBoard = createBoard(10, 15, 15)
    dispatch2({type: "freshBoard"})
    dispatch3({type: "freshBoard", payload: newBoard.mineLocation})
    dispatch({type: "freshBoard", payload: newBoard.board})
  }

  const restartGame = () => {
    freshBoard()
    dispatch4({type: "freshBoard"})
  }

  // On Right Click / Flag Cell
  const updateFlag = (e, x, y) => {
    // to not have a dropdown on right click
    e.preventDefault()
    // Deep copy of a state
    let newGrid = JSON.parse(JSON.stringify(grid))
    console.log(newGrid[x][y])
    newGrid[x][y].flagged = true
    dispatch({type: "freshBoard", payload: newGrid})
  }

  // Reveal Cell
  const revealCell = (x, y) => {
    const newGrid = JSON.parse(JSON.stringify(grid))

    if (newGrid[x][y].value === "X") {
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      dispatch({type: "freshBoard", payload: newGrid})
      dispatch4({type: "revealCell"})
    }
    else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCount)
      dispatch({type: "freshBoard", payload: newRevealedBoard.arr})
      dispatch2({type: "revealCell", payload: newRevealedBoard.newNonMinesCount})
      if (newRevealedBoard.newNonMinesCount === 0) {
        dispatch4({type: "revealCell"})
      }
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {gameOver && <Modal restartGame={restartGame} />}
        {grid.map((singleRow, index1) => {
          return (
            <div style={{ display: "flex" }} key={index1}>
              {singleRow.map((singleBlock, index2) => {
                return (
                  <Cell
                    revealCell={revealCell}
                    details={singleBlock}
                    updateFlag={updateFlag}
                    key={index2}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Board
