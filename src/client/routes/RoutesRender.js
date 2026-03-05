import React from 'react';
import { useRoutes } from "react-router";
import { routes } from './routes.js';

export const RoutesRender = () => useRoutes(routes)
