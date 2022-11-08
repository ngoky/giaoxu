import { apiConstants } from 'storage/constants'
import { Box, Button, MenuItem, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newsTypeReducer } from 'storage/reducers'
import { newsTypeActions, apiAction } from 'storage/actions'
import { useTranslation } from 'react-i18next'

const UpdateUiView = (props) => {
    const { open, handleChange: handleOpen, id } = props
    const data = useSelector((state) => state.newsType.typeDetail || {})
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log('fetch id', id)
        if (id) {
            dispatch(newsTypeActions.fetchDetail(id))
        }
    }, [dispatch, id])
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
        dispatch(newsTypeActions.createOrUpdate(data))
        if (handleOpen) {
            handleOpen(false)
        }
        dispatch(newsTypeActions.fetchTypes())
    }

    useEffect(
        () => () => {
            console.log('unmount')
            dispatch(
                apiAction.sendAction({
                    type: apiConstants.MODIFY_OBJ,
                    variable: 'typeDetail',
                    data: null,
                    workspace: newsTypeReducer.newsTypeWorkspace
                })
            )
            dispatch(newsTypeActions.fetchTypes())
        },
        [dispatch]
    )

    const { t } = useTranslation()

    const statuses = t('data.new-types.status', { returnObjects: true }) || []

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

                    <TextField
                        name="status"
                        variant="outlined"
                        label="Status"
                        select
                        required
                        value={
                            data?.status || statuses.find((x) => x.default).key
                        }
                        onChange={handleChange}
                    >
                        {statuses.map((x) => (
                            <MenuItem key={x.key} value={x.key}>
                                {x.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box display="inline-flex" className="action-buttons-box">
                    <Button onClick={handleOpen}>Cancel</Button>
                    <Button onClick={onSubmit}>Save</Button>
                </Box>
            </>
        )
    )
}
export const UpdateUi = UpdateUiView
