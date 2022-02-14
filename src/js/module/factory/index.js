import { Npc, Chest, Monster, Teleporter, TeleporterButton} from "../gameobjects/tileobjects"

const object = {Npc , Chest, Monster, Teleporter, TeleporterButton}

function ObjectFactory(type,props) {
    const ObjectType = object[type];
    return new ObjectType(props);
}

export { ObjectFactory }