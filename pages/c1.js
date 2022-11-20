import { useRizkiContext } from "context";

function c1() {
  const [init, action] = useRizkiContext();
  return (
    <div>
      c1 <br /> {JSON.stringify(init)}
    </div>
  );
}

export default c1;
