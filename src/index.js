import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

// Takenotes
import {
  Root,
  loader as rootLoader
} from "./routes/root/root";
import {
  PlayList,
  loader as playlistLoader
} from "./routes/playlists/playlist";
import { ErrorPage } from "./error-page";
import {
  CreatePlaylist,
  action as createPlaylistAction
} from "./routes/playlists/create";
import {
  PlaylistSettings,
  loader as playlistSettingsLoader,
  action as playlistSettingsAction
} from "./routes/playlists/settings";
import {
  Index as PlayListIndex,
  loader as playlistIndexLoader
} from "./routes/playlists";

// Users
// import { Root as UserRoot, loader as rootUserLoader } from "./routes/users/root";
// import { ErrorPage as UserErrorPage } from "./routes/users/error-page";
// import { User, loader as userLoader, action as userAction } from './routes/users/user';
// import { CreateUser, action as createUserAction } from './routes/users/create';
// import { EditUser, loader as editUserLoader, action as editUserAction } from './routes/users/edit';
// import { action as deleteUser } from "./routes/users/delete";
// import { Index as UserIndex } from "./routes/users/index";

// const userRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <UserRoot />,
//     errorElement: <UserErrorPage />,
//     loader: rootUserLoader,
//     children: [
//       {
//         errorElement: <UserErrorPage />,
//         children: [
//           {
//             index: true,
//             element: <UserIndex />
//           },
//           {
//             path: "users/:userId",
//             action: userAction,
//             loader: userLoader,
//             element: <User />,
//             errorElement: <div>Opps! There was an error.</div>
//           },
//           {
//             path: "users/create",
//             action: createUserAction,
//             element: <CreateUser />
//           },
//           {
//             path: "users/:userId/edit",
//             action: editUserAction,
//             loader: editUserLoader,
//             element: <EditUser />,
//           },
//           {
//             path: "users/:userId/delete",
//             action: deleteUser,
//             errorElement: <div>Opps! There was an error.</div>
//           }
//         ]
//       }
//     ]
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":playlistId",
        loader: playlistLoader,
        element: <PlayList />,
        children: [
          {
            index: true,
            loader: playlistIndexLoader,
            element: <PlayListIndex />
          },
          {
            path: "settings",
            action: playlistSettingsAction,
            loader: playlistSettingsLoader,
            element: <PlaylistSettings />
          }
        ]
      },
      {
        path: "create",
        action: createPlaylistAction,
        element: <CreatePlaylist />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router} />
);