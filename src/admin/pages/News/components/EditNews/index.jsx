import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'
import { Grid, Box, TextField, Divider, Button, MenuItem } from '@mui/material'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { DragDropFile } from '@/components'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { apiAction, postActions, newsTypeActions } from 'storage/actions'
import { apiConstants } from 'storage/constants'
import { postReducer } from 'storage/reducers'
import _ from 'lodash'
import { request } from 'storage/http.helper'
// import { Field, reduxForm } from 'redux-form/immutable'

const uploadFiles = async (uploadFileObj, filename, quillObj) => {
    // var libraryName = "ImageFiles";
    // var context = this.props.context;
    var siteUrl = this.props.context.pageContext.site.absoluteUrl

    var currentDate = new Date()
    var fileNamePredecessor =
        currentDate.getDate().toString() +
        currentDate.getMonth().toString() +
        currentDate.getFullYear().toString() +
        currentDate.getTime().toString()

    filename = fileNamePredecessor + filename

    //To Upload in root folder
    // var apiUrl = `${siteUrl}/RootFolder/Files/Add(url='${filename}', overwrite=true)`
    try {
        if (uploadFileObj !== '') {
            request({
                tail: '/image/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;odata=verbose'
                    // "X-RequestDigest": digest
                },
                body: uploadFileObj // This is your file object
            })
                .then((response) => {
                    const range = quillObj.getEditorSelection()
                    const { url } = response
                    //var res = siteUrl + "/" + listName + "/" + filename;

                    quillObj.getEditor().insertEmbed(range.index, 'image', url)
                })
                .catch((error) => console.error(error))
        }
    } catch (error) {
        console.error('uploadFiles : ' + error)
    }
    //});
}

export const EditNewsView = () => {
    const { id } = useParams()
    const quillRef = useRef()
    const navigate = useNavigate()
    // const [data, setData] = useState(initialState)
    const selectLocalImage = () => {
        const editor = quillRef.current.getEditor()
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = async () => {
            const file = input.files[0]
            if (/^image\//.test(file.type)) {
                const formData = new FormData()
                formData.append('image', file)
                const res = await uploadFiles(formData) // upload data into server or aws or cloudinary
                const url = res?.data?.url
                editor.insertEmbed(editor.getSelection(), 'image', url)
            } else {
                // ErrorToast("You could only upload images.");
            }
        }
    }

    const dispatch = useDispatch()
    const data = useSelector((state) => {
        // console.log('state.posts.newDetail', state.posts.newDetail)
        return state.posts.newDetail || {}
    })
    useEffect(() => {
        dispatch(newsTypeActions.fetchTypes())
    }, [dispatch])

    useEffect(() => {
        if (id) {
            dispatch(postActions.fetchDetail(id))
        }
    }, [dispatch, id])

    const cancelHandler = () => {
        if (navigate.length > 0) {
            navigate(-1)
        } else {
            navigate('/admin/news/list')
        }
    }

    const { t } = useTranslation()
    const title = t('admin.pages.news.edit.overlay.news-title')
    const summary = t('admin.pages.news.edit.overlay.news-summary')

    const onChangeHandler = (e) => {
        console.log(e)
        if (!e.target?.name) {
            return
        }
        data[e.target.name] = e.target.value
        console.log('change', e.target.value)
        dispatch(
            apiAction.sendAction({
                type: apiConstants.MODIFY_OBJ,
                variable: 'newDetail',
                data: { ...data },
                workspace: postReducer.postWorkspace
            })
        )
    }

    const onContentChange = useCallback(
        (e) => {
            if (_.isEmpty(data)) {
                return
            }
            // if (!data.id && id) return
            console.log('before update', data)
            if (e === data.content) {
                return
            }
            data['content'] = e
            console.log('update', data)
            // console.log('change', e.target.value)
            dispatch(
                apiAction.sendAction({
                    type: apiConstants.MODIFY_OBJ,
                    variable: 'newDetail',
                    data: { ...data },
                    workspace: postReducer.postWorkspace
                })
            )
        },
        [data, dispatch]
    )

    const onSubmit = () => {
        const cloneObj = {
            id: data?.id,
            summary: data?.summary,
            subject: data?.subject,
            typeId: data?.typeId,
            photo: data?.photo,
            content: data?.content,
            status: data?.status || 'SUBMITTED'
        }
        console.log('submit', cloneObj)
        dispatch(
            postActions.createOrUpdate({
                ...cloneObj,
                photo: 'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg'
            })
        )
    }
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['image', 'code-block']
                ],
                handlers: {
                    image: selectLocalImage
                }
            }
        }),
        []
    )

    const types = useSelector((state) => state.newsType.types?.data) || []

    useEffect(
        () => () => {
            dispatch(
                apiAction.sendAction({
                    type: apiConstants.CLEAR,
                    variable: 'newDetail',
                    workspace: postReducer.postWorkspace
                })
            )
            console.error('unmount')
        },
        [dispatch]
    )

    console.log('render: ', data)

    return (
        data && (
            <Box
                sx={{
                    flexDirection: 'column'
                }}
                className="EditNews"
                display="flex"
            >
                <div>{t('admin.pages.news.edit.overlay.page-title')} </div>
                <Box display="inline-flex" className="action-buttons-box">
                    <Button onClick={() => cancelHandler()}>Cancel</Button>
                    <Button onClick={onSubmit}>Save</Button>
                </Box>
                <div id="form">
                    <Grid container className="news-info">
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            className="edit-text-box"
                        >
                            <TextField
                                name="subject"
                                label={title}
                                // component={TextField}
                                // defaultValue={data.title}
                                value={data?.subject || ''}
                                type="text"
                                onChange={onChangeHandler}
                                variant="outlined"
                                required
                                className="edit-text"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            className="edit-text-box"
                        >
                            <TextField
                                name="typeId"
                                label={title}
                                value={data?.typeId || ''}
                                select
                                onChange={onChangeHandler}
                                variant="outlined"
                                required
                                className="edit-text"
                                autoComplete="off"
                            >
                                {types &&
                                    types.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            display="flex"
                            className="edit-text-box"
                        >
                            <TextField
                                name="summary"
                                // component={TextField}
                                label={summary}
                                value={data?.summary || ''}
                                type="text"
                                // defaultValue={data.summary}
                                onChange={onChangeHandler}
                                multiline
                                rows={4}
                                required
                                variant="outlined"
                                className="edit-text"
                            />
                        </Grid>
                        <Grid item xs={12} display="flex">
                            <DragDropFile image={data.photo} />
                        </Grid>
                    </Grid>
                </div>
                <Divider />
                <ReactQuill
                    name="content"
                    modules={modules}
                    ref={quillRef}
                    value={data?.content || ''}
                    onChange={onContentChange}
                />
                <Divider />
                <Box display="inline-flex" className="action-buttons-box">
                    <Button onClick={() => cancelHandler()}>Cancel</Button>
                    <Button onClick={onSubmit}>Save</Button>
                </Box>
            </Box>
        )
    )
}
export const EditNews = memo(EditNewsView)
