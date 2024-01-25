'use client';
import { socket } from '@/lib/socket-client';
import { iceServers } from '@/lib/webRTC';
import React, { useEffect, useRef, useState } from 'react';

type WebRTCPageProps = {
    roomID: string;
};

const WebRTCPage: React.FC<WebRTCPageProps> = ({ roomID }) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const [peer, setPeer] = useState<RTCPeerConnection>(
        new RTCPeerConnection(iceServers),
    );
    // const peerConnection = new RTCPeerConnection(iceServers);
    const [remotePeer, setRemotePeer] = useState([]);
    const initMyStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    };

    useEffect(() => {
        initMyStream();
    }, [localVideoRef]);

    // const handleUserJoined = async ({ socketID }: { socketID: string }) => {
    //     console.info('USER JOINED');
    //     const stream = await navigator.mediaDevices.getUserMedia({
    //         audio: true,
    //         video: true,
    //     });

    //     setRemotePeer((prevState) => {
    //         if (!prevState.find((p) => p.socketID === socketID)) {
    //             return [...prevState, { socketID, stream }];
    //         } else {
    //             return prevState;
    //         }
    //     });
    // };

    const sendOffer = async () => {
        try {
            const offer = await peer.createOffer();
            await peer.setLocalDescription(new RTCSessionDescription(offer));
            console.info("A ENVOIE L'OFFRE B", offer);
            socket.emit('call:user', { roomID, offer });
        } catch (e) {
            console.error(e);
        }
    };

    const receiveOffer = async ({
        from,
        offer,
    }: {
        from: string;
        offer: RTCSessionDescriptionInit;
    }) => {
        try {
            console.info("B RECOIT l'OFFRE DE A", offer);
            await peer.setRemoteDescription(offer);
            console.info(
                "B met à jour sa description distante avec l'offre de A",
            );
            const ans = await peer.createAnswer();
            console.info('B crée une réponse', ans);
            await peer.setLocalDescription(ans);
            console.info('B met à jour sa description locale avec la réponse');
            socket.emit('call:accepted', { to: from, ans });
            console.info('B envoie la réponse à A ');
        } catch (e) {
            console.error(e);
        }
    };

    const callAccepted = async ({
        from,
        ans,
    }: {
        from: string;
        ans: RTCSessionDescriptionInit;
    }) => {
        console.log(
            'A met à jour sa description distante avec la réponse ',
            ans,
        );

        try {
            await peer.setRemoteDescription(new RTCSessionDescription(ans));
            console.log(
                'A met à jour sa description distante avec la réponse de B',
            );
        } catch (error) {
            console.error(
                'Erreur lors de la mise à jour des descriptions:',
                error,
            );
        }
    };

    useEffect(() => {
        if (!peer) {
            const newPeer = new RTCPeerConnection(iceServers);
            setPeer(newPeer);
        }
        socket.emit('room:join', roomID);
        socket.on('call:incomming', receiveOffer);

        socket.on('call:accepted', callAccepted);
        return () => {
            socket.off('call:incomming');
            socket.off('call:accepted');
        };
    }, []);

    return (
        <div>
            <video
                ref={localVideoRef}
                autoPlay
                muted
                style={{ width: '300px', height: '200px' }}
            />
            {/* {remotePeer.map((value) => )} */}
            <video
                ref={remoteVideoRef}
                autoPlay
                style={{ width: '300px', height: '200px' }}
            />
            <button onClick={sendOffer}>Démarrer lappel</button>
        </div>
    );
};

export default WebRTCPage;

// const handleStartCall = async () => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: true,
//         });

//         if (localVideoRef.current) localVideoRef.current.srcObject = stream;

//         stream.getTracks().forEach((track) => {
//             peerConnection.addTrack(track, stream);
//         });

//         const offer = await peerConnection.createOffer();
//         await peerConnection.setLocalDescription(offer);

//         const response = await fetch('/api/webrtc', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 offer: peerConnection.localDescription,
//             }),
//         });

//         socket.emit(
//             'sendoffer',
//             JSON.stringify(peerConnection.localDescription),
//             roomID,
//         );

//         const { answer } = await response.json();

//         // Mettre à jour la description distante avec la réponse de l'autre pair
//         await peerConnection.setRemoteDescription(answer);
//     } catch (error) {
//         console.error("Erreur lors de l'appel WebRTC:", error);
//     }
// };

// useEffect(() => {
//     // Configurer la gestion des pistes distantes

//     socket.on('offer', (offer: string) => {
//         console.log(offer);
//     });
//     if (remoteVideoRef.current) {
//         peerConnection.ontrack = (event) => {
//             if (remoteVideoRef && remoteVideoRef.current) {
//                 remoteVideoRef.current.srcObject = event.streams[0];
//             }
//         };
//     }
// }, []);
