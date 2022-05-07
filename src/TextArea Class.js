import React from "react";
import {add_class} from "./App";

export class TextArea extends React.Component {
    constructor(props) {
        super(props);

        this.InpRef = React.createRef()
        this.labelRef = React.createRef()
    }

    flushData = () => {
        let data = this.InpRef.current.value
        this.InpRef.current.value = ""
        return data
    }

    set_data = (data) => {
        this.InpRef.current.value = data
    }

    focusChange = (signal) => {
        this.labelRef.current.className = this.props.labelClass
        if (signal) {
            add_class(this.labelRef, "labelShow")
            this.InpRef.current.placeholder = ""
        } else {
            add_class(this.labelRef, "labelHide")
            this.InpRef.current.placeholder = this.props.placeH
        }
    }

    render() {
        return (
            <div className={this.props.mainClass}>
                <label className={this.props.labelClass} ref={this.labelRef}>{this.props.labelText}</label>
                <textarea className={this.props.TextAreaClass} ref={this.InpRef} defaultValue={""} placeholder={this.props.placeH}
                onFocus={() => {this.focusChange(true)}} onBlur={() => {this.focusChange(false)}}/>
            </div>
        )
    }
}