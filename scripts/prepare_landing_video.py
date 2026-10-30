import os
import subprocess
import imageio_ffmpeg

def main():
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    print(f"Using FFmpeg: {ffmpeg_exe}")

    input_video = os.path.abspath("Resources/cinematic-originals/Spacecraft_landing_on_the_moon_4deb355b_1080p.mp4")
    out_dir = os.path.abspath("public/generated")
    os.makedirs(out_dir, exist_ok=True)

    output_video = os.path.join(out_dir, "lunar_landing_optimized.mp4")
    poster_img = os.path.join(out_dir, "lunar_landing_poster.jpg")
    touchdown_fallback = os.path.join(out_dir, "lunar_landing_fallback.jpg")

    # Start time of the surface approach segment: frame 101 @ 24fps = 4.208333s
    # Total duration = 9.958333s - 4.208333s = ~5.75s
    start_time = "00:00:04.208"

    print("Encoding web-optimized H.264 video with frequent keyframes (GOP=4)...")
    cmd_encode = [
        ffmpeg_exe,
        "-y",
        "-ss", start_time,
        "-i", input_video,
        "-c:v", "libx264",
        "-profile:v", "high",
        "-level", "4.1",
        "-pix_fmt", "yuv420p",
        "-crf", "18",
        "-preset", "slow",
        "-g", "4",               # keyframe every 4 frames (6 per second) for silky smooth scrubbing
        "-keyint_min", "4",
        "-sc_threshold", "0",
        "-an",                   # no audio track
        "-movflags", "+faststart",
        output_video
    ]
    subprocess.run(cmd_encode, check=True)
    print(f"Encoded video to: {output_video} (Size: {os.path.getsize(output_video)} bytes)")

    # Extract poster frame (first frame of the landing sequence)
    cmd_poster = [
        ffmpeg_exe,
        "-y",
        "-ss", start_time,
        "-i", input_video,
        "-vframes", "1",
        "-q:v", "2",
        poster_img
    ]
    subprocess.run(cmd_poster, check=True)
    print(f"Saved poster: {poster_img}")

    # Extract touchdown fallback frame (final frame)
    cmd_fallback = [
        ffmpeg_exe,
        "-y",
        "-sseof", "-0.1",
        "-i", input_video,
        "-vframes", "1",
        "-q:v", "2",
        touchdown_fallback
    ]
    subprocess.run(cmd_fallback, check=True)
    print(f"Saved touchdown fallback: {touchdown_fallback}")

if __name__ == "__main__":
    main()
