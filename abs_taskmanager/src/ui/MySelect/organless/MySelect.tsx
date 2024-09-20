import zIndex from "@mui/material/styles/zIndex";
import Select from "react-select";
interface IMySelect {
  isMulty: boolean;
  options: any[];
  onChange: any;
  selected?: any;
  itemKey: string; // Изменили название свойства key на itemKey
  label: string;
  defaultValues?: any[];
  placeholder: string;
  width?: string;
  style?: any
}

export const MySelect = (params: IMySelect) => {
  const getOptions = () => {
    if (params.options && params.options.length > 0) {
      const labelField = params.label;
      const options = params.options?.map((o: any) => ({
        value: params.itemKey == undefined ? o?.id : o[params.itemKey],
        label: labelField ? o[labelField] : o.name,
      }));
      return options;
    }
  };

  const customStyles = {
    control: (provided: any, _state: any) => ({
      ...provided,
      backgroundColor: "#fff",
      textAlign: "left",
      // BorderAll: "1px solid var(--color-main-grey-dark)",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#D9D9D9" : "#fff",
      // color: state.isSelected ? "var(--color-main-grey-dark)" : "black",
      cursor: "pointer",
      borderBottom: "1px solid #2B2B2B",
      zIndex: 10
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#D9D9D9" : "#fff",
      zIndex: 5,
    }),
  };

  return (
    <div style={{ width: params.width ?? "100%" }}>
      <Select
        styles={customStyles}
        closeMenuOnSelect={!params.isMulty}
        defaultValue={params.defaultValues ?? []}
        isMulti={params.isMulty ?? false}
        options={getOptions() ?? []}
        onChange={params.onChange}
        placeholder={params.placeholder}
        isSearchable={true}
        value={params?.selected}
        noOptionsMessage={() => "Нет данных"}
        loadingMessage={() => "Поиск"}
      />
    </div>
  );
};
