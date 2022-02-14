import Constraint from './constraint';

export default class CenterConstraint extends Constraint {

    constructor() {       
        super();
    }

    /** Function to execute constraint */
    execute = () => {
        switch (this._reference.type) {
            case "X":
                {
                    let length = this._parent.topright.x - this._parent.topleft.x;
                    let pos = this._parent.topleft.x + (0.5 * length);
                    this._reference.transform.gameobject.x = pos;
                    break;
                }
            case "Y":
                {
                    let length = this._parent.bottomleft.y - this._parent.topleft.y;
                    let pos = this._parent.topleft.y + (0.5 * length);
                    this._reference.transform.gameobject.y = pos;
                    break;
                }
        }
    }
}