import React from "react";
import { Form, Button } from "react-bootstrap";
import Cell from "../components/Cell";
import "./Board.css";
import {
  randColor,
  randomItem,
  arrayToMatrix,
  LargestAreaMatrix,
  highestColor,
} from "../helpers/functions";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 0,
      colls: 0,
      colors: 0,
      table: null,
      coll_error: false,
      row_error: false,
      color_error: false,
      show_calc_infos: false,
      calc_big: null,
      matrixColors: [],
      biggest: null,
      _highestColor: "",
    };
  }

  //Check inputs validity
  checkValidity(params) {
    if (params.rows === 0 || params.rows === null) {
      this.setState({ row_error: true });
    }
    if (params.colls === 0 || params.colls === null) {
      this.setState({ coll_error: true });
    }
    if (params.colors === 0 || params.colors === null) {
      this.setState({ color_error: true });
    }
  }

  //clean input error
  cleanErros(inputName) {
    if (inputName === "row") {
      return this.setState({ row_error: false });
    }
    if (inputName === "coll") {
      return this.setState({ coll_error: false });
    }
    return this.setState({ color_error: false });
  }

  // Calc Biggest Area
  calcBiggest() {
    let params = this.state.colls;
    this.setState({ show_calc_infos: true });
    let matrx = arrayToMatrix(this.state.matrixColors, params);
    // Find Big Largest Area in Matrix
    let big_area_color = LargestAreaMatrix(matrx, this.state.matrixColors);

    this.setState({
      biggest: big_area_color,
    });
    let highest = highestColor(this.state.matrixColors);
    this.setState({ _highestColor: highest });
  }
  // Create Square Board
  createSquare() {
    let params = this.state;
    //Check validity
    this.checkValidity(params);
    //setup colors array
    let arr_colors = [];
    for (let index = 0; index < params.colors; index++) {
      arr_colors.push(randColor());
    }
    // Build the rows in an array
    let rows = [];
    let matrix_colors = [];
    let index_cell = 0;
    for (let y = 0; y < params.rows; y++) {
      // Build the cells in an array
      const cells = [];
      for (let x = 0; x < params.colls; x++) {
        //set random color for each cell
        let cell_color = randomItem(arr_colors);
        cells.push(
          <Cell
            color={cell_color}
            index_cell={index_cell}
            biggest={this.state.biggest}
          />
        );
        matrix_colors.push(cell_color);
        index_cell++;
      }
      // Put them in the row
      rows.push(<tr>{cells}</tr>);
      this.state.colors > 0 &&
        this.setState({
          table: rows,
          show_calc_infos: false,
          matrixColors: matrix_colors,
        });
    }
  }

  render() {
    // Return the table

    return (
      <React.Fragment>
        <div className="container">
          <div className="text-center py-3 ">
            <h1> Square Game</h1>
          </div>
          <Form className="d-flex justify-content-around">
            <Form.Group className="mb-3">
              <Form.Label>Row Numbers</Form.Label>
              <Form.Control
                className={this.state.row_error ? "class_err" : ""}
                type="number"
                min="0"
                name="rows"
                value={this.state.rows}
                onChange={(e) => {
                  this.setState({ rows: e.target.value });
                  this.cleanErros("row");
                }}
              />
              <Form.Text
                className={this.state.row_error ? "text-danger" : "text-muted"}
              >
                {this.state.row_error
                  ? "Row number is required"
                  : "Insert numbers of row here."}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Coll Numbers</Form.Label>
              <Form.Control
                className={this.state.coll_error ? "class_err" : ""}
                type="number"
                min="0"
                name="colls"
                value={this.state.colls}
                onChange={(e) => {
                  this.setState({ colls: e.target.value });
                  this.cleanErros("coll");
                }}
              />
              <Form.Text
                className={this.state.coll_error ? "text-danger" : "text-muted"}
              >
                {this.state.coll_error
                  ? "Coll number is required"
                  : "Insert numbers of coll here."}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color Numbers</Form.Label>
              <Form.Control
                className={this.state.row_error ? "class_err" : ""}
                type="number"
                min="0"
                name="colors"
                value={this.state.colors}
                onChange={(e) => {
                  this.setState({ colors: e.target.value });
                  this.cleanErros("color");
                }}
              />
              <Form.Text
                className={
                  this.state.color_error ? "text-danger" : "text-muted"
                }
              >
                {this.state.color_error
                  ? "Color number is required"
                  : "Insert numbers of color here."}
              </Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              className="px-5 py-3 h-50 mt-4"
              onClick={() => this.createSquare(this.state)}
            >
              Play
            </Button>
          </Form>
          <div className="d-flex mt-3 row my-5">
            <div className="col text-center">
              <table className="m-auto">
                <tbody>{this.state.table}</tbody>
              </table>
            </div>
            <div className="col calcBloc">
              <Button
                variant="primary"
                className="mb-4"
                onClick={() => {
                  this.calcBiggest();
                }}
              >
                {" "}
                Biggest Area
              </Button>
              {this.state.show_calc_infos ? (
                <ul>
                  <li>
                    Number of cells on the width: ​<b>{this.state.colls}</b>{" "}
                  </li>
                  <li>
                    Number of cells on height: <b>{this.state.rows}</b>
                  </li>
                  <li>
                    Number of colors: ​ <b>{this.state.colors}</b>
                  </li>
                  <li>
                    <div className="w-100">
                      {" "}
                      Result: the biggest area contains{" "}
                      <b>{this.state.biggest}</b> cells with color :
                      <td
                        className="cell"
                        style={{
                          width: "2em",
                          height: "2em",
                          border: "1px solid #ddd",
                          backgroundColor: this.state._highestColor,
                        }}
                      >
                        {/* <h3 style={{ color: "black" }}>{biggest ? biggest : null}</h3> */}
                      </td>
                      {/* <Cell color={this.state._highestColor} w="1rem" h="1rem" /> */}
                    </div>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Board;
