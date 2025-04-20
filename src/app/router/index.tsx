import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { BoardsPage } from '../../pages/BoardsPage'
import { BoardPage } from '../../pages/BoardPage'
import { IssuesPage } from '../../pages/IssuesPage'
import { NotFound } from '../../pages/NotFound'


export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/boards" />} />
    <Route path="/boards" element={<BoardsPage />} />
    <Route path="/board/:id" element={<BoardPage />} />
    <Route path="/issues" element={<IssuesPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)
