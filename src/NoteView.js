import React from "react";
import {add_class, temporarily_add_class} from "./App";
import {remove_class} from "./App";

export class NoteView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {visible: false, Data: {}, info: ""}
        this.mainRef = React.createRef()
        this.showNote.bind(this)
        this.hideNote.bind(this)
        this.handleClick.bind(this)
    }

    handleClick = (e) => {
        e.stopPropagation()
    }

    infoPrepare = (Data) => {
        console.log(Data)
        let size = Data.Content.length
        let data = `Length : ${size} Date Created: ${Data.Date}`
        return data
    }

    showNote = (Data) => {
        this.setState( (state) => ({visible: true, Data: Data, info: this.infoPrepare(Data)}))
        add_class(this.mainRef, "viewClassVisible")
    }

    hideNote = () => {
        this.setState( (state) => ({visible: false, Data: {}, info: ""}))
        remove_class(this.mainRef, "viewClassVisible")
        temporarily_add_class(this.mainRef, "viewClassHide", 390)
    }

    render() {
        return (
            <div onClick={this.handleClick} ref={this.mainRef} className={"viewClassDefault"}>
                <div className={"viewSectionClass"}> {this.state.info} </div>
                <div className={"viewSectionClass"}> {this.state.Data.Subject} </div>
                <div className={"viewSectionClass contentViewClass"}> {this.state.Data.Content} </div>
                <div className={"buttonContClass"}>
                    <button onClick={this.props.edit_call}> edit </button>
                    <button onClick={this.props.delete_call}> delete </button>
                </div>
            </div>
        );
    }

}