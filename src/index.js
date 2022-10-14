import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';

import {
  Root,
  loader as rootLoader
} from './routes/playlists/root';

import { ErrorPage } from './error-page';

import {
  PlayList,
  loader as playlistLoader
} from './routes/playlists/playlist';

import {
  CreatePlaylist,
  action as createPlaylistAction
} from './routes/playlists/create';

import {
  EditPlaylist,
  loader as editPlaylistLoader,
  action as editPlaylistAction
} from './routes/playlists/edit';

import { action as deletePlaylistAction } from './routes/playlists/delete';
import { Index, loader as indexLoader } from './routes/playlists';

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
        children: [
          {
            index: true,
            loader: indexLoader,
            element: <Index />
          },
          {
            path: "edit",
            loader: editPlaylistLoader,
            action: editPlaylistAction,
            element: <EditPlaylist />
          },
          {
            path: "delete",
            action: deletePlaylistAction
          }
        ]
      },
      {
        path: "playlists/create",
        action: createPlaylistAction,
        element: <CreatePlaylist />
      },
    ]
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);