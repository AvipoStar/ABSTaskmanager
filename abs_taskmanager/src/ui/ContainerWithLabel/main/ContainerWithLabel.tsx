import "../styles/ContainerWithLabel.css";

interface IContainerWithLabel {
  label: string;
  children: React.ReactNode;
}

export const ContainerWithLabel = (params: IContainerWithLabel) => {
  return (
    <div className="ContainerWithLabel">
      <label className="ContainerWithLabel_Label">{params.label}</label>
      <div className="ContainerWithLabel_Body">{params.children}</div>
    </div>
  );
};
