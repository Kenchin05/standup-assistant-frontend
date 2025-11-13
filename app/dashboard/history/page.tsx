import StandupHistoryList from "./components/StandupHistoryList";

export default function HistoryPage() {
  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-3xl">
      <StandupHistoryList />
    </div>
  );
}
