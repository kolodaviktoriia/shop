import React from 'react';
import { Route, Routes } from "react-router-dom";
import { useRoutes } from "react-router";
import { routes } from './routes.js';

export const RoutesRender = () => useRoutes(routes)
