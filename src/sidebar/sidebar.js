import React , {useState} from 'react';
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import { Button,  Divider,  List } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

function SidebarComponent (props){
   
    const [addingNote, setAddingNote] = useState(false);
    const [ title , setTitle ] = useState(null);
        
    const { selectNote , notes, classes, selectedNoteIndex} = props;

    const newNoteBtnClicked = ()=>
    {
        setTitle(null);
        setAddingNote(!addingNote)
    }

    const newNote = ()=>{
       props.newNote(title)
       newNoteBtnClicked()
    }


    const updateTitle = (txt) =>{
        setTitle(txt);
    }

    const DeleteNote = (note)=> props.deleteNote(note);

        if(notes){
            return(
                <div className={classes.sidebarContainer}>
                    <Button
                    onClick={newNoteBtnClicked}
                    className={classes.newNoteBtn}>
                        {addingNote ? 'Cancel': 'New Note'}
                    </Button>
                    {
                        addingNote ? (
                        <div>
                            <input type='text'
                            className={classes.newNoteInput}
                             placeholder="Enter the title for new note"
                             onKeyUp={(e) => updateTitle(e.target.value)} ></input>
                        <Button 
                        className={classes.newNoteSubmitBtn}
                        onClick={newNote}>Submit Note</Button>
                         </div> ) : 
                         null
                    }
                    <List>
                        {
                            notes.map((_note , _index) => {
                                return(
                                    <div key={_index}>
                                        <SidebarItemComponent
                                            _note={_note}
                                            _index={_index}
                                            selectedNoteIndex={selectedNoteIndex}
                                            selectNote={selectNote}
                                            DeleteNote={DeleteNote}
                                        >
                                        </SidebarItemComponent>
                                        <Divider></Divider>
                                    </div>
                                )
                            })
                        }
                    </List>
                </div>
                );
                
                }
                else{
                    return( <div></div> )
        }
}


export default withStyles(styles)(SidebarComponent);