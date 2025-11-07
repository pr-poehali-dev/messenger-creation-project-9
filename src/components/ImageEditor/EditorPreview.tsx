import Cropper from 'react-easy-crop';
import type { TextOverlay, StickerOverlay, Filter, DrawingPath, DrawingPoint, EditorTab } from './types';
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
  drawingPaths: DrawingPath[];
  currentPath: DrawingPoint[];
  isDrawing: boolean;
  drawColor: string;
  drawWidth: number;
  activeTab: EditorTab;
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
  onTextMouseDown: (id: string, e: React.MouseEvent) => void;
  onStickerMouseDown: (id: string, e: React.MouseEvent) => void;
  onDeleteText: (id: string) => void;
  onDeleteSticker: (id: string) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onDrawStart: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDrawMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDrawEnd: () => void;
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
  drawingPaths,
  currentPath,
  isDrawing,
  drawColor,
  drawWidth,
  activeTab,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onTextMouseDown,
  onStickerMouseDown,
  onDeleteText,
  onDeleteSticker,
  onMouseMove,
  onMouseUp,
  onDrawStart,
  onDrawMove,
  onDrawEnd,
}: EditorPreviewProps) {
  return (
    <div
      className="relative h-96 bg-black rounded-xl overflow-hidden"
      style={{ cursor: activeTab === 'draw' ? 'crosshair' : 'default' }}
      onMouseMove={activeTab === 'draw' ? onDrawMove : onMouseMove}
      onMouseUp={activeTab === 'draw' ? onDrawEnd : onMouseUp}
      onMouseLeave={activeTab === 'draw' ? onDrawEnd : onMouseUp}
      onMouseDown={activeTab === 'draw' ? onDrawStart : undefined}
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

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {drawingPaths.map(path => (
          <polyline
            key={path.id}
            points={path.points.map(p => `${p.x},${p.y}`).join(' ')}
            stroke={path.color}
            strokeWidth={path.width}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {isDrawing && currentPath.length > 0 && (
          <polyline
            points={currentPath.map(p => `${p.x},${p.y}`).join(' ')}
            stroke={drawColor}
            strokeWidth={drawWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}