import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

interface CallWindowProps {
  callType: 'video' | 'audio';
  isOutgoing: boolean;
  otherUser: {
    id: number;
    name: string;
    avatar?: string;
  };
  onEndCall: () => void;
  onAcceptCall?: () => void;
  onRejectCall?: () => void;
}

export default function CallWindow({
  callType,
  isOutgoing,
  otherUser,
  onEndCall,
  onAcceptCall,
  onRejectCall
}: CallWindowProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [duration, setDuration] = useState(0);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isConnected) {
      const timer = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isConnected]);

  useEffect(() => {
    initializeCall();
    return () => {
      cleanup();
    };
  }, []);

  const initializeCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: callType === 'video',
        audio: true
      });

      localStreamRef.current = stream;

      if (localVideoRef.current && callType === 'video') {
        localVideoRef.current.srcObject = stream;
      }

      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      };

      const peerConnection = new RTCPeerConnection(configuration);
      peerConnectionRef.current = peerConnection;

      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      peerConnection.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      peerConnection.oniceconnectionstatechange = () => {
        if (peerConnection.iceConnectionState === 'connected') {
          setIsConnected(true);
        }
      };

    } catch (error) {
      console.error('Failed to initialize call:', error);
      onEndCall();
    }
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current && callType === 'video') {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="flex-1 relative">
        {callType === 'video' ? (
          <>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="absolute top-4 right-4 w-32 h-32 object-cover rounded-lg border-2 border-white shadow-lg"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              {otherUser.avatar ? (
                <img
                  src={otherUser.avatar}
                  alt={otherUser.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="User" size={48} className="text-primary" />
                </div>
              )}
              <h2 className="text-2xl text-white font-semibold mb-2">{otherUser.name}</h2>
              {isConnected ? (
                <p className="text-white/70">{formatDuration(duration)}</p>
              ) : (
                <p className="text-white/70">
                  {isOutgoing ? 'Звоним...' : 'Входящий звонок...'}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
          <p className="text-white text-sm">
            {isConnected ? formatDuration(duration) : (isOutgoing ? 'Звоним...' : 'Входящий звонок')}
          </p>
        </div>
      </div>

      <div className="p-6 flex items-center justify-center gap-4">
        {!isConnected && !isOutgoing && (
          <>
            <button
              onClick={onRejectCall}
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
            >
              <Icon name="PhoneOff" size={28} className="text-white" />
            </button>
            <button
              onClick={onAcceptCall}
              className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center transition-colors"
            >
              <Icon name="Phone" size={28} className="text-white" />
            </button>
          </>
        )}

        {(isConnected || isOutgoing) && (
          <>
            <button
              onClick={toggleMute}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} className="text-white" />
            </button>

            {callType === 'video' && (
              <button
                onClick={toggleVideo}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                  isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <Icon name={isVideoOff ? 'VideoOff' : 'Video'} size={24} className="text-white" />
              </button>
            )}

            <button
              onClick={onEndCall}
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
            >
              <Icon name="PhoneOff" size={28} className="text-white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
