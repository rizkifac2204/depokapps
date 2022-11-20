import { useRizkiContext } from "context";

function c2() {
  const [init, action] = useRizkiContext();
  return (
    <div>
      c2 <br /> {JSON.stringify(init)}
    </div>
  );
}

export default c2;
