import Information from "./children/Information";
import useControl from "./useControl";

function Parent() {
  const handlers = useControl();

  return (
    <div className="no-select container" {...handlers}>
      <Information />
    </div>
  );
}
export default Parent;
