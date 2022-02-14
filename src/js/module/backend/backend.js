import Axios from 'axios';
import {
    v4 as uuidv4
} from 'uuid';
import {
    generateChecksum
} from './checksum/api_security';
export default class Backend {
    constructor(scene) {
        /**
         * @private
         * @readonly
         */
        this.serverApiUrl = CONFIG.BASE_API_URL;

        this.scene = scene;
        this.key = 'adira-apuppt-uuid';
    }

    /**
     * @returns {Backend}
     */
    static getInstance = () => {
        if (!Backend.instance) {
            Backend.instance = new Backend();
        }

        return Backend.instance;
    };

    _getCurrentUUID = () => {
        let uuid = localStorage.getItem(this.key);
        if (uuid == undefined) {
            uuid = uuidv4();
            localStorage.setItem(this.key, uuid);
        }
        return uuid;
    }
}

export function masterLogin(uuid) {
    let body = {
        requestId: 0,
        deviceId: uuid,
        projectId: 'treasure_town'
    };
    return Axios.post("/Auth/Master", body, {
            baseURL: CONFIG.BASE_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Checksum': generateChecksum(body).toString()
            }
        })
        .then(response => response.data)
        .catch(error => error.response.data.error.id);
}

export function regularLogin(memberId, uuid) {
    let body = {
        memberId: memberId,
        requestId: 0,
        deviceId: uuid,
        projectId: 'treasure_town',
    };
    return Axios.post("/Auth/Login", body, {
            baseURL: CONFIG.BASE_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Checksum': generateChecksum(body).toString()
            }
        })
        .then(response => response.data)
        .catch(error => error.response.data.error.id);
}

export function register(fullname, gender, memberId, uuid) {
    let body = {
        fullname: fullname,
        gender: gender,
        memberId: memberId,
        requestId: 0,
        deviceId: uuid,
        projectId: 'treasure_town',
    };
    return Axios.post("/Auth/Register", body, {
            baseURL: CONFIG.BASE_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Checksum': generateChecksum(body).toString()
            }
        })
        .then(response => response.data)
        .catch(function (error) {
            console.log("Gagal daftar : " + error);
        });
}

export function registerGender(gender, token, uuid) {
    let body = {
        gender: gender,
        requestId: 0,
        deviceId: uuid,
        projectId: 'treasure_town'
    };
    return Axios.post("/Player/RegisterGender", body, {
            baseURL: CONFIG.BASE_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Checksum': generateChecksum(body).toString()
            }
        })
        .then(response => response.data)
        .catch(error => error.response.data.error);
}

export function fetchCourse(courseId, token) {
    let body = {
        courseId: courseId
    };
    return Axios.post("/Course/Fetch", body, {
            baseURL: CONFIG.BASE_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Checksum': generateChecksum(body).toString()
            }
        })
        .then(response => response.data)
        .catch(error => error.response.data.error);
}

export function fetchLeaderboard(uuid, token) {
    let body = {
        limit: {
            idx: 0,
            max: 10
        },
        requestId: 0,
        deviceId: uuid,
        projectId: 'treasure_town'
    };
    return Axios.post("/Leaderboard/Fetch", body, {
            baseURL: CONFIG.BASE_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Checksum': generateChecksum(body).toString()
            }
        })
        .then(response => response.data)
        .catch(function (error) {
            console.log("Gagal ambil leaderboard : " + error);
        });
}

export function startCourse(courseId, topicId, lessonId, uuid, token) {
    let body = {
        courseId: courseId,
        topicId: topicId,
        lessonId: lessonId,
        requestId: 0,
        deviceId: uuid,
        projectId: 'treasure_town'
    };
    return Axios.post("/Course/Start", body, {
            baseURL: CONFIG.BASE_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Checksum': generateChecksum(body).toString()
            }
        })
        .then(response => response.data)
        .catch(function (error) {
            console.log("Gagal mulai Course : " + error);
        });
}

export function submitCourse(sessionId, score, duration, uuid, token) {
    let body = {
        sessionId: sessionId,
        result: {
            score: score,
            duration: duration
        },
        requestId: 0,
        deviceId: uuid,
        projectId: 'treasure_town'
    };

    return Axios.post("/Course/Submit", body, {
            baseURL: CONFIG.BASE_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Checksum': generateChecksum(body).toString()
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log("Gagal kirim Course : " + error);
        });
}
export function logout(uuid, token) {
    let body = {
        requestId: 0,
        deviceId: uuid,
        projectId: 'treasure_town'
    };
    return Axios.post("/Auth/Logout", body, {
            baseURL: CONFIG.BASE_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Checksum': generateChecksum(body).toString()
            }
        })
        .then(response => response.data)
        .catch(error => error.response.data.error);
}