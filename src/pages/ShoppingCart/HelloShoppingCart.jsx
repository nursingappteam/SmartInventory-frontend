import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import "./styles.css";
import axios from "axios";

const columns = [
  { id: "product", label: "Product Name", minWidth: 170, align: "middle" },
  { id: "tagnumber", label: "Tag\u00a0Number", minWidth: 50, align: "middle" },
  {
    id: "type",
    label: "Type",
    minWidth: 170,
    align: "middle",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "del",
    label: "",
    minWidth: 70,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(product, tagnumber, type, index) {
  return { product, tagnumber, type, index };
}

// Replace this with retrieve data process from database
const rows = [
  createData("TESTICULAR MODEL #1", "208382", "Task Trainer", 1),
  createData(
    "Patient Monitor, wall mounted #1",
    "20212",
    "Simulation Equipment",
    2
  ),
  createData(
    "OtoClear WaterPik Kit, Ear Irrigation",
    "308456",
    "Simulation Equipment",
    3
  ),
  createData("Kit, Poverty Simulation #1", "697583", "Nonconsumable Item", 4),
  createData("TESTICULAR MODEL #1", "208382", "Task Trainer", 5),
  createData(
    "Patient Monitor, wall mounted #1",
    "20212",
    "Simulation Equipment",
    6
  ),
  createData(
    "OtoClear WaterPik Kit, Ear Irrigation",
    "308456",
    "Simulation Equipment",
    7
  ),
  createData("Kit, Poverty Simulation #1", "697583", "Nonconsumable Item", 8),
  createData("TESTICULAR MODEL #1", "208382", "Task Trainer", 9),
  createData(
    "Patient Monitor, wall mounted #1",
    "20212",
    "Simulation Equipment",
    10
  ),
  createData(
    "OtoClear WaterPik Kit, Ear Irrigation",
    "308456",
    "Simulation Equipment",
    11
  ),
  createData("Kit, Poverty Simulation #1", "697583", "Nonconsumable Item", 12),
  createData("TESTICULAR MODEL #1", "208382", "Task Trainer", 13),
  createData(
    "Patient Monitor, wall mounted #1",
    "20212",
    "Simulation Equipment",
    14
  ),
  createData(
    "OtoClear WaterPik Kit, Ear Irrigation",
    "308456",
    "Simulation Equipment",
    15
  ),
  createData("Kit, Poverty Simulation #1", "697583", "Nonconsumable Item", 16),
];

const deleteRow = () => {
  // Copy rows data => delete => reassign to original rows data
  // let copy = [...rows]
  // copy = copy.filter(
  //   (item, index) => i != index
  // )
  console.log("deleteed");
};

const checkout = () => {
  console.log("checkout");
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function Chart() {
  const classes = useStyles();
  const [products, setProducts] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [cookies, setCookies, removeCookies] = useCookies([
    "inventory_session_id",
  ]);

  // TODO: get checkout cart for user returns in state products.
  const getCart = async () => {
    const request_url = `/users/session/getSession`;

    const options = {
      method: "GET",
      headers: {
        Content_Type: "application/json",
        api_key: API_KEY,
      },
      data: {
        session_id: cookies.inventory_session_id,
      },
      url: request_url,
    };

    const res = await axios(options)
      .then((res) => {
        if (res.status === 200) {
          console.log("loading cart data");
          setProducts(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "undefined" ? (
                              <DeleteIcon
                                className="delete"
                                style={{ cursor: "pointer" }}
                                onClick={deleteRow}
                              />
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* Submit button */}
      <button className="checkoutButton" onClick={checkout}>
        Check out
      </button>
    </React.Fragment>
  );
}
