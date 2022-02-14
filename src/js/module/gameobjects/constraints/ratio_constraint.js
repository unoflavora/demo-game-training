import Constraint from './constraint';

export default class RatioConstraint extends Constraint {

    /**
     * @param {number} [ratio] Width / Height. Default to asset ratio
     */
    constructor(ratio) {
        super();

        /** @private @type {number|undefined} */
        this._ratio = ratio;
    }

    /** Function to execute constraint */
    execute = () => {
        switch (this._reference.type) {
            case "WIDTH":
                {
                    if (this._ratio) {
                        let height = this._parent.bottomleft.y - this._parent.topleft.y;
                        let width = height * this._ratio;
                        this._reference.transform.setDisplayWidth(width, false);
                    } else {
                        this._reference.transform.setDisplayWidthToAspectRatio();
                    }
                    break;
                }
            case "HEIGHT":
                {
                    if (this._ratio) {
                        let width = this._parent.topright.x - this._parent.topleft.x;
                        let height = width / this._ratio;
                        this._reference.transform.setDisplayHeight(height, false);
                    } else {
                        this._reference.transform.setDisplayHeightToAspectRatio();
                    }
                    break;
                }
        }
    }
}