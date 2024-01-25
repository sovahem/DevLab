export const iceServers = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
        { urls: 'stun:stun.services.mozilla.com' },
    ],
};

export const createSDPOffer = async (peerConnection: RTCPeerConnection) => {
    try {
        const offer = await peerConnection.createOffer();
        return await peerConnection.setLocalDescription(offer);
    } catch (error: any) {
        console.error(error);
    }
};

export const addLocalTracksToPeerConnection = (
    stream: MediaStream,
    peerConnection: RTCPeerConnection,
) => {
    stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
    });
};

export class PeerService {
    peer: RTCPeerConnection;

    constructor() {
        this.peer = new RTCPeerConnection(iceServers);
    }

    async getAnswer(offer: any) {
        if (this.peer) {
            await this.peer.setRemoteDescription(offer);
            const ans = await this.peer.createAnswer();
            await this.peer.setLocalDescription(new RTCSessionDescription(ans));
            return ans;
        }
    }

    async setLocalDescription(ans: any) {
        if (this.peer) {
            await this.peer.setRemoteDescription(
                new RTCSessionDescription(ans),
            );
        }
    }

    async getOffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(
                new RTCSessionDescription(offer),
            );
            return offer;
        }
    }
}
