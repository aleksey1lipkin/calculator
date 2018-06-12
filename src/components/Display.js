import React from "react";
import {getElementWidth} from "../helpers";

class Display extends React.Component {
    state = {
        displayWidth: null,
        resultWidth: null,
        scale: 1,
    };
    result = React.createRef();
    display = React.createRef();
    componentDidMount() {
        this.setState({
            displayWidth: getElementWidth(this.display.value),
            resultWidth: getElementWidth(this.result.value)
        });
    };
    componentDidUpdate() {
        let {displayWidth, resultWidth, scale} = this.state;
        let actualResultWidth = getElementWidth(this.result.value);
        if (actualResultWidth !== resultWidth) {
            this.setState({
                resultWidth: actualResultWidth
            })
        }
        let actualScale = displayWidth / resultWidth;

        if (scale === actualScale) {
            return false;
        }
        if (actualScale < 1) {
            this.setState({
                scale: actualScale,
                resultWidth: resultWidth
            })
        } else if (scale < 1) {
            this.setState({
                scale: 1,
                resultWidth: resultWidth
            })
        }
    }
    render() {
        return (
            <div className="calc-display" ref={this.display}>
                <span
                    className="calc-result"
                    ref={this.result}
                    style={{transform: `scale(${this.state.scale}, ${this.state.scale})`}}
                >
                    {this.props.result}
                </span>
            </div>
        )
    }
}
export default Display;