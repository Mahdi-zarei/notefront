import React from "react";

export class List extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className={this.props.mainClass}>
                <div className={this.props.titleClass} >{this.props.titleText}</div>
                {this.props.children}
            </div>
        )
    }
}