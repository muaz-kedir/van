import asyncHandler from "../../utils/asyncHandler.js";
import {
  createVideoProject,
  updateVideoProject,
  deleteVideoProject,
  listVideoProjects,
  getVideoProjectById,
} from "./video.service.js";

const createVideoProjectController = asyncHandler(async (req, res) => {
  const { body } = req.validated;
  const project = await createVideoProject(body);
  res.status(201).json(project);
});

const updateVideoProjectController = asyncHandler(async (req, res) => {
  const {
    params: { id },
    body,
  } = req.validated;

  const project = await updateVideoProject(id, body);
  res.status(200).json(project);
});

const deleteVideoProjectController = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req.validated;
  await deleteVideoProject(id);
  res.status(204).send();
});

const getVideoProjectController = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req.validated;
  const project = await getVideoProjectById(id);
  res.status(200).json(project);
});

const listPublicVideoProjectsController = asyncHandler(async (_req, res) => {
  const projects = await listVideoProjects({ includeUnpublished: false });
  const response = projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    youtubeVideoId: project.youtubeVideoId,
    createdAt: project.createdAt,
  }));
  res.status(200).json(response);
});

const listAdminVideoProjectsController = asyncHandler(async (_req, res) => {
  const projects = await listVideoProjects({ includeUnpublished: true });
  res.status(200).json(projects);
});

export {
  createVideoProjectController,
  updateVideoProjectController,
  deleteVideoProjectController,
  getVideoProjectController,
  listPublicVideoProjectsController,
  listAdminVideoProjectsController,
};
