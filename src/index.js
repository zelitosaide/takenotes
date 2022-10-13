import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Root,
  loader as rootLoader
} from './routes/root';

import { ErrorPage } from './error-page';

import {
  PlayList,
  loader as playlistLoader
} from './routes/playlist';

import {
  CreatePlaylist,
  action as createPlaylistAction
} from './routes/create';

import {
  EditPlaylist,
  loader as editPlaylistLoader,
  action as editPlaylistAction
} from './routes/edit';

import { action as deletePlaylistAction } from './routes/delete';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "playlists/:playlistId",
        loader: playlistLoader,
        element: <PlayList />,
      },
      {
        path: "playlists/create",
        action: createPlaylistAction,
        element: <CreatePlaylist />
      },
      {
        path: "playlists/:playlistId/edit",
        loader: editPlaylistLoader,
        action: editPlaylistAction,
        element: <EditPlaylist />
      },
      {
        path: "playlists/:playlistId/delete",
        action: deletePlaylistAction
      }
    ]
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);