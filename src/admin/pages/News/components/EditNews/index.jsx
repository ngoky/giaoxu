import { useEffect, useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'
import { Grid, Box, TextField, Divider, Button, MenuItem } from '@mui/material'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { DragDropFile } from '@/components'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux'
import { apiAction, postActions } from 'storage/actions'
import { apiConstants } from 'storage/constants'
import _ from 'lodash'
import { postReducer } from 'storage/reducers'
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
    var apiUrl = `${siteUrl}/RootFolder/Files/Add(url='${filename}', overwrite=true)`
    // const digestCache = this.props.context.serviceScope.consume(
    //   DigestCache.serviceKey
    // );
    // digestCache
    //   .fetchDigest(this.props.context.pageContext.web.serverRelativeUrl)
    //   .then(async (digest) => {
    try {
        if (uploadFileObj !== '') {
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;odata=verbose'
                    // "X-RequestDigest": digest
                },
                body: uploadFileObj // This is your file object
            })
                .then((response) => {
                    console.log(response)
                    const range = quillObj.getEditorSelection()
                    const { url } = response
                    //var res = siteUrl + "/" + listName + "/" + filename;

                    quillObj.getEditor().insertEmbed(range.index, 'image', url)
                })
                .catch((error) => console.log(error))
        }
    } catch (error) {
        console.log('uploadFiles : ' + error)
    }
    //});
}

const initialState = {
    title: '',
    summary: '',
    content: ''
}

export const EditNewsView = () => {
    const { id } = useParams()
    console.log(id)
    const quillRef = useRef()
    const navigate = useNavigate()
    // const [data, setData] = useState(initialState)
    const selectLocalImage = () => {
        console.log('open image config')
        const editor = quillRef.current.getEditor()
        console.log(editor)
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = async () => {
            const file = input.files[0]
            if (/^image\//.test(file.type)) {
                console.log(file)
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
    const data =
        useSelector((state) => {
            console.log('test: ', state.posts?.newDetail?.summary)
            return id && !_.isEmpty(state.posts.newDetail)
                ? state.posts.newDetail
                : null
        }, shallowEqual) || initialState

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
        console.log(e.target.name, e.target.value)
        // if (data[e.target.name] === e.target.value) {
        //     return
        // }
        data[e.target.name] = e.target.value
        dispatch(
            apiAction.sendAction({
                type: apiConstants.MODIFY_OBJ,
                variable: 'newDetail',
                data: { ...data },
                workspace: postReducer.postWorkspace
            })
        )
    }

    const onSubmit = () => {
        console.log('submit')
    }
    console.log('render data', data?.summary)
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

    const types = useSelector((state) => state?.types?.typeList) || [
        { id: 1, name: 'Thông Báo' },
        { id: 2, name: 'T Báo' }
    ]

    useEffect(
        () => () => {
            apiAction.sendAction({
                type: apiConstants.CLEAR,
                variable: 'newDetail',
                workspace: postReducer.postWorkspace
            })
            console.log('unmount')
        },
        []
    )

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
                                name="title"
                                label={title}
                                // component={TextField}
                                // defaultValue={data.title}
                                value={data.title}
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
                                name="type"
                                label={title}
                                value={data.type || 0}
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
                                value={data.summary}
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
                    modules={modules}
                    ref={quillRef}
                    value={data.content}
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
const mapState = (state) => {
    return state?.posts?.newDetail
}

const actionCreators = {
    fetchDetail: postActions.fetchDetail,
    sendAction: apiAction.sendAction
}
// const EditForm = reduxForm({ form: 'edit-news' })(EditNewsView)
export const EditNews = connect(mapState, actionCreators)(EditNewsView)
