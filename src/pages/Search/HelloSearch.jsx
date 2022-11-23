import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import "./styles.css";

const columns = [
  { id: 'product', label: 'Product Name', minWidth: 170 ,align: 'middle'},
  { id: 'tagnumber', label: 'Tag\u00a0Number', minWidth: 50 ,align: 'middle'},
  { id: 'type', label: 'Type', minWidth: 100, align: 'middle'},
  { id: 'subtype', label: 'Sub Type', minWidth: 100, align: 'middle'},
  { id: 'del', label: '', minWidth: 70, align: 'right', format: (value) => value.toLocaleString('en-US')},
  { id: 'edit', label: '', minWidth:5, align: 'left', format: (value) => value.toLocaleString('en-US')}
];

function createData(product, tagnumber, type, subtype, index) {
  return ({ product, tagnumber, type, subtype, index});
}

// Replace this with retrieve data process from database
const rows =  [
  createData('TESTICULAR MODEL #1', '208382', 'Task Trainer', 'Skills Trainer - Male Genitalia', 1),
  createData('GERI KERI NURSING SKILLS 1', '', 'Patient Simulator', 'Low Fidelity', 2),
  createData('CAREASSIST BED W/5TH WHEEL STEERING   ', '', 'Medical Furniture', 'Bed - MedSurg', 3),
  createData('DOUBLE 2 ROBOT #1', '', 'Electronics', 'System', 4),
  createData('ENTERAL FEEDING PUMP, ROSS PATROL #1', '', 'Simulation Equipment', 'Feeding Pumps', 5),
  createData('EYE MODELS #1 (AR303)', 'SHF1065', 'Task Trainer', 'Skills Trainer - Eye Examination', 6),
  createData('Newborn Baby Training Model #3, swaddling baby', '', 'Task Trainer', 'OB/GYN Trainer', 7),
  createData('LAERDAL SIMBABY INFANT SIMULATOR  246-00050 (SimBaby #1)', '084968', 'Patient Simulator', 'Infant - High Fidelity', 8),
  createData('DEFIBRILLATOR, LIFEPAK 20 (Defibrillator #1)', '86140', 'Simulation Equipment', 'Critical Care', 9),
  createData('PROJECTOR, NEC XGA 3500LU, NP1000', '87106', 'Electronics', 'Projector', 10),
  createData('LATITUDE 80', '92605', 'Medical Furniture', 'Headwall', 11),
  createData('SIM (-MAN, -MOM, -BABY) ESSENTIAL MANIKINS AND ACCESSORIES (SimJunior #5), CAUCASIAN', '115843', 'Patient Simulator', 'Adult - High Fidelity', 12),
  createData('LAPTOP DELL LATITUDE 7400', '129506', 'Electronics', 'Laptop', 13),
  createData('TABLET LENOVO X103F  (for Blood Pressure Assessment Simulator #2)', '124713', 'Electronics', 'Tablet', 14),
  createData('PYXIS MEDSTATION 4000 4 DRAWER (Pyxis Medstation #4)', '121286', 'Simulation Equipment', 'Pyxis', 15),
];

const deleteRow = () =>{
  // Copy rows data => delete => reassign to original rows data
  // let copy = [...rows]
  // copy = copy.filter(
  //   (item, index) => i != index
  // )
  console.log("deleteed")
}

const editRow = () =>{
  // Copy rows data => delete => reassign to original rows data
  // let copy = [...rows]
  // copy = copy.filter(
  //   (item, index) => i != index
  // )
  console.log("edited")
}

const checkout = () =>{
  console.log("checkout")
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Chart() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'undefined' ? <DeleteIcon  className="delete" style={{cursor:'pointer'}} onClick={deleteRow}/> :  value}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </Paper>
    {/* Submit button */}
    <button className="checkoutButton" onClick={checkout}>Check out</button>
    </React.Fragment>
  );
}