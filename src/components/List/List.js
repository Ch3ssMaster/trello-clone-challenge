import React from 'react'
import { Paper, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Title from './Title'
import Card from '../Card'
import InputContainer from '../Input/InputContainer'

const useStyle = makeStyles((theme) => ({
    root: {
        minWidth: '300px',
        backgroundColor: '#ebecf0',
        marginLeft: theme.spacing(1),
    }
}))
export default function List({ list }) {
    const classes = useStyle();
    return (
        <div>
            <Paper className={classes.root}>
                <CssBaseline />
                <Title title={list.title} listId={list.id}/>
                {list.Cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
                <InputContainer listId={list.id} type="Card" />
            </Paper>
        </div>
    )
}