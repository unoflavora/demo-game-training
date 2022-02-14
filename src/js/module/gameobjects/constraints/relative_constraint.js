import Constraint from './constraint';

export default class RelativeConstraint extends Constraint {

    /**
     * @param {number} percentage Relative Percentage, calculated from top left for position
     */
    constructor(percentage) {
        super();

        /** @private @type {number} */
        this._percentage = percentage;
    }

    /** Function to execute constraint */
    execute = () => {
        switch (this._reference.type) {
            case "X":
                {
                    let length = this._parent.topright.x - this._parent.topleft.x;
                    let pos = this._parent.topleft.x + (this._percentage * length);
                    this._reference.transform.gameobject.x = pos;
                    break;
                }
            case "Y":
                {
                    let length = this._parent.bottomleft.y - this._parent.topleft.y;
                    let pos = this._parent.topleft.y + (this._percentage * length);
                    this._reference.transform.gameobject.y = pos;
                    break;
                }
            case "WIDTH":
                {
                    let length = this._parent.topright.x - this._parent.topleft.x;
                    let width = this._percentage * length;
                    this._reference.transform.setDisplayWidth(width, false);
                    break;
                }
            case "HEIGHT":
                {
                    let length = this._parent.bottomleft.y - this._parent.topleft.y;
                    let height = this._percentage * length;
                    this._reference.transform.setDisplayHeight(height, false);
                    break;
                }
        }
    }
}