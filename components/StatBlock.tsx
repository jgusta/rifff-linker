import StatList from "./statBlock/StatList.tsx";
import StatListItem from "./statBlock/StatListItem.tsx";

interface Props {
  stats: [string, string][];
}
export default function StatBlock( props : Props) {
  const inner = props.stats.map(([stat, val ]) => (
    <StatListItem stat={stat} val={val} />
  ));

  return (
    <StatList>{inner}</StatList>
  );
}