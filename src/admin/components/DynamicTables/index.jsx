import {
    alpha,
    Box,
    Button,
    Checkbox,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Delete, FilterList } from '@mui/icons-material'
import './index.scss'
import { tableConstants } from '@/constants'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    if (!array) {
        return []
    }
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        headCells = [],
        actions = [],
        checkBox = false
    } = props

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {checkBox && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={
                                numSelected > 0 && numSelected < rowCount
                            }
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts'
                            }}
                        />
                    </TableCell>
                )}
                {headCells.length > 0 &&
                    headCells.map((headCell) => {
                        return (
                            headCell.visible && (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.numeric ? 'right' : 'left'}
                                    padding={
                                        headCell.disablePadding
                                            ? 'none'
                                            : 'normal'
                                    }
                                    width={100}
                                    // style={{ width: `${headCell.width}` }}
                                    sortDirection={
                                        orderBy === headCell.id ? order : false
                                    }
                                >
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={
                                            orderBy === headCell.id
                                                ? order
                                                : 'asc'
                                        }
                                        onClick={createSortHandler(headCell.id)}
                                    >
                                        {headCell.label}
                                        {orderBy === headCell.id ? (
                                            <Box
                                                component="span"
                                                sx={visuallyHidden}
                                            >
                                                {order === 'desc'
                                                    ? 'sorted descending'
                                                    : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                            )
                        )
                    })}
                {actions.length > 0 && (
                    <TableCell align="right" className="sticky">
                        Actions
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
}

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        )
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>
            )}

            {numSelected > 0 ? (
                <>
                    <Tooltip title="Delete">
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterList />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    )
}

const ActionView = (props) => {
    const { actions, id } = props
    return (
        <Box display="inline-flex">
            {actions.map((x, index) => (
                <div key={`${id}_${index}`} className="action-item-box">
                    {x.type === tableConstants.ACTION_TYPE.BUTTON && (
                        <Button id={id} onClick={x.handler}>
                            {x.label}
                        </Button>
                    )}
                    {x.type === tableConstants.ACTION_TYPE.LINK && (
                        <Typography
                            className="actionLink"
                            component="a"
                            href={x.handler}
                        >
                            {x.label}
                        </Typography>
                    )}
                </div>
            ))}
        </Box>
    )
}

const TableBody2 = (props) => {
    const {
        displayData,
        headCells = [],
        checkBox,
        isSelected,
        handleClick,
        actions,
        rows,
        emptyRows
    } = props
    return (
        <TableBody>
            {displayData.map((row, index) => {
                const isItemSelected = isSelected(row.id)
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                    <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                    >
                        {checkBox && (
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                        'aria-labelledby': labelId
                                    }}
                                />
                            </TableCell>
                        )}
                        {headCells.map((element) => {
                            return (
                                element.visible && (
                                    <TableCell
                                        key={element.id}
                                        component="td"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                        className={element.id}
                                    >
                                        {element.id === 'photo' && (
                                            <img
                                                src={row[element.id]}
                                                alt="news default images"
                                            />
                                        )}
                                        {element.id !== 'photo' &&
                                            row[element.id]}
                                    </TableCell>
                                )
                            )
                        })}
                        {/* {Object.entries(row.display).map((x, index) => {
                            const key = headCells
                            console.log(x)
                            return (
                                <TableCell
                                    key={x[0]}
                                    component="td"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                    className={x[0]}
                                >
                                    {x[0] === 'photo' && (
                                        <img
                                            src={x[1]}
                                            alt="news default images"
                                        />
                                    )}
                                    {x[0] !== 'photo' && x[1]}
                                </TableCell>
                            )
                        })} */}

                        {actions.length > 0 && (
                            <TableCell align="right" className="sticky">
                                <ActionView id={row.id} actions={actions} />
                            </TableCell>
                        )}
                    </TableRow>
                )
            })}
            {rows.length === 0 && (
                <TableRow
                    style={{
                        height: 53 * emptyRows
                    }}
                >
                    <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                        No Record Found
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    )
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
}

export default function DynamicTables(props) {
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('name')
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const { rows = [], headCells = [], checkBox = false } = props
    const { actions = [] } = props

    const handleRequestSort = (event, property) => {
        console.log(property)
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        }

        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangePagePagination = (event, newPage) => {
        setPage(newPage - 1)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const isSelected = (name) => selected.indexOf(name) !== -1

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    /* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */
    const displayData =
        stableSort(rows, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        ) || []
    console.log('render')
    return (
        rows && (
            <Box sx={{ width: '100%' }} className="Table">
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        headCells={headCells}
                    />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                headCells={headCells}
                                actions={actions}
                                checkBox={checkBox}
                            />
                            <TableBody2
                                displayData={displayData}
                                actions={actions}
                                headCells={headCells}
                                isSelected={isSelected}
                                rows={rows}
                                emptyRows={emptyRows}
                                handleClick={handleClick}
                            />
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    {/* <Pagination
                        count={Math.ceil(rows.length / rowsPerPage)}
                        onChange={handleChangePagePagination}
                        color="primary"
                    /> */}
                </Paper>
            </Box>
        )
    )
}
