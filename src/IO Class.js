import {Input} from "./Input Class";
import {TextArea} from "./TextArea Class";
import React from "react";

export class IOPanel extends React.Component {
    constructor(props) {
        super(props);

        this.SubjRef = React.createRef()
        this.ContRef = React.createRef()
        this.fill.bind(this)
    }

    apply_button = () => {
        this.props.passUp()
    }

    get_data = () => {
        let subj = this.SubjRef.current.flushData(true)
        let cont = this.ContRef.current.flushData(true)
        let Data = {Subject : subj, Content : cont}
        return Data
    }

    fill = (data) => {
        this.SubjRef.current.set_data(data.Subject)
        this.ContRef.current.set_data(data.Content)
    }

    reset_trigger = () => {
        this.props.resetFunction()
    }

    render() {
        return (
            <div className={this.props.ContainerClass}>
                <Input ref={this.SubjRef} mainClass={"InpContainer"} labelClass={"labelClass"}
                       labelData={"Title:"} inpClass={"InpBox"} placeH={"Title"} Type={"text"}> </Input>
                <TextArea mainClass={"TextAreaClassWrapper"} TextAreaClass={"TextAreaClass"} ref={this.ContRef} labelClass={"labelClass"} placeH={"Type a Note"} labelText={"Type a Note"}> </TextArea>
                <div className={"ButtonContainer"}>
                    <button className={this.props.ButtonClass} onClick={this.apply_button}> {this.props.ButtonTextApply} </button>
                    <button className={this.props.ButtonClass} onClick={this.reset_trigger}> {this.props.ButtonTextReset} </button>
                </div>

            </div>
        )
    }

}