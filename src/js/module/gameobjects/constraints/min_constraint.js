import Constraint from './constraint';

export default class MinConstraint extends Constraint {

    /**
     * @param {number} minWidth 
     * @param {number} minHeight 
     */
    constructor(minWidth, minHeight) {
        super();

        this._minWidth = minWidth;
        this._minHeight = minHeight;

    }

    /** Function to execute constraint */
    execute = () => {
        switch (this._reference.type) {
            case "SIZE":
                {
                    if (this._reference.transform.displayWidth < this._minWidth || this._reference.transform.displayHeight < this._minHeight) {
                        this._reference.transform.setMinPreferredDisplaySize(this._minWidth, this._minHeight);
                    }
                    break;
                }
        }
    }
}