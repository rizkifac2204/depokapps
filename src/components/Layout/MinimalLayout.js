import Customization from "./Customization";

function MinimalLayout(children) {
  return (
    <>
      {children}
      <Customization />
    </>
  );
}

export default MinimalLayout;
