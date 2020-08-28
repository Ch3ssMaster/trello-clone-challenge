import React, { useState, useContext } from 'react'
import { Paper, InputBase, Button, IconButton } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'
import storeApi from '../../Utils/storeApi'

const useStyle = makeStyles((theme) => ({
    input: {
        margin: theme.spacing(1),
    },
    inputCard: {
        margin: theme.spacing(0, 1, 1, 1),
        paddingBottom: theme.spacing(4),
    },
    btnConfirm: {
        backgroundColor: '#28a745',
        borderColor: '#28a745',

        color: '#fff',
        "&:hover": {
            backgroundColor: fade('#218838', 0.80),
            borderColor: fade('#1e7e34', 0.80),
        }
    },
    confirm: {
        margin: theme.spacing(0, 1, 1, 1),
    }
}))
export default function InputCard({ setOpen, listId, type }) {
    const classes = useStyle();
    const { addMoreCards, addMoreLists } = useContext(storeApi);
    const [cardTitle, setCardTitle] = useState('')
    const handleOnChange = (e) => {
        setCardTitle(e.target.value)
    }
    const handleBtnConfirm = () => {
        if (type === 'Card') {

            let cardAdded = false
            if (cardTitle !== '') {
                cardAdded = addMoreCards(cardTitle, listId)
            }
            if (cardAdded) {
                setCardTitle('')
            }
        }
        if (type === 'list') {
            let listAdded = false
            if (cardTitle !== '') {
                listAdded = addMoreLists(cardTitle)
            }
            if (listAdded) {
                setCardTitle('')
            }
        }
        setOpen(false)

    }

    const handleBlur = () => {
        if (cardTitle !== '') {
            if (type === 'Card') {

                let cardAdded = false
                if (cardTitle !== '') {
                    cardAdded = addMoreCards(cardTitle, listId)
                }
                if (cardAdded) {
                    setCardTitle('')
                }
            }
            if (type === 'list') {
                let listAdded = false
                if (cardTitle !== '') {
                    listAdded = addMoreLists(cardTitle)
                }
                if (listAdded) {
                    setCardTitle('')
                }
            }
        }
        setOpen(false)
    }

    return (
        <div>
            <div>
                <Paper className={classes.inputCard} elevation={0}>
                    <InputBase
                        multiline
                        fullWidth
                        onChange={handleOnChange}
                        onBlur={handleBlur}
                        inputProps={{
                            className: classes.input,
                        }}
                        value={cardTitle}
                        placeholder={type === 'list' ?
                            "Add another list" :
                            "Add a title for this card..."} />
                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button className={classes.btnConfirm}
                    onClick={handleBtnConfirm}>
                    {type === 'list' ?
                        'Add another list' :
                        'Add another Card'}

                </Button>
                <IconButton onClick={() => setOpen(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}