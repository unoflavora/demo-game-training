class AnimationHelper
{
    /**
     * Function to create animation
     * @param {Phaser.Scene} scene 
     * @param {string} name Animation Key
     * @param {string} textureKey
     * @param {Array<number>} frames 
     * @param {number} framerate
     * @param {boolean} loop 
     */
    static addFrames(scene, name, textureKey, frames, framerate, loop){
        let frameList = frames.map((value => {
            return {
                key: textureKey,
                frame: value
            }
        }));

        var anim = scene.anims.create({
            key: name,
            frames: frameList,
			frameRate: framerate,
			repeat: loop
        });

        return anim;
    }

    /**
     * Function to create animation from sequence
     * @param {Phaser.Scene} scene
     * @param {string} name 
     * @param {string} textureKey 
     * @param {number} start 
     * @param {number} end 
     * @param {number} framerate 
     * @param {boolean} loop 
     */
    static AddSequence(scene, name, textureKey, start, end, framerate, loop){
        let frames = scene.anims.generateFrameNumbers(textureKey, {start, end});

        var anim = scene.anims.create({
            key: name,
            frames: frames,
			frameRate: framerate,
			repeat: (loop) ? -1 : 0
        });

        return anim;
    }

    /**
     * Function to create animation from AnimationInfo object
     * @param {Phaser.Scene} scene 
     * @param {import("../../def/custom").RameDelivery.Asset.AnimationInfo} animationInfo 
     */
    static AddAnimation(scene, animationInfo) {
        return this.AddSequence(scene, animationInfo.key,
            animationInfo.spritesheet, animationInfo.start, animationInfo.end,
            animationInfo.frameSpeed, animationInfo.loop);
    }

    /**
     * Function to add several animations for one scene
     * @param {Phaser.Scene} scene 
     * @param {Object} animationListObject Custom object containing the animations
     */
    static AddAnimationList(scene, animationListObject) {
        for (let animKey in animationListObject) {
            let anim = animationListObject[animKey];

            //ignore prototype properties
            if (!animationListObject.hasOwnProperty(animKey)) {
                continue;
            }

            this.AddAnimation(scene, anim);
        }
    }
}

export {AnimationHelper}