import ReactQuill from "react-quill";
import React, {useEffect ,useState} from 'react';
import debounce from '../helpers';
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import BorderColorIcon from '@material-ui/icons/BorderColor';

function EditorComponent (props){
    
           const [ text, setText] =useState('');
           const [ title, setTitle] =useState('');
           const [ id, setId] =useState('');
           
           const { classes , selectedNote, selectedNoteIndex, notes } = props;

    useEffect ( () => {
        setText(selectedNote.body);
        setTitle(selectedNote.title);
        setId(selectedNote.id)
        
    },[ ]);

    const updateTitle = async (txt) => {
        await 
        setTitle(txt);
        update();
      };


       
    const updateBody = async (val) => {
        await setText(val);
        update();
    };



    const  update = debounce(()=>{
        props.noteUpdate(id, {
            title: title,
            body: text
        })
    },1500);

    
     return(
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input
                className={classes.titleInput}
                placeholder='Note title...'
                value={title ? title : ''}
                onChange={(e) => updateTitle(e.target.value)}>
                 </input>
                <ReactQuill 
                value={text}
                onChange={updateBody}>

                </ReactQuill>
            </div>
        )

    
} 

export default withStyles(styles)(EditorComponent);