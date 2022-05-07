import {Subject} from "./Subject Class";
import {Body} from "./Body Class";
import React from "react";
import {add_class} from "./App";
import {remove_class} from "./App";

export class Note extends React.Component {
    constructor(props) {
        super(props);

        this.subjectRef = React.createRef()
        this.contentRef = React.createRef()
        this.mainRef = React.createRef()
    }

    highLight_switch = (signal) => {
        if (signal) {
            add_class(this.mainRef, this.props.hoverClass)
            this.subjectRef.current.highLight_switch(true)
        }
        else {
            remove_class(this.mainRef, this.props.hoverClass)
            this.subjectRef.current.highLight_switch(false)
        }
    }

    deliver_id = () => {
        this.props.callBack(this.props.identifier)
    }

    render() {
        return(
            <div className={this.props.mainClass} onClick={this.deliver_id} ref={this.mainRef}
            onMouseOver={() => {this.highLight_switch(true)}} onMouseLeave={() => {this.highLight_switch(false)}}>
                <Subject hoverClass={"subjHover"} mainClass={"subjectClass"} content={this.props.subject} ref={this.subjectRef}> </Subject>
                <Body mainClass={"contentClass"} innerClass={"innerContent"} content={this.props.content} ref={this.contentRef}> </Body>
            </div>
        )
    }
}