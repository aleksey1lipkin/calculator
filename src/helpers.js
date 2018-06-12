export const performOperation = (operand, prevValue, currentValue) => {
    let result = "";
    prevValue = deleteSpace(prevValue);
    currentValue = deleteSpace(currentValue);
    switch (operand) {
        case "+":
            result = parseFloat(prevValue) + parseFloat(currentValue);
            break;
        case "-":
            result = parseFloat(prevValue) - parseFloat(currentValue);
            break;
        case "÷":
            result = parseFloat(prevValue) / parseFloat(currentValue);
            break;
        case "x":
            result = parseFloat(prevValue) * parseFloat(currentValue);
            break;
        default:
            result = parseFloat(prevValue);
    }
    return addSpace(result);
};
export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
export const getElementWidth = (element) => {
    let fullWidth = element.clientWidth;
    let computedStyle = getComputedStyle(element);
    return fullWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
};
export const addSpace = (number) => {
    return String(deleteSpace(number)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
};
export const deleteSpace = (number) => {
    return String(number).replace(/\s/g, "");
};

