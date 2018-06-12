import React from "react";
import Header from "./Header";
import Display from "./Display";
import Button from "./Button";
import {performOperation, isNumeric, addSpace} from "../helpers";

class App extends React.Component {
    state = {
        result: "0",
        buffer : "",
        operand : "",
        waitingForOperand: true
    };
    addToCalculate = (value) => {
        if (isNumeric(value)) {
            this.addDigit(value);
        } else {
            switch (value) {
                case ".":
                    this.addDot();
                    break;
                case "±":
                    this.changeSign();
                    break;
                case "%":
                    this.calcPercentage();
                    break;
                case "AC":
                case "C":
                    this.clearResult();
                    break;
                default:
                    this.addOperand(value);
            }
        }
    };
    addDigit = (digit) => {
        let {result, waitingForOperand} = this.state;
        if (waitingForOperand === false) {
            result = digit;
            waitingForOperand = true;
        } else {
            if (result === "0") {
                result = digit;
            } else {
                result +=digit;
            }
        }
        this.setState({
            result: addSpace(result),
            waitingForOperand : waitingForOperand
        })
    };
    addOperand = (nextOperand) => {
        let {buffer, result, operand, waitingForOperand} = this.state;
        if (waitingForOperand === false) {
            operand = nextOperand;
            this.setState({
                operand: operand
            })
        } else {
            if (buffer) {
                result = performOperation(operand, buffer, result);
                buffer = result;
            } else {
                buffer = result;
            }
            this.setState({
                result: String(result),
                buffer: String(buffer),
                operand: nextOperand,
                waitingForOperand : false
            })
        }
    };
    addDot = () => {
        let {result} = this.state;
        if (result.indexOf(".") === -1) {
            result += ".";
            this.setState({
                result: result,
                waitingForOperand: true
            })
        }
    };
    changeSign = () => {
        let {result} = this.state;
        result = parseFloat(result) * -1;
        this.setState({
            result: String(result)
        })
    };
    clearResult = () => {
        let {result} = this.state;
        if (result === "0") {
            this.setState({
                result: "0",
                buffer : "",
                operand : "",
                waitingForOperand: true
            })
        } else {
            this.setState({
                result: "0"
            })
        }
    };
    calcPercentage = () => {
        let {result} = this.state;
        result = parseFloat(result) / 100;
        this.setState({
            result: String(result)
        })
    };
    render() {
        return (
            <div className="calc">
                <Header title="Simple Calculator" />
                <div className="calc-content">
                    <Display result={this.state.result} />
                    <div className="calc-panel">
                        <div className="digit-keys">
                            <Button addToCalculate={this.addToCalculate} className="key-0" text="0" />
                            <Button addToCalculate={this.addToCalculate} className="key-dot" text="." />
                            <Button addToCalculate={this.addToCalculate} className="key-1" text="1" />
                            <Button addToCalculate={this.addToCalculate} className="key-2" text="2" />
                            <Button addToCalculate={this.addToCalculate} className="key-3" text="3" />
                            <Button addToCalculate={this.addToCalculate} className="key-4" text="4" />
                            <Button addToCalculate={this.addToCalculate} className="key-5" text="5" />
                            <Button addToCalculate={this.addToCalculate} className="key-6" text="6" />
                            <Button addToCalculate={this.addToCalculate} className="key-7" text="7" />
                            <Button addToCalculate={this.addToCalculate} className="key-8" text="8" />
                            <Button addToCalculate={this.addToCalculate} className="key-9" text="9" />
                            <div className="extra-keys">
                                <Button
                                    addToCalculate={this.addToCalculate}
                                    className="key-clear"
                                    text={this.state.result === "0" ? "AC" : "C"}
                                />
                                <Button addToCalculate={this.addToCalculate} className="key-sign" text="±" />
                                <Button addToCalculate={this.addToCalculate} className="key-rate" text="%" />
                            </div>
                        </div>
                        <div className="operator-keys">
                            <Button addToCalculate={this.addToCalculate} className="key-divide" text="÷" />
                            <Button addToCalculate={this.addToCalculate} className="key-multiple" text="x" />
                            <Button addToCalculate={this.addToCalculate} className="key-minus" text="-" />
                            <Button addToCalculate={this.addToCalculate} className="key-add" text="+" />
                            <Button addToCalculate={this.addToCalculate} className="key-equal" text="=" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;