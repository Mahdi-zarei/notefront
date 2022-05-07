import React from "react";

export class Input extends React.Component {
    // to function it requires classes and data as props
    constructor(props) {
        super(props);

        this.inpRef = React.createRef()
        this.labelRef = React.createRef()
    }

    flushData = (x) => {
        let data = this.inpRef.current.value
        if (x) this.inpRef.current.value = ""
        return data
    }

    set_data = (data) => {
        this.inpRef.current.value = data
    }

    focusChange = (signal) => {
        this.labelRef.current.className = this.props.labelClass
        if (signal) {
            this.labelRef.current.className += " labelShow"
            this.inpRef.current.placeholder = ""
        } else {
            this.inpRef.current.placeholder = this.props.placeH
            this.labelRef.current.className += " labelHide"
        }
    }

    render() {
        return (
            <div className={this.props.mainClass}>
                <label className={this.props.labelClass} ref={this.labelRef}>{this.props.labelData}</label>
                <input className={this.props.inpClass} ref={this.inpRef} placeholder={this.props.placeH} type={this.props.Type}
                       onFocus={ () => { this.focusChange(true)}} onBlur={() => { this.focusChange(false)}}/>
            </div>
        )
    }
}