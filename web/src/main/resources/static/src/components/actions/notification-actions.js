import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

let stompClient = null;

export const connectWs = (token) => {
    const socket = new SockJS('/notifications?access_token=' + token);
    stompClient = Stomp.over(socket);

    return dispatch => {
        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/user/queue/reply', (greeting) => {
                dispatch(showNotification(greeting.body));
            });
        });
    }
};


export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
};

const showNotification = (message) => {
    return {
        type: "SHOW_NOTIFICATION",
        payload: message
    }
};

