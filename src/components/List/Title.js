import React, { useState, useContext } from 'react'
import { Typography, InputBase } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz'
import storeApi from '../../Utils/storeApi'

const useStyle = makeStyles((theme) => ({
    editableTitleContainer: {
        margin: theme.spacing(1),
        paddingTop: theme.spacing(1.25),
        display: 'flex'
    },
    editableTitle: {
        flexGrow: 1,
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    input: {
        margin: theme.spacing(1),
        '&:focus': {
            backgroundColor: fade('#ddd', 0.75),
        },
        fontSize: '1.2rem',
        fontWeight: 'bold',
    }
}))
export default function Title({ title, listId }) {
    const [open, setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const {updateListTitle} = useContext(storeApi)
    const classes = useStyle()
    const handleOnChange = (e) => {
        setNewTitle(e.target.value)
    }
    const handleOnBlur = () => {
        updateListTitle(newTitle, listId)
        setOpen(false)
    }
   
    return (
        <div>
            {
                open ? (
                    <div>
                        <InputBase
                            onChange={handleOnChange}
                            autoFocus
                            value={newTitle}
                            inputProps={{
                                className: classes.input,
                            }} fullWidth
                            onBlur={handleOnBlur} />
                    </div>

                ) : (

                        <div className={classes.editableTitleContainer}>
                            <Typography
                                onClick={() => setOpen(!open)}
                                className={classes.editableTitle}>
                                {title}
                            </Typography>
                            <MoreHorizonIcon />
                        </div>
                    )
            }
        </div>
    )
}