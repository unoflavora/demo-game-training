import { Math } from "phaser"
import Text from "../module/gameobjects/text"
import Sprite from "../module/gameobjects/sprite";

export type Config = {
    BASE_API_URL:string,
    BASE_ASSET_URL:string,
    DEVELOPMENT_BUILD:boolean,
    OFFLINE_MODE:boolean,
    AUTO_CANVAS_RESIZE:boolean,
    ENCRYPTED_KEY:string,
    CHEAT_MODE:boolean
}

declare global {
    var CONFIG: Config
    var DEVELOPMENT: boolean
    var PRODUCTION: boolean
    var PROJECT_NAME:string
    var PROJECT_VERSION:string
}


declare namespace Agate {
    namespace General {
        type RangeNumber = {
            min:Number,
            max: Number
        }
    }
    
	namespace Gameplay {
        type GameState = 'PREPARING' | 'GAME' | 'GAMEOVER';
        type ScoreData = {
            key: number,
            total: number
        };
        type GameResult = {
            score: number,
        }
        type QuestionData = {
            question: string,
            answers: Array<string>,
            answervalues: Array<number>,
            type: string,
            grade: number
        }
        type CategoryContent = {
            missions: Array<Mission>,
            category: string,
            is_unlocked: boolean
        }
        type MissionType = {
            main_missions: Array<MissionData>,
            bonus_missions: Array<MissionData>
        }
        type Mission = {
            next_map: string,
            next_map_theme: string,
            bsl_content: string,
            bsl_id: string,
            mission_name: string,
            mission_id: string,
            mission_types: MissionType
        }
        type MissionData = {
            mission: string,
            target: number
        }
        type TopicContent = {
            topic: string,
            topic_id: string,
            x: number,
            y: number,
            is_unlocked: boolean,
            category_content: Array<CategoryContent>,
        }
        type MissionContent = {
            cluster: string,
            topic_contents: Array<TopicContent>
        }
        type Question = {
            question: string,
            answers: Array<string>,
            values: Array<number>
        }
        type GradeQuestions = {
            grade: number,
            questions: Array<Question>,
        }
        type Content = {
            topic: string,
            category: string,
            grade_questions: Array<GradeQuestions>
        }
        type ContentQuiz = {
            contents: Array<Content>,
            cluster: string
        }
        type QuizData = {
            content_quiz: ContentQuiz
        }
        //Explore progress data 
        type ExploreData = {
            category: string,
            map_name: string,
            mission_target : MissionType,
            mission_current : MissionType
        }

        type SaveData = {
            mapName: string,
            dir: string,
            playerPos: Phaser.Math.Vector2,
            talkedNpc: Number []
        }

        namespace Dialogue
        {
            type ConversationData = {
                startId: number,
                startEmote: number,
                dialogueType: string,
                afterSatisfiedId: number,
                contentList: ContentLineData[]
            }
            type ContentLineData = {
                id : number,
                type : string,
                talker: string,
                messages: string,
                emote: string,
                questionType: string,
                choices: string[],
                choiceValues: number[],
                choiceIdNexts: number[]
            }

            type DialogueResult = {
                id: number,
                satisfaction: number
                sprite: Sprite,
                status: "done" | "unfinished",
                type: string,
                npcName: string | undefined,
            }
        }

        type Direction = 'DOWN' | 'LEFT' | 'UP' | 'RIGHT'

        namespace Battle {
            type BattlerData = 
            {
                name:string,
                level: number,
                hp: number,
                maxhp: number,
                mp: number,
                maxmp: number,
                atk: number,
                isplayer:boolean
            }

            type QuizResult = (isCorrect: boolean) => void

            type QuizData = {
                weight: number, //temp
                attack: number, //temp
                heal: number, //temp
                enemyatk: number, //temp
                questions: QuestionData[]
            }
    
            type QuestionData = {
                question: string,
                answers: string[],
                answervalues: number[],
                type: 'multiple' | 'arrange' | 'checklist' | 'slider' | 'swipe'
            }
        }
    }

    namespace Minigame.Fruit
    {
        type FruitData = {
            idx: number,
            color: string,
            symbol: string
            direction: string,
            x: number,
            y: number,
            isOn: boolean,
            isWrongAnswer: boolean
        }

        //probably don't need this one
        type FruitLayoutArray = {
            index: number,
            fruitlayouts: FruitLayout[]
        }

        type FruitLayout = 
        {
            x: number,
            y: number,
            direction: string,
            isOn: boolean
            isWrongAnswer: boolean
        }

    }

    namespace Minigame.Balloon
    {
        type BalloonPack = 
        {
            value: number,
            balloon: Sprite,
            text: Text,
            isAnswered: boolean
        }
    }
    
    namespace Screen {
        namespace Layer {
            type Layer = 'BACKGROUND' | 'MAIN' | 'FOREGROUND' | 'UI'
            type LayerInfo = {
                key: Layer,
                index: number
            };
        }
    }

	namespace Asset {
        type AssetType = 'STATIC' | 'SPRITESHEET' | 'ANIMATION' | 'CUSTOMANIMATION'
        
        type AssetInfo = {
            key: string,
            type: AssetType,
            path: string
        }

        type SpriteSheetInfo = {
            key: string,
            type: AssetType,
            path: string,
            width: number,
            height: number
        }

        type AnimationInfo = {
            key: string,
            type: AssetType,
            spritesheet: string,
            start: number,
            end: number,
            frameSpeed: number,
            loop: boolean
        }

        type CustomAnimationInfo = {
            key: string,
            type: AssetType,
            spritesheet: string,
            start: number,
            end: number,
            frameSpeed: number,
            frameLengths: Array<number>,
            loop: boolean
        }
    }

    namespace Tiled {
        type Layer = {
            data: Array<number>
            height:number,
            id: number,
            name: string,
            opacity: number,
            type: string,
            visible: boolean,
            width: number,
            x: number,
            y: number
        }
        type Object = {
            id: number,
            name: string,
            width: number,
            height: number,
            type: string,
            properties: Array<Property>,
            visible: boolean,
            x: number,
            y: number
        }
        type Property = {
            name: string,
            type: string,
            value: string
        }
    }
}