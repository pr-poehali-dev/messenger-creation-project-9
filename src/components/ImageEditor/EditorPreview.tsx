import Cropper from 'react-easy-crop';
import Icon from '@/components/ui/icon';
import type { TextOverlay, StickerOverlay, Filter } from './types';
import { filterStyles } from './types';

type EditorPreviewProps = {
  imageUrl: string;
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  filter: Filter;
  brightness: number;
  contrast: number;
  saturation: number;
  textOverlays: TextOverlay[];
  stickerOverlays: StickerOverlay[];
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
  onTextMouseDown: (id: string, e: React.MouseEvent) => void;
  onStickerMouseDown: (id: string, e: React.MouseEvent) => void;
  onDeleteText: (id: string) => void;
  onDeleteSticker: (id: string) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
};

export default function EditorPreview({
  imageUrl,
  crop,
  zoom,
  rotation,
  filter,
  brightness,
  contrast,
  saturation,
  textOverlays,
  stickerOverlays,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onTextMouseDown,
  onStickerMouseDown,
  onDeleteText,
  onDeleteSticker,
  onMouseMove,
  onMouseUp,
}: EditorPreviewProps) {
  return (
    <div
      className="relative h-96 bg-black rounded-xl overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <Cropper
        image={imageUrl}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={1}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropComplete}
        style={{
          containerStyle: {
            filter: [
              filterStyles[filter],
              `brightness(${brightness}%)`,
              `contrast(${contrast}%)`,
              `saturate(${saturation}%)`,
            ].filter(Boolean).join(' '),
          },
        }}
      />

      {textOverlays.map(overlay => (
        <div
          key={overlay.id}
          className="absolute cursor-move select-none group"
          style={{
            left: overlay.x,
            top: overlay.y,
            transform: 'translate(-50%, -50%)',
            fontSize: overlay.fontSize,
            color: overlay.color,
            fontWeight: overlay.fontWeight,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
          onMouseDown={(e) => onTextMouseDown(overlay.id, e)}
        >
          {overlay.text}
          <button
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteText(overlay.id);
            }}
          >
            ×
          </button>
        </div>
      ))}

      {stickerOverlays.map(overlay => (
        <div
          key={overlay.id}
          className="absolute cursor-move select-none group"
          style={{
            left: overlay.x,
            top: overlay.y,
            transform: 'translate(-50%, -50%)',
            fontSize: overlay.size,
          }}
          onMouseDown={(e) => onStickerMouseDown(overlay.id, e)}
        >
          {overlay.emoji}
          <button
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteSticker(overlay.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
