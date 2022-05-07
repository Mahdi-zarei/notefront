import React from "react";
import {add_class} from "./App";
import {remove_class} from "./App";

export class Subject extends React.Component {
    constructor(props) {
        super(props);

        this.mainRef = React.createRef()
    }

    highLight_switch = (signal) => {
        if (signal) add_class(this.mainRef, this.props.hoverClass)
        else remove_class(this.mainRef, this.props.hoverClass)
    }

    render() {
        return (
            <div ref={this.mainRef} className={this.props.mainClass}>
                "{this.props.content}"
            </div>
        )
    }
}