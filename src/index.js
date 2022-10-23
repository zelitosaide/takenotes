import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';

import {
  Root as RootList,
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

// Users
import { Root as UserRoot, loader as rootUserLoader } from "./routes/users/root";
import { ErrorPage as UserErrorPage } from "./routes/users/error-page";
import { User, loader as userLoader, action as userAction } from './routes/users/user';
import { CreateUser, action as createUserAction } from './routes/users/create';
import { EditUser, loader as editUserLoader, action as editUserAction } from './routes/users/edit';
import { action as deleteUser } from "./routes/users/delete";
import { Index as UserIndex } from "./routes/users/index";

const playlistRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootList />,
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

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <UserRoot />,
    errorElement: <UserErrorPage />,
    loader: rootUserLoader,
    children: [
      {
        errorElement: <UserErrorPage />,
        children: [
          {
            index: true,
            element: <UserIndex />
          },
          {
            path: "users/:userId",
            action: userAction,
            loader: userLoader,
            element: <User />,
            errorElement: <div>Opps! There was an error.</div>
          },
          {
            path: "users/create",
            action: createUserAction,
            element: <CreateUser />
          },
          {
            path: "users/:userId/edit",
            action: editUserAction,
            loader: editUserLoader,
            element: <EditUser />,
          },
          {
            path: "users/:userId/delete",
            action: deleteUser,
            errorElement: <div>Opps! There was an error.</div>
          }
        ]
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={userRouter} />
);