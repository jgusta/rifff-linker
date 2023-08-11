import StatListItem from "./layout/StatListItem.tsx";
import StatList from "./layout/StatList.tsx";

export default function StatBlock({ stats }: { stats: (string)[][] }) {
  const inner = stats.map(i => (
    <StatListItem stat={i[0]} value={i[1]} />
  ));

  return (
    <StatList>
      {inner}
    </StatList>
  );
}