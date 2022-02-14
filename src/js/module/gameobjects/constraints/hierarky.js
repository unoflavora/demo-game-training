import Transform from "../transform/transform";
import Constraint from "./constraint";
import ScreenUtilityController from "../../screenutility/screen_utility_controller";
import ScheduleController from "../../schedule/schedule_controller";

/**
 * @class
 * This class is a component to manage Gameobject UI stacking
 */
export default class Hierarky {

    /**
     * @param {Phaser.Scene} scene 
     * @param {Transform} transform 
     */
    constructor (scene, transform) {

        /** @private @type {Phaser.Scene} */
        this.scene = scene;

        /** @private @type {Transform} */
        this.transform = transform;

        /** @private @type {Array<Hierarky>} */
        this._children = []

        /** @private @type {Hierarky} */
        this._parent;

        /** @private @type {Array<Constraint>} */
        this._constraints = [];

        /** @public @readonly @type {boolean} */
        this.isAutoRecalculate = false;

    }

    /**
     * Function to add Child
     * @param {Hierarky} childHierarky
     */
    addChild = (childHierarky) => {
        childHierarky._parent = this;
        if (!this._children.includes(childHierarky)) {
            this._children.push(childHierarky);
        }
    }

    /**
     * Function to set parent
     * @param {Hierarky} parentHierarky
     */
    setParent = (parentHierarky) => {
        this._parent = parentHierarky;
        if (!this._parent._children.includes(this)) {
            this._parent._children.push(this);
        }
    }

    /**
     * Function to set auto recalculate
     * @param {boolean} value 
     */
    setAutoRecalculate = (value) => {
        this.isAutoRecalculate = value;
        if (value) {
            ScheduleController.getInstance().registerUpdate(this.recalculate);
        } else {
            ScheduleController.getInstance().removeUpdate(this.recalculate);
        }
    }

    /**
     * Function to recalculate object size and position
     */
    recalculate = () => {
        this._constraints.forEach(cons => {
            cons.setParentSquare(this._getSquare());
            cons.execute();
        });
        this._children.forEach(child => child.recalculate());
    }

    /**
     * @private
     * @returns {import("./constraintdef").Square}
     */
    _getSquare = () => {

        if (this._parent) {
            return {
                topleft : this._parent.transform.gameobject.getTopLeft(),
                topright : this._parent.transform.gameobject.getTopRight(),
                bottomleft : this._parent.transform.gameobject.getBottomLeft(),
                bottomright : this._parent.transform.gameobject.getBottomRight(),
            }
        } else {
            return {
                topleft : new Phaser.Math.Vector2(0,0),
                topright : new Phaser.Math.Vector2(ScreenUtilityController.getInstance().width,0),
                bottomleft : new Phaser.Math.Vector2(0,ScreenUtilityController.getInstance().height),
                bottomright : new Phaser.Math.Vector2(ScreenUtilityController.getInstance().width,ScreenUtilityController.getInstance().height),
            }
        }

    }

    /**
     * Function to add constraint for X Position
     * @param {Array<Constraint>} constraints
     */
    setX = (...constraints) => {
        constraints.forEach(cons => {
            cons.setConstraintType({
                transform : this.transform,
                type : "X"
            })
            this._constraints.push(cons);
        })
    }

    /**
     * Function to add constraint for Y Position
     * @param {Array<Constraint>} constraints
     */
    setY = (...constraints) => {
        constraints.forEach(cons => {
            cons.setConstraintType({
                transform : this.transform,
                type : "Y"
            })
            this._constraints.push(cons);
        })
    }

    /**
     * Function to add constraint for Display Width
     * @param {Array<Constraint>} constraints
     */
    setWidth = (...constraints) => {
        constraints.forEach(cons => {
            cons.setConstraintType({
                transform : this.transform,
                type : "WIDTH"
            })
            this._constraints.push(cons);
        })
    }

    /**
     * Function to add constraint for Display Height
     * @param {Array<Constraint>} constraints
     */
    setHeight = (...constraints) => {
        constraints.forEach(cons => {
            cons.setConstraintType({
                transform : this.transform,
                type : "HEIGHT"
            })
            this._constraints.push(cons);
        })
    }

    /**
     * Function to add constraint for Display Size
     * @param {Array<Constraint>} constraints
     */
    setSize = (...constraints) => {
        constraints.forEach(cons => {
            cons.setConstraintType({
                transform : this.transform,
                type : "SIZE"
            })
            this._constraints.push(cons);
        })
    }

}