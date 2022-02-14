import Constraint from './constraint';

export default class PixelConstraint extends Constraint {

    /**
     * @param {number} pixel
     */
    constructor(pixel) {
        super();

        /** @private @type {number} */
        this._pixel = pixel;
    }

    /** Function to execute constraint */
    execute = () => {
        switch (this._reference.type) {
            case "X":
                {
                    this._reference.transform.gameobject.x = this._pixel;
                    break;
                }
            case "Y":
                {
                    this._reference.transform.gameobject.y = this._pixel;
                    break;
                }
            case "WIDTH":
                {
                    this._reference.transform.setDisplayWidth(this._pixel, false);
                    break;
                }
            case "HEIGHT":
                {
                    this._reference.transform.setDisplayHeight(this._pixel, false);
                    break;
                }
        }
    }
}