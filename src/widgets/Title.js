import CText from "./CText";

const Title = ({ children }) => {
  return (
    <CText styles={{ fontWeight: "bold", marginBottom: 40, fontSize: 40 }}>
      {children}
    </CText>
  );
};

export default Title;
