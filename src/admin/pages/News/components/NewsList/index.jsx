import DynamicTables from '@/admin/components/DynamicTables'
import { formatData } from 'utils/format'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postActions } from 'storage/actions'
import { Box, Fab } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import { tableConstants } from '@/constants/tables.constants'

const headCells = [
    {
        visible: false,
        id: 'id',
        label: 'ID',
        width: '7%',
        numeric: true,
        format: { type: formatData.FORMAT_TYPE.INT },
        disablePadding: true
    },
    {
        visible: true,
        id: 'subject',
        label: 'Subject',
        width: '10%',
        numeric: false,
        disablePadding: true
    },
    {
        visible: true,
        id: 'summary',
        label: 'Summary',
        width: '10%',
        numeric: false,
        disablePadding: true
    },
    // {
    //     visible: true,
    //     id: 'content',
    //     label: 'content',
    //     width: '10%',
    //     numeric: false,
    //     disablePadding: true
    // },
    {
        visible: true,
        id: 'photo',
        label: 'Photo',
        width: '8%',
        numeric: false,
        disablePadding: true
    },
    {
        visible: true,
        id: 'activatedAt',
        label: 'Publish Date',
        // width: '10%',
        numeric: false,
        disablePadding: true,
        format: { type: formatData.FORMAT_TYPE.DATE }
    }
]

export const NewsList = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(postActions.fetchList({ page, limit }))
    }, [dispatch, limit, page])
    const stgObj = useSelector((state) => state?.posts?.posts || {})
    const { data = [] } = stgObj
    const rows = formatData.formatDataByHeaderKey(data, headCells)
    const navigate = useNavigate()
    const editHandler = (e) => {
        e.stopPropagation()
        navigate(`/admin/news/${e.target.id}`)
    }
    const actions = [
        {
            id: 1,
            type: tableConstants.ACTION_TYPE.BUTTON,
            handler: editHandler,
            label: 'Edit'
        },
        {
            id: 2,
            type: tableConstants.ACTION_TYPE.BUTTON,
            handler: editHandler,
            label: 'View'
        }
    ]
    console.log(stgObj)
    return (
        <Box>
            <DynamicTables
                headCells={headCells}
                rows={rows}
                actions={actions}
            />

            <Fab
                color="secondary"
                style={{
                    margin: 0,
                    top: 'auto',
                    right: 20,
                    bottom: 20,
                    left: 'auto',
                    position: 'fixed'
                }}
                onClick={() => navigate('/admin/news/add')}
                aria-label="add"
            >
                <Add />
            </Fab>
        </Box>
    )
}
