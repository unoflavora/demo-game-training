export default class Constraint {

    constructor() {

        /** @private @type {import("./constraintdef").ConstraintType} */
        this._reference;

        /** @private @type {import("./constraintdef").Square} */
        this._parent;

    }

    /**
     * Function to add Reference
     * @param {import("./constraintdef").ConstraintType} reference
     */
    setConstraintType = (reference) => {
        this._reference = reference;
    }

    /**
     * Function to set Parent Square
     * @param {import("./constraintdef").Square} square
     */
    setParentSquare = (square) => {
        this._parent = square;
    }

    /** Function to execute constraint */
    execute = () => {
        
    }
}