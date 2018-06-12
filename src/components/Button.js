import React from "react";

class Button extends React.Component {
    handleClick = () => {
        this.props.addToCalculate(this.props.text);
    };
    render() {
        const { className } = this.props;
        return (
            <div className={`calc-key ${className}`} onClick={this.handleClick}>
                {this.props.text}
            </div>
        )
    }
}
export default Button;