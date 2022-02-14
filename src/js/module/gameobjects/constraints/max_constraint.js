import Constraint from './constraint';

export default class MaxConstraint extends Constraint {

    constructor() {
        super();

    }

    /** Function to execute constraint */
    execute = () => {
        switch (this._reference.type) {
            case "SIZE":
                {
                    let parentwidth = this._parent.topright.x - this._parent.topleft.x;
                    let parentheight = this._parent.bottomleft.y - this._parent.topleft.y;
                    if (this._reference.transform.displayWidth > parentwidth || this._reference.transform.displayHeight > parentheight) {
                        this._reference.transform.setMaxPreferredDisplaySize(parentwidth, parentheight);
                    }
                    break;
                }
        }
    }
}