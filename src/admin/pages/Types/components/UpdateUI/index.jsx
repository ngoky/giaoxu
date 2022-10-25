import { apiConstants } from 'storage/constants'
import { Box, Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { newsTypeReducer } from 'storage/reducers'
import { newsTypeActions, apiAction } from 'storage/actions'

const UpdateUiView = (props) => {
    const { open, handleChange: handleOpen } = props
    const data = useSelector((state) => state.newsType.typeDetail)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(newsTypeActions.fetchDetail(1))
    }, [dispatch])
    console.log(data)
    const handleChange = (e) => {
        data[e.target.name] = e.target.value
        dispatch(
            apiAction.sendAction({
                type: apiConstants.MODIFY_OBJ,
                variable: 'typeDetail',
                data: { ...data },
                workspace: newsTypeReducer.newsTypeWorkspace
            })
        )
    }
    const onSubmit = () => {
        console.log('onSubmit', data)
        dispatch(newsTypeActions.createOrUpdate(data))
    }

    return (
        open && (
            <>
                <Box>
                    <TextField
                        name="name"
                        variant="outlined"
                        label="Name"
                        required
                        value={data?.name || ''}
                        onChange={handleChange}
                    />
                </Box>
                <Box display="inline-flex" className="action-buttons-box">
                    <Button onClick={handleOpen}>Cancel</Button>
                    <Button onClick={onSubmit}>Save</Button>
                </Box>
            </>
        )
    )
}

const mapToProps = (state) => state.newsType.typeDetail
const actionCreators = {
    fetchDetail: newsTypeActions.fetchDetail
}

export const UpdateUi = connect(mapToProps, actionCreators)(UpdateUiView)
