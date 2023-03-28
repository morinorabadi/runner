import { useStore } from "state/useStore";

function Information() {
  const { score, speed } = useStore();
  return (
    <div className="info-parent">
      <div className="info" id="score">
        <p className="label">score:</p>
        <p className="value">{score}</p>
      </div>
      <div className="info" id="score">
        <p className="label">speed:</p>
        <p className="value">{speed}</p>
      </div>
    </div>
  );
}

export default Information;
