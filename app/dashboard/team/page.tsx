import TeamOverview from './components/TeamOverview';
import TeamJoinCreateForm from './components/TeamJoinCreateForm';
import TeamMembers from './components/TeamMembers';
import { Card } from '@/components/ui/Card';

export default function TeamPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-black tracking-tight">
          Team Management
        </h1>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="hover:shadow-md transition-all duration-200">
            <TeamOverview />
          </Card>

          <Card className="hover:shadow-md transition-all duration-200">
            <TeamJoinCreateForm />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="hover:shadow-md transition-all duration-200">
            <TeamMembers />
          </Card>
        </div>
      </div>
    </div>
  );
}
