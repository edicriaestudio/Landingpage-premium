import cv2
import os

video_path = r"C:\Users\ediva\Downloads\202609110012.mp4"
output_dir = r"C:\Users\ediva\.gemini\antigravity\scratch\Guia360_LP\public\frames"

os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

print(f"Extracting {total_frames} frames...")

frame_idx = 1
while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    out_path = os.path.join(output_dir, f"{frame_idx:04d}.jpg")
    
    h, w = frame.shape[:2]
    if w > 1920:
        ratio = 1920 / w
        frame = cv2.resize(frame, (1920, int(h * ratio)), interpolation=cv2.INTER_AREA)
        
    cv2.imwrite(out_path, frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
    
    if frame_idx % 50 == 0:
        print(f"Processed {frame_idx} frames...")
        
    frame_idx += 1

cap.release()
print(f"Done. Extracted {frame_idx - 1} frames.")
