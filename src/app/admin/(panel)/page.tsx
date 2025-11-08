import { getAdminStats } from "@/lib/data/admin-stats";
import { AdminStatsClient } from "./admin-dashboard-client";

export default async function AdminDashboard() {
	const stats = await getAdminStats();

	return <AdminStatsClient initialStats={stats} />;
}
