import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import { ListItem, ListItemText } from '@material-ui/core';
import { removeHTMLTags } from '../helpers';
import  DeleteIcon  from '@material-ui/icons/Delete';


function SidebarItemComponent(props){
    
    const {selectNote, DeleteNote, _index, _note, classes, selectedNoteIndex } = props;

    //const selectNote = (n,i) => this.props.selectNote(n,i);


    const deleteItem = (note) =>{
        if(window.confirm(`Are you sure you want to delete: ${note.title}`)){
        return DeleteNote(note);
        }
    }


        return(

            <div key={_index}>
                <ListItem
                     onClick={() => selectNote(_note,_index)}
                    className={classes.listItem}
                    selected={selectedNoteIndex === _index}
                    alignItems='flex-start'
                >
                    <div className={classes.textSection}
                   >
                        <ListItemText
                        primary={_note.title} 
                        secondary={removeHTMLTags(_note.body.substring(0,30))+'...'}></ListItemText>
                    </div>
                    <DeleteIcon onClick={()=> deleteItem(_note)}
                     className={classes.deleteIcon}></DeleteIcon>
                </ListItem>

            </div>
       
        );
}   

    
export default withStyles(styles)(SidebarItemComponent);