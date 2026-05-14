import { AdminSidebar } from '@/components/admin/AdminSidebar'

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-light">
      <AdminSidebar />
      <div className="ml-64">
        {children}
      </div>
    </div>
  )
}
