import React , { useState, useEffect }  from 'react';
import './App.css';
import EditorComponent from './editor/editor';
import db from './firebase_config';
import firebase from 'firebase';
import 'firebase/firestore';
import SidebarComponent from './sidebar/sidebar';

function App(){

  const [selectedNoteIndex,setSelectedNoteIndex] = useState(null);
  const [selectedNote,setSelectedNote] = useState(null);
  const [notes,setNotes] = useState(null)


  useEffect (()=>{
    db.collection('notes').onSnapshot(serverUpdate => {
     
      const notes = serverUpdate.docs.map(_doc =>{
     
        const data = _doc.data();
        data['id'] =_doc.id;
        return data;
      });
      console.log(notes);
      setNotes(notes);
    });
 },[]);



 const selectNote = (note,index) => {
   console.log(note,index);
   setSelectedNote(note);
   setSelectedNoteIndex(index)
 };



 const noteUpdate = (id, noteObj) => {
  db.collection('notes').doc(id).update({
    title: noteObj.title,
    body: noteObj.body,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
};


const newNote = async (title) => {
  const note ={
    title: title,
    body: ''
  };
  const newFromDB = await db.collection("notes").add({
    title: note.title,
    body :note.body,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  const newID = newFromDB.id;
  await setNotes([...notes, note]);
  const newNoteIndex = notes.indexOf(notes.filter(_note => _note.id === newID)[0]);
  setSelectedNote(notes[newNoteIndex]);
  setSelectedNoteIndex(newNoteIndex)
};



const deleteNote =async (note) => {
  const noteIndex = notes.indexOf(note);
  await setNotes(notes.filter(_note => _note !== note));
  if(selectedNoteIndex === noteIndex)
  {
    setSelectedNoteIndex(null);
     setSelectedNote(null);

  }
  else {
    notes.length > 1 ?
    selectNote(notes[selectedNoteIndex-1], selectedNoteIndex -1 ) :
    setSelectedNoteIndex( null) ;
    setSelectedNote(null);
  }

  db.collection('notes')
  .doc(note.id)
  .delete();
}



  return(
    <div className="app">
      <SidebarComponent
      selectedNoteIndex={selectedNoteIndex}
      notes={notes}
      selectNote={selectNote}
      deleteNote={deleteNote}
      newNote={newNote}
      >
      </SidebarComponent>
      
      {
        selectedNote ?
        <EditorComponent
       selectedNote={selectedNote}
       selectedNoteIndex={selectedNoteIndex}
       notes={notes}
       noteUpdate={noteUpdate}></EditorComponent> : null
      }
      
      
    </div>
  );

}



export default App;
