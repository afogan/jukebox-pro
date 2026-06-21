import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById } from "#db/queries/tracks";
import { getPlaylistByTrackId } from "#db/queries/tracks";
import requireUser from "#middleware/requireUser";

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.param("id", async (req, res, next, id) => {
const track = await getTrackById(id);
if (!track) return res.status(404).send("Track not found.");
req.track = track;
next();
});

router.get("/:id", (req, res) => {
  res.send(req.track);
});
 
router.get("/:id/palylists", requireUser, async (req, res) => {
  const playlists = await getPlaylistByTrackId(req.track.id);
  res.send(playlists);
});