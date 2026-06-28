# From Long Video to Shorts: Notes on Shortcast

One of my recent projects, [Shortcast](https://github.com/humbertovirtudes/shortcast-windows), takes a long video and turns it into ready-to-post vertical shorts for TikTok, Reels, and YouTube Shorts.

## The problem

Cutting shorts by hand is tedious: find the good moment, crop to vertical, add captions, export, repeat. The interesting parts of a video are usually a small fraction of its runtime — the rest is setup.

## The approach

The pipeline breaks into a few stages:

1. **Ingest** — load the source video and its audio track.
2. **Find moments** — score segments to surface the parts worth clipping.
3. **Reframe** — crop to a vertical aspect ratio, keeping the subject in frame.
4. **Export** — render each clip in a share-ready format.

```python
# Roughly, the shape of it
clips = find_highlights(video)
for clip in clips:
    vertical = reframe(clip, aspect="9:16")
    export(vertical, fmt="mp4")
```

## Lessons

- **Ship the boring 80% first.** A reliable export pipeline beats a clever highlight detector that crashes.
- **Make it observable.** When a clip looks wrong, you want to see *why* fast.

More to come as the project evolves.
