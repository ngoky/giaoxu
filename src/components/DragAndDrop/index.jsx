import { Grid } from '@mui/material'
import { useRef, useState } from 'react'
import './index.scss'

export const DragDropFile = (prop) => {
    // drag state
    const [dragActive, setDragActive] = useState(false)
    // ref
    const inputRef = useRef(null)

    const { image } = prop

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            console.log(e.dataTransfer.files)
            // handleFiles(e.dataTransfer.files);
        }
    }

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            // handleFiles(e.target.files);
            console.log(e.dataTransfer.files)
        }
    }

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click()
    }

    return (
        <Grid container>
            <Grid item xs={12} sm={6} className="DragAndDrop">
                <form
                    id="form-file-upload"
                    className="form-file-upload"
                    onDragEnter={handleDrag}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        id="input-file-upload"
                        className="input-file-upload"
                        multiple={true}
                        onChange={handleChange}
                    />
                    <label
                        id="label-file-upload"
                        htmlFor="input-file-upload"
                        className={dragActive ? 'drag-active' : ''}
                    >
                        <div>
                            <p>Drag and drop your file here or</p>
                            <button
                                className="upload-button"
                                onClick={onButtonClick}
                            >
                                Upload a file
                            </button>
                        </div>
                    </label>
                    {dragActive && (
                        <div
                            id="drag-file-element"
                            className="drag-file-element"
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        ></div>
                    )}
                </form>
            </Grid>
            <Grid item xs={12} sm={6} className="RightView">
                {image && <img src={image} alt="icon" />}
            </Grid>
        </Grid>
    )
}
