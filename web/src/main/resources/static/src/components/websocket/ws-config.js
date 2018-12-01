import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

let stompClient = null;

export function connectWs(token) {
    const socket = new SockJS('/notifications?access_token=' + token);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/queue/reply', (greeting) => {
            console.log(greeting.body);
            console.log(greeting);
            console.log(JSON.parse(greeting.body));


        });
        console.log(stompClient.ws._transport.url);
    });
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}