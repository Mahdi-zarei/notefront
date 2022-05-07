import React from "react";
import {IOPanel} from "./IO Class";
import {Note} from "./Note Class";
import {List} from "./List Class";
import {send_and_receive} from "./API";
import {NoteView} from "./NoteView"
import {add_class, remove_class, remove_element, temporarily_add_class} from "./App";

export class Main extends React.Component {
    constructor(props) {
        super(props);

        this.EDIT_MODE = {buttonFunction : this.callForEdit, buttonText : "Edit Note", buttonTextReset : "Discard", resetFunction : this.ADDER_STATE
        }
        this.NEW_MODE = {buttonFunction : this.callForCreate, buttonText: "Add note", buttonTextReset: "Clear", resetFunction : this.clear_inputs
        }

        this.state = { list : [], Mode : this.NEW_MODE, capture: false, isShowing: false, info: ""}
        this.INPREF = React.createRef()
        this.LISTREF = React.createRef()
        this.viewerRef = React.createRef()
        this.mainRef = React.createRef()
        this.infoRef = React.createRef()
        this.infoTimeout = null
        this.add_Note.bind(this)
        this.prep_edit.bind(this)
        this.handleEdit.bind(this)
        this.handleAdd.bind(this)
        this.handleClick.bind(this)
        this.InitializeNotes.bind(this)
        this.handleDelete.bind(this)

        this.selected_id = -1
    }

    prepShow = () => {
        add_class(this.mainRef, "blurIt")
    }

    cleanShow = () => {
        remove_class(this.mainRef, "blurIt")
        add_class(this.mainRef, "clearIt")
        setTimeout( () => {
            remove_class(this.mainRef, "clearIt")
        }, 390)
    }

    componentDidMount() {
        send_and_receive({}, "GetNotes", this.InitializeNotes, true)
    }

    handleClick = () => {
        if(this.state.capture) this.hideNote()
    }

    InitializeNotes = (Data) => {
        if (Data.Status === "ERROR") {
            this.notify("Could not load Notes. Try reloading the page")
            return
        }
        let Notes = Data.Response
        let TmpList = []
        for (let i = 0; i < Notes.length; i++) {
            let TmpNote = JSON.parse(Notes[i])
            TmpList.push(TmpNote)
        }
        this.setState( (state) => ({
            list : TmpList
        }) )
    }

    callForCreate = () => {
        let Data = this.get_inpData()
        if (Data.Subject === "" && Data.Content === "") {
            this.notify("Both title and Content cannot be left empty!")
            return
        }
        send_and_receive(Data, "AddNote", this.handleAdd, true)
    }

    handleAdd = (response) => {
        if (response.Status === "ERROR") {
            this.notify("Failed to add the note. Please try again.")
            return
        }
        let TmpNote = JSON.parse(response.Response)
        this.add_Note(TmpNote)
    }

    add_Note = (Data) => {
        this.setState( (state) => ({
            list : state.list.concat(Data)
        }))
        this.notify("Note added")
    }

    get_inpData = () => {
        let Data = this.INPREF.current.get_data()
        return Data
    }

    callForEdit = () => {
        let Data = this.get_inpData()
        Data.Id = this.selected_id
        send_and_receive(Data, "EditNote", this.handleEdit, true)
        this.ADDER_STATE()
    }

    handleEdit = (response) => {
        if (response.Status === "ERROR") {
            this.notify("An error occurred while updating the Note, try again.")
            return
        }
        let TmpNote = JSON.parse(response.Response)
        this.edit_note(TmpNote)
    }

    edit_note = (Data) => {
        // make a copy of state.list and change the needed index
        let tmp = this.state.list
        let ind = this.find_note(Data.Id)
        tmp[ind] = Data
        // change the state.list
        this.setState( () => ({
            list : tmp
        }))
        this.notify("Note edited successfully")
    }

    select_note = (id) => {
        this.ADDER_STATE()
        this.selected_id = id
        let note = this.state.list[this.find_note(id)]
        this.showNote(note)
    }

    callForDelete = () => {
        let Data = {Id: this.selected_id}
        send_and_receive(Data, "DeleteNote", this.handleDelete, true)
    }

    handleDelete = (response) => {
        if (response.Status === "ERROR") return
        this.hideNote()
        if (this.selected_id === response.Response) this.ADDER_STATE()
        this.delete_note(response.Response)
    }

    delete_note = (id) => {
        let ind = this.find_note(id)
        let tmp = remove_element(this.state.list, ind)
        this.setState( (state) => ({
            list: tmp
        }))
        this.notify("Note deleted")
    }

    notify = (info) => {
        this.setState( (state) => ({
            info: info
        }))
        add_class(this.infoRef, "infoClassShow")
        clearTimeout(this.infoTimeout)
        this.infoTimeout = setTimeout(this.remove_info, 2000)
    }

    remove_info = () => {
        remove_class(this.infoRef, "infoClassShow")
        temporarily_add_class(this.infoRef, "infoClassHide",780)
    }

    showNote = (Data) => {
        if (this.state.isShowing) return
        this.prepShow()
        this.setState( (state) => ({
            isShowing: true
        }))
        this.viewerRef.current.showNote(Data)
        setTimeout( () => {
            this.setState( (state) => ({
                capture: true
            }))
        }, 100)
    }

    hideNote = () => {
        this.viewerRef.current.hideNote()
        this.cleanShow()
        this.setState( (state) => ({
            capture: false, isShowing: false
        }))
    }

    prep_edit = () => {
        this.hideNote()
        let ind = this.find_note(this.selected_id)
        let data = this.state.list[ind]

        this.INPREF.current.fill(data)
        this.EDITER_STATE()
    }

    find_note = (Id) => {
        for (let i = 0; i < this.state.list.length; i++) {
            if (this.state.list[i].Id === Id) return i
        }
    }

    EDITER_STATE = () => {
        this.setState( (state) => ({
            Mode : this.EDIT_MODE
        }))
    }

    ADDER_STATE = () => {
        this.clear_inputs()
        this.setState( (state) => ({
            Mode : this.NEW_MODE
        }))
    }

    clear_inputs = () => {
        let filler = {Subject: "", Content: ""}
        this.INPREF.current.fill(filler)
    }

    render() {
        return(
            <div onClick={this.handleClick}>
                <div ref={this.infoRef} className={"infoClassDefault"}> {this.state.info} </div>
                <NoteView ref={this.viewerRef} edit_call={this.prep_edit} delete_call={this.callForDelete}/>
                <div ref={this.mainRef}>
                    <IOPanel ref={this.INPREF} ContainerClass={"IOContainer"} resetFunction={this.state.Mode.resetFunction} passUp={this.state.Mode.buttonFunction} ButtonTextApply={this.state.Mode.buttonText}
                    ButtonTextReset={this.state.Mode.buttonTextReset} ButtonClass={"ButtonClass"}> </IOPanel>
                    <List ref={this.LISTREF} mainClass={"listClass"} titleClass={"titleClass"} titleText={"Notes"}> {this.state.list.map( (item) => (
                        <Note hoverClass={"noteHover"} mainClass={"NoteCont"} callBack={this.select_note} identifier={item.Id} key={item.Id} content={item.Content} subject={item.Subject} date={item.Date}> </Note>
                    ))} </List>
                </div>
            </div>
        )
    }

}