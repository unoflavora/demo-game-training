import Transform from "../transform/transform"

declare type ConstraintType = {
    type : 'X' | 'Y' | 'WIDTH' | 'HEIGHT' | 'SIZE',
    transform : Transform
}

declare type Square = {
    topleft : Phaser.Math.Vector2,
    topright : Phaser.Math.Vector2,
    bottomleft : Phaser.Math.Vector2,
    bottomright : Phaser.Math.Vector2,
}