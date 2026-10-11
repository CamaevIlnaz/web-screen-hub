import { AdminLayout } from './layout';
import type {ReactNode} from "react";

interface AdminPageProps {
  children: ReactNode;
}

export const AdminPage = ({ children }: AdminPageProps) => {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
