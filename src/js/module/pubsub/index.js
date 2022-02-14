let subscribers = {};

export const EventName = {
    TALK_TO_ELDER: "Talk to Mentor",
    AFTERBATTLE : 'AFTERBATTLE',
    AFTERPLAYMINIGAME : 'AFTERPLAYMINIGAME',
    MISSIONUPDATE : 'MISSIONUPDATE'
}

export const MissionPubSub = {
    publish(event, data){
        if (!subscribers[event]) return;

        subscribers[event].forEach(subscriberCallback => subscriberCallback(data));
    },
    subscribe(event, callback){
        if (!subscribers[event]) {
            subscribers[event] = [];
        }    subscribers[event].push(callback);
    },
    removeAllSubsribers(){
        subscribers = {};
    }
}