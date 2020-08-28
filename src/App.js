import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import List from './components/List/List'
import store from './Utils/store'
import storeApi from './Utils/storeApi'
import InputContainer from './components/Input/InputContainer'
import { makeStyles } from '@material-ui/core/styles'
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#0079BF',
    padding: theme.spacing(1.75, 2),
    overflowY: 'auto',
    color: 'white',
    fontWeight: 'light'
  },
  listContainer: {
    display: 'flex',

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
    setData(newState)
    return true
  }
  const updateListTitle = (title, listId) => {
    const list = data.lists[listId]
    list.title = title
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    }
    setData(newState)
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }
    if (type === 'list') {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return;
    }

    const sourceList = data.lists[source.droppableId]
    const destinationList = data.lists[destination.droppableId]
    const draggingCard = sourceList.Cards.filter(
      (card) => card.id === draggableId
    )[0]

    if (source.droppableId === destination.droppableId) {
      sourceList.Cards.splice(source.index, 1)
      destinationList.Cards.splice(destination.index, 0, draggingCard)
      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        }
      }
      setData(newState)
    } else {
      sourceList.Cards.splice(source.index, 1)
      destinationList.Cards.splice(destination.index, 0, draggingCard)
      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        }
      }
      setData(newState)
    }
  }

  return (
    <storeApi.Provider value={{ addMoreCards, addMoreLists, updateListTitle }}>
      <div className={classes.root}>
      <h1>Trello Board</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='app' type='list' direction='horizontal'>
            {(provided) => (
              <div className={classes.listContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}>

                {data.listIds.map((listId, index) => {
                  const list = data.lists[listId]
                  return <List list={list} key={listId} index={index} />
                })}
                <InputContainer type="list" />
                {provided.placeholder}
              </div>
            )}

          </Droppable>
        </DragDropContext>
      </div>
    </storeApi.Provider>
  )
}
