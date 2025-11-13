import TeamOverview from "./components/TeamOverview";
import TeamMembers from "./components/TeamMembers";
import TeamJoinCreateForm from "./components/TeamJoinCreateForm";

export default function TeamPage() {
  return (
    <div className="flex flex-col space-y-6 w-full max-w-3xl">
      <TeamOverview />
      <TeamJoinCreateForm />
      <TeamMembers />
    </div>
  );
}
