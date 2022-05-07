import React from "react";

export class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.mainClass}>
                <p className={this.props.innerClass}>"{this.props.content}"</p>
            </div>
        )
    }
}