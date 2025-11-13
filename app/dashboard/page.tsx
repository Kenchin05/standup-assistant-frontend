import StandupForm from "./components/StandupForm";
import TeamSummaryCard from "./components/TeamSummaryCard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-3xl">
      <StandupForm />
      <TeamSummaryCard />
    </div>
  );
}
