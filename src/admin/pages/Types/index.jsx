import { Add, Remove } from '@mui/icons-material'
import { Box, Paper, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newsTypeActions } from 'storage/actions'
import { TypeList } from './components/TypeList'
import { UpdateUi } from './components/UpdateUI'

const TypesView = () => {
    const [open, setOpen] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [pageItems, setPageItems] = useState(10)
    const handleClick = () => {
        if (open && selectedRow > 0) {
            setSelectedRow(0)
        }
        setOpen(!open)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            newsTypeActions.fetchTypes({ page: pageNumber, limit: pageItems })
        )
    }, [dispatch, pageNumber, pageItems])

    const onPageChange = (index) => {
        setPageNumber(index)
    }

    const onPageItemChange = (number) => {
        setPageItems(number)
    }

    const [selectedRow, setSelectedRow] = useState(0)

    const saveObj = useSelector((state) => state.newsType?.types || {})
    const { data = [], page = 1, limit = 10 } = saveObj

    const editClick = (id) => {
        setSelectedRow(id)
        setOpen(true)
    }

    const deleteHandler = (id) => {
        dispatch(newsTypeActions.deleteType(id))
        dispatch(
            newsTypeActions.fetchTypes({ page: pageNumber, limit: pageItems })
        )
    }
    console.log('selected row', selectedRow)

    return (
        <Box>
            <p>Admin- Type</p>
            <Grid container>
                <Grid item xs={12} sm={12} md={open ? 6 : 12}>
                    <Paper>
                        <Grid
                            container
                            textAlign="flex-right"
                            onClick={handleClick}
                        >
                            {open ? <Remove /> : <Add />}
                        </Grid>
                        {open && (
                            <UpdateUi
                                open={open}
                                handleChange={handleClick}
                                id={selectedRow}
                            />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={open ? 6 : 12}>
                    <TypeList
                        onPageChange={onPageChange}
                        onPageItemChange={onPageItemChange}
                        data={data}
                        page={page}
                        limit={limit}
                        editClick={editClick}
                        deleteHandler={deleteHandler}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export const Types = TypesView
