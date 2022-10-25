import { Add } from '@mui/icons-material'
import { Box, Paper, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { newsTypeActions } from 'storage/actions'
import EnhancedTable from '../News/components/NewsTable'
import { UpdateUi } from './components/UpdateUI'

const TypesView = () => {
    const [open, setOpen] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [pageItems, setPageItems] = useState(10)

    const changReduxItem = (data, key) => {}
    const handleClick = () => {
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

    const saveObj = useSelector((state) => state.newsType?.types || {})
    const { data = [], page = 1, limit = 10 } = saveObj
    console.log(data, page, limit)

    return (
        <Box>
            <p>Admin- Type</p>
            <Paper>
                <Grid container textAlign="flex-right" onClick={handleClick}>
                    <Add />
                </Grid>
                {open && <UpdateUi open={open} handleChange={handleClick} />}
            </Paper>
            <EnhancedTable
                onPageChange={onPageChange}
                onPageItemChange={onPageItemChange}
            />
        </Box>
    )
}

const mapStateToProps = (state) => {
    console.log(state.newsType)
    return state.newsType.types
}

const actionCreators = {
    fetchTypes: newsTypeActions.fetchTypes
}

export const Types = connect(mapStateToProps, actionCreators)(TypesView)
