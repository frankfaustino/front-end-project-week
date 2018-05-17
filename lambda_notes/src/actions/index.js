import database from '../firebase.js'

export const getNotes = () => dispatch => {
  dispatch({ type: 'LOADING' })
  database
    .ref('notes')
    .on('value', snapshot => {
      const notes = Object
        .entries(snapshot.val())
        .map(([key, val]) => ({ ...val, fbId: key }))
      dispatch({ type: 'GET_NOTES', notes })
    })
}

export const addNote = (note, id) => async dispatch => {
  await database.ref('notes').push({ ...note, id })
  dispatch({ type: 'ADD_NOTE' })
}

export const deleteNote = id => async dispatch => {
  dispatch({ type: 'LOADING '})
  await database.ref(`/notes/${id}`).remove()
  dispatch({ type: 'DELETE_NOTE', id })
}

export const speechToggle = () => ({ type: 'SPEECH' })

export const addTranscript = transcript => ({ type: 'ADD_TRANSCRIPT', transcript })