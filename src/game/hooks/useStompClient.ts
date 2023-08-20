import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

export const useStompClient = (url: string) => {
	const [stompClient, setStompClient] = useState<Client | null>(null);
	const [connected, setConnected] = useState<boolean>(false);
	
	const baseUrl = process.env.REACT_APP_WS_URL;
	useEffect(() => {
		console.log("Initializing stomp client")
		const client = new Client({
			brokerURL: baseUrl + url,
			onConnect: () => {
				console.log('STOMP client connected');
				setStompClient(client);
				setConnected(true);
			},
			onDisconnect: () => {
				console.log('STOMP client disconnected');
				setConnected(false);
			},
		});
		
		client.activate();
		
		return () => {
			client.deactivate();
		};
	}, [url]);
	
	return { stompClient, connected };
};
