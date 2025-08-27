import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from '../Layout';

interface AdminLayoutProps {
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ title }) => {
  return (
    <Layout title={title}>
      <div className="admin-layout">
        {/* Admin specific navigation or sidebar can go here */}
        <Outlet />
      </div>
    </Layout>
  );
};
