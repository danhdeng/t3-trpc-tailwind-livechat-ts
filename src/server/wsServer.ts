import ws from "ws";
import { appRouter } from "./router";
import {applyWSSHandler} from '@trpc/server/adapters/ws';
import {createContext} from "./router/context";

const wss=new ws.Server({
    port:3001,
});

const handler =applyWSSHandler({wss, router:appRouter, createContext});

wss.on("connection",() => {
    console.log(`Got a connection ${wss.clients.size}`);
    wss.once("close",() => {
        console.log(`Closed connection ${wss.clients.size}`);
    });
});

console.log(`wss server started at ws://localhost:3001`);

process.on("SIGTERM",() => {
    console.log("Got SIGTERM");
    handler.broadcastReconnectNotification();
    wss.close();
});

