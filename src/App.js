import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import List from './components/List/List'
import store from './Utils/store'
import storeApi from './Utils/storeApi'
import InputContainer from './components/Input/InputContainer'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#0079BF',
    padding: theme.spacing(1.75, 2),
    overflowY:'auto',
  }
}))

export default function App() {
  const [data, setData] = useState(store)
  const classes = useStyle()
  const addMoreCards = (title, listId) => {
    const newCardId = uuid()
    const newCard = {
      id: newCardId,
      title,
    }
    const list = data.lists[listId]
    list.Cards = [...list.Cards, newCard]

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      }
    }
    setData(newState)
    return true
  }

  const addMoreLists = (title) => {
    const newListId = uuid()
    const newList = {
      id: newListId,
      title,
      Cards: [],
    }
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList
      }

    }
    console.log(newState)
    setData(newState)
  }
  const updateListTitle = (title, listId) => {
    const list = data.lists[listId]
    list.title = title
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]:list
      }
    }
    setData(newState)
  }
  return (
    <storeApi.Provider value={{ addMoreCards, addMoreLists, updateListTitle }}>

      <div className={classes.root}>
        {data.listIds.map((listId) => {
          const list = data.lists[listId]
          return <List list={list} key={listId} />
        })}
        <InputContainer type="list" />
      </div>
    </storeApi.Provider>
  )
}
